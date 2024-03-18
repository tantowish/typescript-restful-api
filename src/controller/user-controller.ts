import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterRequest = req.body as RegisterRequest
            const response = await UserService.register(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const request: LoginRequest = req.body as LoginRequest
            const response = await UserService.login(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}