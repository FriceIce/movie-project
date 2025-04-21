import { Request, Response } from 'express';
import { systemPrompt } from '../../data/systemPrompt';
import { tools } from './service/functionSchema/functionSchema';
import { handleToolResponse } from './service/chat.service';
import { errorHandler } from '../../error/errorFunc';
import { asyncHandler } from '../../error/errorAsyncHandler';

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
        type: type ?? 'Open AI did not use the tmbd api.',
        openai: {
            role: 'system',
            content: message,
        },
    });
});
