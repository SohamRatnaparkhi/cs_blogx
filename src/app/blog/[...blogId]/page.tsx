"use client";
import React, { use, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { BiTransfer } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiOutlineCopy } from "react-icons/ai";
import { getIndividualBlog } from '@/hooks/Blogs';

const IndividualBlogPage = ({ params }: {
    params: {
        blogId: string
    }
}) => {
    const style = {
        blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
        profile: `flex items-center flex-row p-2`,
        profilechars: `flex-1 text-md font-bold`,
        engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md`,
        blogText: `text-md font-bold`,
    };
    const [blog, setBlog] = React.useState<Blog | null>();
    const [username, setUsername] = React.useState<string>();
    // const blogId = params.blogId.replace("_0x", "/").split("/")[1];
    const [blogId, setBlogId] = React.useState<string>();
    useEffect(() => {
        if (params.blogId) {
            const blogId = params.blogId[2];
            setBlogId(blogId);
        }
    }, [blogId, params.blogId]);
    useEffect(() => {
        const getBlog = async () => {
            if (params.blogId) {
                const blogId = params.blogId[2];
                setBlogId(blogId);
                const username = params.blogId[0];
                setUsername(username);
                const blog = await getIndividualBlog(blogId || "1");
                setBlog(blog);
            }
        }
        getBlog();
    }, [blogId, params.blogId]);
    return (
        <div>
            {blogId}
            <div>
                <div className={style.blogs} >
                    <div>
                        <div className={style.profile}>
                            <div className="flex-shrink-0">
                                <Image
                                    className="rounded-full"
                                    src={
                                        "/pfp1.png"
                                    }
                                    alt=""
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className={style.profilechars}>
                                <p className="font-bold">{blog?.author.slice(0, 10) +
                                    "...." +
                                    blog?.author.slice(-4)}</p>
                                <p className="text-gray-500">
                                    {/* {blog.author.slice(0, 10) +
                                    "...." +
                                    blog.author.slice(-4)} */}
                                    
                                        {username}
                                    
                                </p>
                            </div>
                        </div>
                        {blog?.imgUrl && blog.imgUrl && <Image
                            src={"https://" + blog?.imgUrl || ""}
                            alt='fds'
                            loading='lazy'
                            // alt={blog?.imgUrl}
                            width={500}
                            height={500}
                        />}
                        <div className={style.blogText}>
                            <div className={style.blogText}>
                                {" "}
                                {blog?.content}{" "}
                            </div>

                        </div>
                        <div className={style.engage}>
                            <div className="flex flex-row gap-4">
                                <div className="flex items-center gap-1">
                                    <AiOutlineStar className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <AiOutlineMessage className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <BiTransfer className="w-5 h-5 text-green-400" />
                                </div>
                                {/* <div className="flex items-center gap-1">
                                {  (
                                    <AiFillDelete className="w-5 h-5 text-green-400"
                                        onClick={onClick} />
                                )}

                            </div> */}
                                <div className="flex items-center gap1">
                                    <BsFillPersonPlusFill className="w-5 h-5 text-green-400" />
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-1"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        blog!.author
                                    );
                                    alert("Copied to clipboard!");
                                }}
                            >
                                <AiOutlineCopy />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualBlogPage
