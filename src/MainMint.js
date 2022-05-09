import { Flex, Box, Text, Button, Input } from "@chakra-ui/react";
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
    <Flex justify="center" align="center" height="100vh" paddingBottom="550px">
      <Box width="520px">
        <div>
          <Text fontSize="40px" textShadow="0 3px #FFFFFF">
            Skater Punks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #FFFFFF"
          >
            He was a skater boy. She said, "See you later, boy"
          </Text>

          {isConnected ? (
            <div>
              <Flex align="center" justify="center">
                <Button
                  backgroundColor="58 58 58"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="black"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  marginTop="10px"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Input
                  readOnly
                  fontFamily="inherit"
                  width="100px"
                  height="50px"
                  textAlign="center"
                  paddingLeft="19px"
                  marginTop="10px"
                  type="number"
                  value={mintAmount}
                />
                <Button
                  backgroundColor="58 58 58"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="black"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  marginTop="10px"
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </Flex>
              <Button
                backgroundColor="58 58 58"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="black"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleMint}
              >
                Mint Now
              </Button>
            </div>
          ) : (
            <Text
              marginTop="70px"
              fontSize="30px"
              letterSpacing="-5.5%"
              fontFamily="VT323"
              textShadow="0 2px #FFFFFF"
              color="58 58 58"
            >
              Please connect your MetaMask account to mint your own Skater Punks
            </Text>
          )}
        </div>
      </Box>
    </Flex>
  );
};

export default MainMint;
