
"use client";
import { addBlog } from '@/hooks/Blogs';
import { getjwt } from '@/hooks/Ipfs';
import axios from 'axios';
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';
import React, { use, useRef, useState } from 'react'
import { BsCardImage } from "react-icons/bs";
import { ImUpload2 } from "react-icons/im";

const PostBlog = () => {
    const style = {
        wrapper: `sticky border-b-2 border-b-indigo-500 flex flex-row pt-2 p-8 pb-0 rounded-2xl`,
        contentBoxLeft: `mr-4`,
        contentBoxRight: `flex-1 p-4 bg-slate-800 rounded-2xl`,
        profileImage: `w-16 h-16 rounded-full mt-6 ml-1 mr-0`,
        inputField: `w-full h-full box-content outline-none bg-transparent text-lg pb-0 py-3 px-2 border-b-2 border-b-indigo-500 `,
        formLowerContainer: `flex`,
        iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
        icon: `mr-2 w-7 h-7 m-2 hover:bg-[#15202b] rounded-full p-1 cursor-pointer`,
        submitGeneral: `text-xl font-bold py-2 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:white text-white font-bold py-2 px-4 rounded-full my-2 mx-4 mt-3 pl-3`,
        submitmatic:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl w-40 m-auto mt-10",
        inactiveSubmit: `bg-[#196195] text-[#95999e]`,
        activeSubmit: `bg-[#1d9bf0] text-white`,
    };

    const router = useRouter();
    const [contentMessage, setContentMessage] = useState("");
    const [title, setTitle] = useState("");
    const inputFile = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const onImageClick = () => {
        if (inputFile.current) inputFile.current.click();
    };
    const changeHandler = (event: any) => {
        const img = event.target.files[0];
        setFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };
    const sendBlog = async (e: any) => { 
        e.preventDefault();
        var ipfsUrl: string = "";
        if (file) {
            ipfsUrl = await uploadToIpfs(file) ?? "";
        }
        const response = await addBlog(title, contentMessage, ipfsUrl);
        if (response)
            router.push('/blog')
    };
    const uploadToIpfs = async (currFile: any) => {
        const formData = new FormData();
        formData.append("file", currFile);
        console.log(currFile);
        const metadata = JSON.stringify({
            name: currFile.name,
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        const JWT = `Bearer ${getjwt()}`;

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData as any,
                {
                    maxBodyLength: Infinity,
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${(formData as any)._boundary}`,
                        Authorization: JWT,
                    },
                }
            );
            console.log(res.data);
            return "ipfs.io/ipfs/" + res.data.IpfsHash || "";
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.contentBoxLeft}>
                    <img
                        src="/pfp2.png"
                        alt="profile image"
                        className={style.profileImage}
                    />
                </div>
                <div className={style.contentBoxRight}>
                    <form>
                        <textarea onChange={(e) => setTitle(e.target.value)} className={style.inputField} name="" id="" rows={2} placeholder='Title'></textarea>
                        <textarea
                            onChange={(e) => setContentMessage(e.target.value)}
                            value={contentMessage}
                            placeholder="Start typing"
                            className={style.inputField}
                            rows={10}
                        />
                        {selectedFile && (
                            <img src={selectedFile} alt="selected file" className="w-full" />
                        )}

                        <div className={style.formLowerContainer}>
                            <div className={style.iconsContainer} onClick={onImageClick}>
                                <input
                                    type="file"
                                    name="file"
                                    ref={inputFile}
                                    onChange={changeHandler}
                                    style={{ display: "none" }}
                                />
                                <BsCardImage className={style.icon} />
                            </div>

                            <div
                                onClick={sendBlog}
                                className={`${style.submitmatic} ${contentMessage ? style.activeSubmit : style.inactiveSubmit
                                    }`}
                            >
                            Publish blog
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostBlog
