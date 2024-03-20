import { Post } from "@prisma/client"
import { string } from "zod"

export type PostResponse = {
    id: string
    title: string
    content: string
    author: string
}

export type CreatePostRequet = {
    title: string
    content: string
}

export type UpdatePostRequest = {
    title?: string
    content?: string
}

export function toPostResponse(post: Post) {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author
    }
}

export function toPostResponseArray(posts: Post[]): Post[] {
    return posts.map(post => post);
}