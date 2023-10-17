import { UserContract } from "@/contracts/Contract";
import { ethers } from "ethers";

export const getWalletDetails = async () => {
    if (!(window as any).ethereum)
        return { address: null, signer: null, provider: null };

    await (window as any).ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { address, signer, provider };
};

export const loginUser = async (username: string, password: string) => {
    const {signer} = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const userContract = UserContract;
    const contract = new ethers.Contract(userContract.address, userContract.abi, signer);
    console.log(contract)
    const tx = await contract.login(username, password);
    // contract.on("LoginAttempt", (address, success) => {
    //     console.log(address, success)
    // })

    // await tx.wait();
    console.log(tx)
    return contract;
}

export const registerUser = async (username: string, password: string) => {
    const {signer} = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const userContract = UserContract;
    const contract = new ethers.Contract(userContract.address, userContract.abi, signer);
    console.log(contract)
    console.log(username, password)
    const tx = await contract.register(username, password);
    // contract.on("LoginAttempt", (address, success) => {
    //     console.log(address, success)
    // })

    // await tx.wait();
    console.log(tx)
    return contract;
}