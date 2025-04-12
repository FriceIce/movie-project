export const tools = [
    {
        type: 'function',
        name: 'get_search_content',
        description: 'Get movies or TV shows for given input.',
        parameters: {
            type: {
                type: 'string',
                description:
                    'The type of content. If the user does not specify which type, default to movie.',
                enum: ['keyword'],
            },
            search: {
                type: 'string',
                description:
                    'The key word in the user input e.g("I want to wach space movies", keyword: "space")',
            },
        },
    },
];
