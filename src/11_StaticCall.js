import "dotenv/config";
import { ethers } from "ethers";
import ADDRESS from "./address.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abiDAI = [
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
];
const contractDAI = new ethers.Contract(
  ADDRESS.DAI_MAINNET_ADDRESS,
  abiDAI,
  provider
);

const address = await wallet.getAddress();
const address2 = "0x5382c1192d1123C5644FaA17920693e8f38E3e7b";
console.log("\n1. 读取测试钱包的DAI余额");
const balanceDAI = await contractDAI.balanceOf(address);

const balanceDAI2 = await contractDAI.balanceOf(address2);
console.log(`address1 DAI持仓: ${ethers.formatEther(balanceDAI)}\n`);

console.log(`address2 DAI持仓: ${ethers.formatEther(balanceDAI2)}\n`);

console.log(
  "\n2. 用staticCall尝试调用transfer转账1 DAI，msg.sender为address2地址"
);

const tx = await contractDAI.transfer.staticCall(
  address,
  ethers.parseEther("1"),
  { from: address2 }
);
console.log("交易是否成功？：", tx);

console.log(
  "\n3. 用staticCall尝试调用transder转账10000 DAI，msg.sender为address地址"
);
const tx2 = await contractDAI.transfer.staticCall(
  address2,
  ethers.parseEther("10000"),
  { from: address }
);
console.log("交易是否成功？：", tx2);
