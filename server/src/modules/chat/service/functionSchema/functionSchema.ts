import { ChatCompletionTool } from 'openai/resources/chat';

export const tools: ChatCompletionTool[] = [
    {
        type: 'function',
        function: {
            name: 'recommend_content_based_on_theme',
            description: 'Retrieve the ID for chosen searchQuery',
            parameters: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        description:
                            'The type of content (movie or tv). If the user do not mention a specific type, default to movie',
                        enum: ['tv', 'movie'],
                    },
                    searchQuery: {
                        type: 'string',
                        description:
                            'Extract the searchQuery from the user input (e.g. "I want to watch basketball documentaries" → searchQuery: "basketball documentary". Its important to make it singular even if the input is "documentaries")',
                    },
                },
                required: ['searchQuery', 'type'],
                additionalProperties: false,
            },
            strict: true,
        },
    },
    {
        type: 'function',
        function: {
            name: 'get_actor_known_movies_or_tv',
            description: 'Retrieve movies or TV shows known for the specified actor',
            parameters: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        description:
                            'The type of content, in this case actor (person) e.g "Is there any Denzel Washington movies?" --> type: person ',
                        enum: ['person'],
                    },
                    searchQuery: {
                        type: 'string',
                        description:
                            'The specified actor e.g "Is there any Denzel Washington movies you can recommend?" ---> type: Denzel washington',
                    },
                },
                required: ['type', 'searchQuery'],
                additionalProperties: false,
            },
            strict: true,
        },
    },
];
