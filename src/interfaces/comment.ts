export interface postComment {
    content: string;
    like: number;
}

export interface comments {
    _id: string;
    productId:string;
    userId: string;
    content: string;
    like: number;
    user: {
        name: string;
        avatar: {
            path: string;
            pathpublic:string;
        };
        email: string;
    }
    likedBy: string[];
}
