import { Response, NextFunction, Request } from "express";
import { UserRequest } from "../types/user-request";
import { CreatePostRequet, UpdatePostRequest } from "../model/post-model";
import { PostService } from "../service/post-service";
import { User } from "@prisma/client";

export class PostController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreatePostRequet = req.body as CreatePostRequet
            const response = await PostService.create(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await PostService.getAll()
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getPostByUser(req: Request, res: Response, next: NextFunction){
        try {
            const response = await PostService.getPostByUser(req.params.username)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await PostService.get(req.params.id)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdatePostRequest = req.body as UpdatePostRequest
            const response = await PostService.update(req.user as User, req.params.id, request)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await PostService.delete(req.user as User, req.params.id)
            res.status(200).json({
                message: "Post successfully deleted"
            })
        } catch(e) {
            next(e)
        }
    }
}