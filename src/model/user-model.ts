import { User } from "@prisma/client"

export type UserResponse = {
    username: string,
    name: string,
    email: string
}

export type RegisterRequest = {
    username: string
    name: string
    password: string
    email: string
}

export type LoginRequest = {
    email: string,
    password: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        name: user.name,
        email: user.email
    }
}