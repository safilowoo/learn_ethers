import "dotenv/config";
import { ethers } from "ethers";
import ADDRESS from "./address.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);
const abiERC721 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function supportsInterface(bytes4) public view returns(bool)",
];

const contractERC721 = new ethers.Contract(
  ADDRESS.BAYC_MAINNET_ADDRESS,
  abiERC721,
  provider
);
const selectorERC721 = "0x80ac58cd";

const main = async () => {
  try {
    const nameERC721 = await contractERC721.name();
    const symbolERC721 = await contractERC721.symbol();
    console.log(ADDRESS.BAYC_MAINNET_ADDRESS, nameERC721, symbolERC721);

    const isERC721 = await contractERC721.supportsInterface(selectorERC721);
    console.log(`合约是否为ERC721标准: ${isERC721}`);
  } catch (e) {
    console.log(e);
  }
};

main();
