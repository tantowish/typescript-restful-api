import { Request, Response, NextFunction } from "express";
import { ResponseErorr } from "../error/reponse-error";
import jwt from 'jsonwebtoken'
import { UserRequest } from "../types/user-request";
import { UserResponse } from "../model/user-model";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        throw new ResponseErorr(401, "Token is required")
    }

    const token = authorization.split(' ')[1];
    const secretKey = process.env.SECRET_KEY!

    try {
        const jwtDecode = jwt.verify(token, secretKey)

        if (typeof jwtDecode !== 'string') {
            req.user = jwtDecode as UserResponse
        }
    } catch (error) {
        throw new ResponseErorr(401, "Unauthorized")
    }
    next()
}