"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_controller_1 = __importDefault(require("../controllers/chatController.controller"));
let chatController = new chatController_controller_1.default;
const chatRouter = express_1.default.Router();
chatRouter.post('/talk', chatController.getResponse);
exports.default = chatRouter;
