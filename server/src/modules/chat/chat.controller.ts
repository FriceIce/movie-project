import { Request, Response } from 'express';
import { systemPrompt } from '../../data/systemPrompt';
import { asyncHandler } from '../../error/errorAsyncHandler';
import { handleToolResponse } from './service/chat.service';
import { tools } from './service/functionSchema/functionSchema';

/**
 * This controller function communicates with the openai chat completion endpoint.
 * @method POST
 * @route /api/chatbot
 */

export const chatbot = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { chatHistory, userInput }: { chatHistory: Message[]; userInput: Message } = req.body;

    const { type, message } = await handleToolResponse(
        [systemPrompt, ...chatHistory, userInput],
        tools
    );

    res.status(200).json({
        type: type ?? 'Open AI did not use the tmdb api.',
        openai: {
            role: 'system',
            content: message,
        },
    });
});
