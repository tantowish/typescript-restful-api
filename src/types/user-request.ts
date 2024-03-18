import { Request } from "express";

export interface UserRequest extends Request {
    headers: {
        authorization: string
    },
    user: {
        username: string,
        email: string,
        name: string
    }
}