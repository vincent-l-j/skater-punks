import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import email from "./assets/social-media-icons/email_32x32.png";
import facebook from "./assets/social-media-icons/facebook_32x32.png";
import twitter from "./assets/social-media-icons/twitter_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* Left side of NavBar  - Social Media Icons */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://www.facebook.com">
          <Image src={facebook} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.twitter.com">
          <Image src={twitter} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.gmail.com">
          <Image src={email} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      {/* Right Side - Sections and Connect */}
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />

        {/* Connect */}
        {isConnected ? (
          <Box margin="0 15px">Connected</Box>
        ) : (
          <Button
            backgroundColor="darkgoldenrod"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="black"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
          >
            Connect Account
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
