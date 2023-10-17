"use client";

import { getAllBlogs } from '@/hooks/Blogs'
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const Feed = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const getBlogs = async () => {
        const response = await getAllBlogs();
        console.log(response)
        if (response) {
            const { blogs, users } = response;
            console.log(blogs);
            setBlogs(blogs);
            setUsers(users);
        }
    }
    useEffect(() => {
        getBlogs();
    }, [])
    return (
        <div className="bg-slate-800 pb-4">
            {
                blogs && blogs.map((blog: Blog) => {
                    return (
                        <Blog blog={blog} key={blog.id} user={users.filter((user: User) => user.ethAddress == blog.author)[0]} />
                    )
                })
            }
        </div>
    )
}

export default Feed
