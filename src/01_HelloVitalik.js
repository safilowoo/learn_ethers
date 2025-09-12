import { ethers } from "ethers";

const ALCHEMY_SEPOLIA_URL =
  "https://eth-sepolia.g.alchemy.com/v2/PD8J-KQwITFuhVXTj1DKr";

const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

const main = async () => {
  const balance = await provider.getBalance(`vitalik.eth`);
  console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
};
main();
