import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);

const main = async () => {
  const balance = await provider.getBalance(
    `0x70D87D6e3e5a0c6DfaBA155F9Ce73d789B1501fD`
  );
  console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
};
main();
