"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_config_1 = __importDefault(require("./src/config/app.config"));
const chatRouter_router_1 = __importDefault(require("./src/routes/chatRouter.router"));
//For env File 
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
(0, app_config_1.default)(app);
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.use('/chat', chatRouter_router_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
