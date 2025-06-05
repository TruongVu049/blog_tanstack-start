export interface User {
    id: string;
    fullName: string;
    username: string;
    password: string;
    createdAt: string;
}

export interface Post {
    id?: string;
    title: string;
    content: string;
    userId?: string;
    createdAt?: string;
}
