import { openai } from '../../../connections/openai';
import { systemPrompt } from '../../../data/openQueryData/systemPrompt';
import color from 'colors';

export async function chat(prompt: string, chatHistory: Message[]) {
    const userPrompt: Message = {
        role: 'user',
        content: prompt,
    };
    const messages = [systemPrompt, ...chatHistory, userPrompt];
    const response = openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
    });

    console.log((await response).choices[0].message.content);
}
