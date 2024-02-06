import express, { Express, Router } from "express";
import ChatController from "../controllers/chatController.controller";

let chatController: ChatController = new ChatController
const chatRouter: Router = express.Router();

chatRouter.post('/talk',chatController.getResponse)

export default chatRouter;