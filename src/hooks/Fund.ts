import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum?: any;
    }
}

const sendTransaction = async (transaction: Transaction) => {
    try {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: transaction.from,
                    to: transaction.to,
                    value: ethers.utils.parseEther(transaction.value).toHexString(),
                    gas: ethers.utils.hexlify(Number(transaction.gas)),
                    gasPrice: ethers.utils.hexlify(Number(transaction.gasPrice)),
                }],
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export default sendTransaction;