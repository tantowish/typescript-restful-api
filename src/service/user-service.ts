import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { LoginRequest, RegisterRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from 'bcrypt'

export class UserService {
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

    static async login(req: LoginRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, req)

        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        })

        if (!user) {
            throw new ResponseErorr(404, "User not found")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if(!isPasswordValid){
            throw new ResponseErorr(401, "Email or password is invalid")
        }

        return toUserResponse(user)
    }
}