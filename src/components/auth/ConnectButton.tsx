"use client";

import { getWalletDetails } from '@/hooks/Web3';
import React from 'react'
import Login from './Login';
import Register from './Register';

const ConnectButton = () => {
  const [connected, setConnected] = React.useState(false)
  const [login, setLogin] = React.useState(false)

  const connectWallet = async () => {
    const { address, signer, provider } = await getWalletDetails();
    console.log(address, signer, provider);
    setConnected(true);
    setLogin(true);
  }

  return (
    <div>
      <div className="">
        {!connected && <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => connectWallet()}
        >
          Connect wallet
        </button>}
        {
          login?
            (
              <div>
                <Login />
                <p className="py-5 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <p onClick={() => setLogin(false)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</p>
                </p>
              </div>
            ) :
            (
              connected && <div>
                <Register />
                <p className="py-5 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <p onClick={() => setLogin(true)} className="font-medium text-primary-400 hover:underline dark:text-primary-500">Login</p>
                </p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default ConnectButton
