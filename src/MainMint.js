import { useState } from "react";
import skaterPunks from "./SkaterPunks.json";
const { ethers } = require("ethers");

const skaterPunksAddress = "0x1591E3cDB0360ABDb764B6c9F8F61F9794fdf12c";

const MainMint = ({ accounts, setAccounts }) => {
  // initialise mintAmount with value of 1
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  // callback for mint button
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        skaterPunksAddress,
        skaterPunks.abi,
        signer
      );
      const tokenPrice = await contract.cost();
      try {
        const response = await contract.mint(
          ethers.BigNumber.from(mintAmount),
          { value: tokenPrice.mul(mintAmount) }
        );
        console.log("response: ", response);
      } catch (err) {
        console.error("error: ", err);
      }
    }
  }

  // callback for minus button
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  // callback for plus button
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      <h1>Skater Punks</h1>
      <p>He was a skater boy. She said, "See you later, boy"</p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <div>
          Please connect your MetaMask account to mint your own Skater Punks
        </div>
      )}
    </div>
  );
};

export default MainMint;
