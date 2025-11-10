export type Note = {
    id ?: number,
    userId ?: number,
    title : string,
    content: string,
    is_public: number,
};

export type User = {
    id ?: number,
    name ?: string,
    email: string,
    password ?:string,
};