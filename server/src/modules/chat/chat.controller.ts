import { Request, Response } from 'express';
import { systemPrompt } from '../../data/systemPrompt';
import { tools } from './service/functionSchema/functionSchema';
import { handleToolResponse } from './service/chat.service';
import { errorHandler } from '../../utils/error/errorFunc';

/**
 * This controller function communicates with the openai chat completion endpoint.
 * @method POST
 * @route /api/chatbot
 */

export async function chatbot(req: Request, res: Response): Promise<void> {
    const { chatHistory, userInput }: { chatHistory: Message[]; userInput: Message } = req.body;

    try {
        const { type, message } = await handleToolResponse(
            [systemPrompt, ...chatHistory, userInput],
            tools
        );

        res.status(200).json({
            type: type ?? 'Open AI did not use the tmbd api.',
            openai: {
                message,
            },
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
