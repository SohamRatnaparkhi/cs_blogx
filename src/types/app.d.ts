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

declare type Transaction = {
    from: string;
    to: string;
    gas: string;
    gasPrice: string;
    value: string;
}

declare type Campaign = {
    owner: string; // Assuming 'address' is represented as a string
    title: string;
    description: string;
    target: number;
    deadline: number;
    amountCollected: number;
    imgUrl: string;
    donators: string[]; // Assuming 'address[]' is represented as an array of strings
    donations: number[]; // Assuming 'uint256[]' is represented as an array of numbers
};