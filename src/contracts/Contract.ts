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
    address: '0x24ca1FcEC990504c0F8D92BC2d861afF4Ad9d890',
    abi: blogAbi,
    bytecode: blogBytecode
}

export const UserContract: Contract = {
    name: 'User',
    address: '0x1c90F1c39bB9C8A5434D5878390664e1726B4018',
    abi: userAbi,
    bytecode: userBytecode
}