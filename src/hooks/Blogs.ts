import { BlogContract, UserContract } from "@/contracts/Contract"
import { getWalletDetails } from "./Web3";
import { ethers } from "ethers";

export const getAllBlogs = async (): Promise<{
    blogs: Blog[],
    users: User[]
} | null> => {
    const blogsContract = BlogContract;
    const userContract = UserContract;
    const { signer } = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const blogsEtherContract = new ethers.Contract(blogsContract.address, blogsContract.abi, signer);
    const blogs = await blogsEtherContract.getAllPosts();

    const usersEtherContract = new ethers.Contract(userContract.address, userContract.abi, signer);
    const users = await usersEtherContract.getAllUsers();

    console.log(users)

    return { blogs : blogs, users: users };
} 

export const addBlog = async (title: string, content: string, imgUrl: string): Promise<boolean> => {
    const blogsContract = BlogContract;
    const { signer } = await getWalletDetails();
    if (!signer) {
        return false;
    }
    const blogsEtherContract = new ethers.Contract(blogsContract.address, blogsContract.abi, signer);
    const tx = await blogsEtherContract.createPost(title, content, imgUrl);
    await tx.wait();
    return true;
}

export const getIndividualBlog = async (id: string): Promise<Blog | null> => {
    const blogsContract = BlogContract;
    const { signer } = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const blogsEtherContract = new ethers.Contract(blogsContract.address, blogsContract.abi, signer);
    const blog = await blogsEtherContract.getPost(id);
    console.log(blog)
    const mappedBlog : Blog = {
        id: blog[0],
        title: blog[1],
        content: blog[2],
        author: blog[3],
        timestamp: blog[4],
        comments: blog[5],
        likes: blog[6],
        imgUrl: blog[7],
        isDeleted: false
    }
    return mappedBlog;
}