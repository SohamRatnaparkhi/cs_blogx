declare type Blog = {
    id: number;
    title: string;
    content: string;
    author: string; 
    timestamp: number;
    comments: number[]; 
    isDeleted: boolean;
    likes: number;
    imgUrl: string;
};

declare type User = {
    username: string;
    password: string;
    ethAddress: string;
}