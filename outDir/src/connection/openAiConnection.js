"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
class OpenAIConnection {
    constructor() {
        this.connection = new openai_1.default({
            apiKey: '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',
            dangerouslyAllowBrowser: true
        });
    }
    ;
    static getInstance() {
        if (!this.openaiInstance) {
            OpenAIConnection.openaiInstance = new OpenAIConnection();
        }
        return OpenAIConnection.openaiInstance.connection;
    }
    ;
}
;
exports.default = OpenAIConnection.getInstance();
