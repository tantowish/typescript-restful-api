import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../types/user-request";
import { User } from "@prisma/client";

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

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginRequest = req.body as LoginRequest
            const response = await UserService.login(request)

            res.status(200).json(response)
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest
            const response = await UserService.update(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e){
            next(e)
        }
    }
}