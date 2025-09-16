import "dotenv/config";
import { ethers, Wallet } from "ethers";
import ADDRESS from "./address.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
];
const contractWETH = new ethers.Contract(
  ADDRESS.WETH_SEPOLIA_ADDRESS,
  abiWETH,
  wallet
);

const main = async () => {
  const address = await wallet.getAddress();
  console.log("\n1. 读取WETH余额");
  const param1 = contractWETH.interface.encodeFunctionData("balanceOf", [
    address,
  ]);
  console.log(`编码结果: ${param1}`);
  const tx1 = {
    to: ADDRESS.WETH_SEPOLIA_ADDRESS,
    data: param1,
  };

  const balanceWETH = await provider.call(tx1);
  console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);

  const balanceETH = await provider.getBalance(wallet);
  if (ethers.formatEther(balanceETH) > 0.0015) {
    console.log("\n2. 调用deposit()函数，存入0.001 ETH，将0.001 ETH转为WETH");
    const param2 = contractWETH.interface.encodeFunctionData("deposit");
    console.log(`编码结果: ${param2}`);
    const tx2 = {
      to: ADDRESS.WETH_SEPOLIA_ADDRESS,
      data: param2,
      value: ethers.parseEther("0.001"),
    };

    const receipt = await wallet.sendTransaction(tx2);
    await receipt.wait();
    console.log("交易详情");
    console.log(receipt);
    const balanceWETH_deposit = await contractWETH.balanceOf(address);
    console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`);
  } else {
    console.log("ETH不足");
  }
};

main();
