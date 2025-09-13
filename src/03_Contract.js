import "dotenv/config";
import { ethers } from "ethers";
import configs from "./configs.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);

// WETH
const abiWETH = configs.WETH_SEPOLIA_ABI;
const addressWETH = configs.WETH_SEPOLIA_ADDRESS;
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider);

// Human-Readable Abi, eg.DAI
const abiERC20 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];
const addressDAI = configs.DAI_SEPOLIA_ADDRESS;
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider);

const main = async () => {
  // 1. 读取WETH合约的链上信息（WETH abi）
  const nameWETH = await contractWETH.name();
  const symbolWETH = await contractWETH.symbol();
  const totalSupplyWETH = await contractWETH.totalSupply();
  console.log("\n1. 读取WETH合约信息");
  console.log(`合约地址: ${addressWETH}`);
  console.log(`名称: ${nameWETH}`);
  console.log(`代号: ${symbolWETH}`);
  console.log(`总供给: ${ethers.formatEther(totalSupplyWETH)}`);

  const balanceWETH = await contractWETH.balanceOf("vitalik.eth");
  console.log(`VItalik持仓: ${ethers.formatEther(balanceWETH)}`);

  // 2. 读取DAI合约的链上信息（IERC20接口合约）
  const nameDAI = await contractDAI.name();
  const symbolDAI = await contractDAI.symbol();
  const totalSupplyDAI = await contractDAI.totalSupply();
  console.log("\n2. 读取DAI合约信息");
  console.log(`合约地址: ${addressDAI}`);
  console.log(`名称: ${nameDAI}`);
  console.log(`代号: ${symbolDAI}`);
  console.log(`总供给: ${ethers.formatEther(totalSupplyDAI)}`);

  const balanceDAI = await contractDAI.balanceOf("vitalik.eth");
  console.log(`Vitalik持仓: ${ethers.formatEther(balanceDAI)}`);
};

main();
