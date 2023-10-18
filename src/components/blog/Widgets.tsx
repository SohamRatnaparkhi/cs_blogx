"use client";
import sendTransaction from '@/hooks/Fund';
import { getWalletDetails } from '@/hooks/Web3';
import React, { useState } from 'react'

const Widgets = () => {
    const [recieverId, setRecieverId] = useState("");
    const [value, setValue] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const style = {
        wrapper: `flex-[1] p-4 font-normal overflow-y-auto`,
        searchBar: `flex items-center bg-[#243340] p-2 rounded-3xl`,
        searchIcon: `text-[#8899a6] mr-2`,
        inputBox: `bg-transparent outline-none`,
        section: `bg-[#192734] my-6 mx-6 rounded-xl overflow-hidden`,
        title: `p-2 font-bold text-lg`,
        showMore: `p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]`,
        item: `flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer`,
        newsItemLeft: `flex-1`,
        newsItemCategory: `text-[#8899a6] text-xs font-semibold`,
        newsItemTitle: `text-sm font-bold`,
        newsItemRight: `w-1/5 ml-3`,
        newsItemImage: `rounded-xl h-14 w-14 object-cover`,
        followAvatarContainer: `w-1/6`,
        followAvatar: `rounded-full h-[40px] w-[40px]`,
        profileDetails: `flex-1`,
        name: `font-bold`,
        handle: `text-[#8899a6]`,
        followButton: `bg-white text-black px-3 py-1 rounded-full text-xs font-bold`,
    };
    const transferMatics = async () => {
        const { address } = await getWalletDetails();
        if (address == null) {
            alert("Please connect your wallet");
            return;
        }
        
        const tx: Transaction = {
            from: address,
            to: recieverId,
            value: value.toString(),
            gas: "21000",
            gasPrice: "8000000000",
        }
        console.log(tx)
        await sendTransaction(tx)
    }
    return (
        <div>
            <div className={style.section}>
                <div className="matic-transfer-form">
                    <div className="text-xl p-2 font-bold ">Transfer Ethers/Matics </div>
                    <div className="form-input my-4">
                        <div className="h-10">
                            <input
                                type="text"
                                className="bg-white rounded-md text-sm w-5/6 py-2 px-4 text-black font-bold"
                                value={recieverId}
                                onChange={(e) => {
                                    setRecieverId(e.target.value);
                                }}
                                placeholder="Enter reciever address"
                            />
                        </div>
                        <br />
                        <div className="h-10">
                            <input
                                type="text"
                                className="bg-white rounded-md text-sm w-5/6 py-2 px-4 text-black font-bold"
                                value={value}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setValue("0");
                                    } else {
                                        setValue(e.target.value);
                                    }
                                }}
                                placeholder="Enter amount"
                            />
                        </div>
                        <br />
                        <div className="h-10 w-1/2 m-auto">
                            <button
                                className="bg-blue-500 text-white rounded-md text-xl w-full py-2 px-4 "
                                onClick={transferMatics}
                            >
                                Transfer{" "}
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={style.showMore}
                    onClick={() => {
                        setRecieverId("");
                        setValue("0");
                    }}
                >
                    Reset all values
                </div>
            </div>
        </div>
    )
}

export default Widgets
