import { User } from "@prisma/client"

export type UserResponse = {
    username: string,
    name: string,
    email: string
}

export type LoginResponse = {
    data: UserResponse,
    token: string
}

export type RegisterRequest = {
    username: string
    name: string
    password: string
    email: string
}

export type UpdateUserRequest = {
    name?: string,
    password?: string
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

export function toUserLoginResponse(user: User, token: string): LoginResponse {
    return {
        data: {
            username: user.username,
            name: user.name,
            email: user.email,
        },
        token: token
    }
}