"use client";
import React from 'react'
import SidebarOption from '../ui/SidebarOption'
import {AiOutlineHome} from 'react-icons/ai'
import {FaRegListAlt} from 'react-icons/fa'
import {BiMoneyWithdraw} from 'react-icons/bi'
import {AiOutlinePhone} from 'react-icons/ai'

const Sidebar = () => {
    const [selected, setSelected] = React.useState<string>("blog")
    const styles = {
        container: "py-4 px-10 bg-gray-50 rounded-2xl h-full w-3/4 m-auto mt-4",
        title:
            "text-4xl font-bold py-4 hover:underline cursor-pointer font-normal hover:font-bold",
        option:
            "flex flex-col justify-center items-center py-2 hover:bg-slate-700 cursor-pointer mx-12 rounded-2xl",
        publish:
            "text-2xl font-bold py-4 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-2xl w-1/2 m-auto mt-8",
        largerscreens: "sticly top-5",
        logout:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl w-1/2 m-auto mt-10",
    };
    const option = ["Blogs", "Crowd-Funding", "Profile", "Contact Us"]
    return (
        <div>
            <div className={styles.largerscreens}>
                <div className={styles.container} style={{ backgroundColor: "#192734" }}>
                    <hr />

                    <SidebarOption
                        option={option[0]}
                        Icon={FaRegListAlt}
                        isActive={Boolean(selected === option[0])}
                        setSelected={setSelected}
                        redirect="/blog"
                    />
                    <SidebarOption
                        option={option[1]}
                        Icon={BiMoneyWithdraw}
                        isActive={Boolean(selected === option[1])}
                        setSelected={setSelected}
                        redirect="/fund"
                    />
                    <SidebarOption
                        option={option[2]}
                        Icon={AiOutlineHome}
                        isActive={Boolean(selected === option[2])}
                        setSelected={setSelected}
                        redirect="/profile"
                    />
                    <SidebarOption
                        option={option[3]}
                        Icon={AiOutlinePhone}
                        isActive={Boolean(selected === option[3])}
                        setSelected={setSelected}
                        redirect="/"
                    />
                    <hr />
                </div>
                <div
                    className="logout"
                >
                    <div className={styles.logout}>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
