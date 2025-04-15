import { ChatCompletionMessage, ChatCompletionTool } from 'openai/resources/index';
import { openai } from '../../../connections/openai';

/**
 * Sends a chat completion request to open ai with model 'gpt-4o', temperature at 0.7, and messages. Tools is optional.
 * @param { Messages[] } messages System prompt, chat history, and user input — all combined in a list.
 * @param { ChatCompletionTool[] } tools function schema for function calling
 * @returns
 */
export async function chatCompletion(
    messages: Message[],
    tools?: ChatCompletionTool[]
): Promise<ChatCompletionMessage> {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        tools,
        temperature: 0.7,
    });

    return response.choices[0].message;
}

/**
 * Takes a openai response and returns the output message.
 * @param { ChatCompletionMessage } response
 * @returns {string | null}
 */
export function openaiTextResponse(response: ChatCompletionMessage): string | null {
    return response.content;
}

/**
 * Checks whether the incoming value has a 'known_for' property. If it does, the program retrieves the movies the actor is known for. If not, it searches for content based on a specific ID obtained through a keyword search.
 * @param { Discovery | MovieItem | SearchKeyword } array
 * @returns
 */
export function formatSearchResults(array: Discovery | MovieItem | SearchKeyword) {
    const results = array.results;
    const format = (content: any) => {
        return {
            id: content.id,
            title: content.title,
            original_title: content.original_title,
            overview: content.overview,
            release_date: content.release_date,
            vote_average: content.vote_average,
            vote_count: content.vote_count,
        };
    };

    if (results.length > 0 && 'known_for' in results[0]) {
        return results[0].known_for.map((content) => format(content));
    }

    return results.map((content) => format(content));
}

/**
 * This function generates an open ai reply.
 * @param { Messages[] } chatHistory
 * @param { Message } editedSystemPrompt
 * @returns
 */
export async function generateReply(chatHistory: Message[], editedSystemPrompt?: Message) {
    const previousChat = [...chatHistory];
    if (editedSystemPrompt) {
        previousChat.shift(); // Remove the first system instruction, add the edited one
        previousChat.unshift(editedSystemPrompt);
    }

    const reply = await chatCompletion(previousChat);
    const message = openaiTextResponse(reply);

    return message;
}
