import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { CreateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from 'bcrypt'

export class UserService {
    static async register(req: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.Register, req)

        const duplicateUsername = await prismaClient.user.findMany({
            where:{
                username: registerRequest.username
            }
        })

        if(duplicateUsername.length>0){
            throw new ResponseErorr(400, "Username has already taken")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }
}