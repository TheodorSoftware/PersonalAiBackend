import { NextFunction , Request, Response} from "express";

function loginMiddleware (request: Request, response: Response, next: NextFunction){
    response.status(200);

    next()
};

export default loginMiddleware;