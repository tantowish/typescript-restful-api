import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { LoginRequest, RegisterRequest, UpdateUserRequest, LoginResponse, UserResponse, toUserLoginResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "@prisma/client";

export class UserService {
    static async checkUserExist(username: string) {
        const checkUserExist = await prismaClient.user.findUnique({
            where: {
                username: username
            }
        })

        if (!checkUserExist) {
            throw new ResponseErorr(404, "User not found")
        }
    }

    static async register(req: RegisterRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, req)

        const duplicateEmail = await prismaClient.user.findMany({
            where: {
                email: registerRequest.email
            }
        })

        if (duplicateEmail.length > 0) {
            throw new ResponseErorr(400, "Email has already taken")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }

    static async login(req: LoginRequest): Promise<LoginResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, req)

        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email,
            }
        })

        if (!user) {
            throw new ResponseErorr(404, "User not found")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!isPasswordValid) {
            throw new ResponseErorr(401, "Email or password is invalid")
        }

        const payload = {
            username: user.username,
            email: user.email,
            name: user.name,
        }
        const secretKey = process.env.SECRET_KEY!
        const expiresIn = 60 * 60
        const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn })

        return toUserLoginResponse(user, token)
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, req: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, req)

        await this.checkUserExist(user.username)

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const userUpdate = await prismaClient.user.update({
            where: {
                username: user.username,
                email: user.email
            },
            data: {
                username: user.name,
                password: user.password
            }
        })

        return toUserResponse(userUpdate)
    }
}