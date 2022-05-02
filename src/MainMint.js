import {useState } from "react";
// import { ethers, BigNumber } from "ethers";
import SkaterPunks from "./SkaterPunks.json";
import React from 'react';
const { ethers } = require("ethers");

const SkaterPunksAddress = "0x1591E3cDB0360ABDb764B6c9F8F61F9794fdf12c";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                SkaterPunksAddress,
                SkaterPunks.abi,
                signer,
            )
            const tokenPrice = await contract.cost();
            try {
                const response = await contract.mint(ethers.BigNumber.from(mintAmount), {value: tokenPrice.mul(mintAmount)});
                console.log("response: ", response);                
            }   catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }
    const handleIncrement = () => {
        if (mintAmount <= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <h1>SkaterPunks</h1>
            <p>It's 1995 and skater punks are causing mayhem on the streets of New York. Come join the fun and mint your own skater punk today.</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value ={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to Mint. </p>
            )}
        </div>
    )
}

export default MainMint;