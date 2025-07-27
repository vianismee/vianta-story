

export type Post = {
    id: number
    created_at: string
    post_slug: string
    header_image_url: string
    title: string
    content: JSON
}

export type PostMatrix = {
    id: number
    view_count: number
    like_count: number
}