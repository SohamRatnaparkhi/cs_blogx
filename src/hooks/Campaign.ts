import { CampaignContract } from "@/contracts/Contract";
import { ethers } from "ethers";
import { getWalletDetails } from "./Web3";
import sendTransaction from "./Fund";

export const createCampaign = async (campaign: Campaign) => {
    const contact = CampaignContract;
    const { signer } = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const contract = new ethers.Contract(contact.address, contact.abi, signer);
    const tx = await contract.createCampaign(campaign.owner, campaign.title, campaign.description, campaign.target, campaign.deadline, campaign.imgUrl);
    await tx.wait();
    return true;
}

export const getCampaigns = async () => {
    const contact = CampaignContract;
    const { signer } = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const contract = new ethers.Contract(contact.address, contact.abi, signer);
    const campaigns = await contract.getCampaigns();
    return campaigns;
}

export const donateToCampaign = async (campaignId: number, amount: number) => {
    const contact = CampaignContract;
    const { address, signer } = await getWalletDetails();
    if (!signer) {
        return null;
    }
    
    const contract = new ethers.Contract(contact.address, contact.abi, signer);
    const campaigns = await contract.getCampaigns();
    const transaction1 : Transaction = {
        from: address,
        to: campaigns[campaignId].owner,
        value: amount.toString(),
        gas: "21000",
        gasPrice: "8000000000",
    }
    await sendTransaction(transaction1);
    const tx = await contract.donateToCampaign(campaignId, amount);
    await tx.wait();
    return true;
}

export const getCampaign = async (id: number) => {
    const contact = CampaignContract;
    const { signer } = await getWalletDetails();
    if (!signer) {
        return null;
    }
    const contract = new ethers.Contract(contact.address, contact.abi, signer);
    const campaign = await contract.getCampaigns();
    return campaign[id];
}