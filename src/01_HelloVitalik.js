import { ethers } from "ethers";

const ALCHEMY_SEPOLIA_URL =
  "https://eth-sepolia.g.alchemy.com/v2/PD8J-KQwITFuhVXTj1DKr";

const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const main = async () => {
  const balance = await provider.getBalance(
    `0x70D87D6e3e5a0c6DfaBA155F9Ce73d789B1501fD`
  );
  console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
};
main();
