import { Request, Response } from 'express';
import { ClientInputRequestBodyFromChat } from "../models/ClientInputRequestBodyFromChat.interface";
import openAiConnection from '../connection/openAiConnection';
import { ChatCompletion } from 'openai/resources';

class ChatController{
    async getResponse(request: Request, response: Response){
        if(request.body){
            let messageFromClient: ClientInputRequestBodyFromChat = request.body;
            const completion = await openAiConnection.chat.completions.create({
                messages:[{role: "system", content: messageFromClient.clientInput as string}],
                model: "gpt-3.5-turbo"
            })
            response.send(completion);
        }
    }
}

export default ChatController;
