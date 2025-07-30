import { ChatCompletionTool } from 'openai/resources/chat';
import { systemPrompt } from '../../../data/systemPrompt';
import { discovery, search } from '../../movies/service';
import {
    chatCompletion,
    formatSearchResults,
    generateReply,
    openaiTextResponse,
} from './utils/helperFuncs';

/**
 * Sends a request to OpenAI with the tools property. If the tools property is not used by open AI, a regular response will be returned.
 * @param {Response} res Express response
 * @param {Message[]} messages System prompt, chat history, and user prompt
 * @param {ChatCompletionTool[]} tools function schema
 */
export async function handleToolResponse(messages: Message[], tools: ChatCompletionTool[]) {
    const response = await chatCompletion(messages, tools);

    const toolCall = response.tool_calls?.[0];
    const { name: completionName, arguments: completionArgs } = toolCall?.function || {};

    // If the any of the tool properties is undefined, it means open ai did not use
    if (!completionName || !completionArgs) {
        const message = openaiTextResponse(response);
        return { type: null, message };
    }

    const { type, searchQuery }: { type: AllTypes; searchQuery: string } =
        JSON.parse(completionArgs);
    const searchResponse = await search<SearchKeyword | MovieItem>(
        selectType(completionName),
        searchQuery
    );

    // This means the user is asking about movies a specified actor is known for.
    if (
        searchResponse &&
        searchResponse.results.length > 0 &&
        'known_for' in searchResponse.results[0]
    ) {
        const knownFor = formatSearchResults(searchResponse);
        const editedSystemPrompt: Message = {
            role: 'system',
            content: `${systemPrompt.content} \nYou might find the answers you're looking for in this documentation: ${knownFor}`,
        };

        const message = await generateReply(messages, editedSystemPrompt);
        return { type, message };
    }

    if (!searchResponse || searchResponse?.results.length < 1) {
        const message = await generateReply(messages);
        return { type, message };
    }

    // If the user searches for movie or tv shows
    const responseDiscovery = await discovery(type, '1', [
        `with_keywords=${searchResponse.results[0].id}`,
    ]);

    if (!responseDiscovery || responseDiscovery.results.length === 0) {
        const message = await generateReply(messages);
        return { type, message };
    }

    const sanitizedResults = formatSearchResults(responseDiscovery);
    const editedSystemPrompt: Message = {
        role: 'system',
        content: `${systemPrompt.content} \nYou might find the answers you're looking for in this documentation: ${sanitizedResults}`,
    };

    const message = await generateReply(messages, editedSystemPrompt);
    return { type, message };
}

function selectType(funcName: string) {
    switch (funcName) {
        case 'recommend_content_based_on_theme':
            return 'keyword';

        default:
            return 'person';
    }
}
