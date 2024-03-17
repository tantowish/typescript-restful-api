import { User } from "@prisma/client"

export type UserResponse = {
    username: string,
    name: string,
}

export type CreateUserRequest = {
    username: string
    name: string
    password: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        name: user.name
    }
}