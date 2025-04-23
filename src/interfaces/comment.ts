export interface postComment {
    content: string;
    like: number;
    ratingStar: number;
}

export interface comments {
    _id: string;
    productId:string;
    userId: string;
    content: string;
    like: number;
    ratingStar: number;
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
