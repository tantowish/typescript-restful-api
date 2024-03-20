import { Post, User } from "@prisma/client";
import { CreatePostRequet, PostResponse, UpdatePostRequest, toPostResponse, toPostResponseArray } from "../model/post-model";
import { Validation } from "../validation/validation";
import { PostValidation } from "../validation/post-validation";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { UserService } from "./user-service";

export class PostService {
    static async checkPostExist(id: string, user: User){
        const post = await prismaClient.post.findUnique({
            where:{
                id: id,
                author: user.username
            }
        })

        if(!post){
            throw new ResponseErorr(404, "Post not found")
        }
    }

    static async create(user: User, req: CreatePostRequet): Promise<PostResponse> {
        const createRequest = Validation.validate(PostValidation.CREATE, req)

        const post = await prismaClient.post.create({
            data: {
                ...createRequest,
                author: user.username
            }
        })

        return toPostResponse(post);
    }

    static async getAll(): Promise<PostResponse[]> {
        const posts = await prismaClient.post.findMany()

        return toPostResponseArray(posts)
    }

    static async getPostByUser(username: string): Promise<PostResponse[]>{
        await UserService.checkUserExist(username)

        const posts = await prismaClient.post.findMany({
            where:{
                author: username
            }
        })

        return toPostResponseArray(posts)
    }

    static async get(id: string): Promise<PostResponse>{
        const post = await prismaClient.post.findUnique({
            where:{
                id: id
            }
        })

        if(!post){
            throw new ResponseErorr(404, "Post not found")
        }

        return toPostResponse(post)
    }

    static async update(user: User, id: string, req: UpdatePostRequest): Promise<PostResponse> {
        const updateRequest = Validation.validate(PostValidation.UPDATE, req)

        await this.checkPostExist(id, user)

        const post = await prismaClient.post.update({
            where:{
                id: id,
                author: user.username
            },
            data: updateRequest
        })

        return toPostResponse(post)
    }

    static async delete(user: User, id: string): Promise<PostResponse> {
        await this.checkPostExist(id, user)

        const post = await prismaClient.post.delete({
            where:{
                id: id,
                author: user.username
            }
        })

        return toPostResponse(post)
    }
}