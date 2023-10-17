import blogAbi from './blog/abi.json'
import { bytecode as blogBytecode } from './blog/bytecode';
import userAbi from './user/abi.json'
import { bytecode as userBytecode } from './user/bytecode';

interface Contract {
    name: string;
    address: string;
    abi: any[];
    bytecode: string;
}

export const BlogContract: Contract = {
    name: 'Blog',
    address: '0xc071069E88f9AB06e732e814F6f17F8e4E072b97',
    abi: blogAbi,
    bytecode: blogBytecode
}

export const UserContract: Contract = {
    name: 'User',
    address: '0xDf322F826C45aA0e2484833dA1A60bd5629b434a',
    abi: userAbi,
    bytecode: userBytecode
}