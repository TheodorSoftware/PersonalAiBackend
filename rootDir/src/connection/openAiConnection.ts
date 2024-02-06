import OpenAI from 'openai';

class OpenAIConnection {

    private static openaiInstance: OpenAIConnection;
    private readonly connection: OpenAI;
    
    constructor(){
        this.connection = new OpenAI(
            {
                apiKey: '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',
                dangerouslyAllowBrowser: true
            }
        );
    };

    static getInstance(): OpenAI{
        if(!this.openaiInstance){
            OpenAIConnection.openaiInstance = new OpenAIConnection();
        }
        return OpenAIConnection.openaiInstance.connection;
    };
};

export default OpenAIConnection.getInstance();