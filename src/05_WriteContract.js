import "dotenv/config";
import { ethers } from "ethers";
import ADDRESS from "./address.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abiWETH = [
  "event Approval(address indexed,address indexed,uint256)",
  "event Deposit(address indexed,uint256)",
  "event Transfer(address indexed,address indexed,uint256)",
  "event Withdrawal(address indexed,uint256)",
  "function allowance(address,address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)",
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function deposit() payable",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function transferFrom(address,address,uint256) returns (bool)",
  "function withdraw(uint256)",
  "receive() payable",
];
const contractWETH = new ethers.Contract(
  ADDRESS.WETH_SEPOLIA_ADDRESS,
  abiWETH,
  wallet
);

const main = async () => {
  const address = await wallet.getAddress();

  // 1. 读取WETH合约的链上信息（WETH abi）
  console.log("\n1. 读取WETH余额");

  const balanceWETH = await contractWETH.balanceOf(address);
  console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);

  // 读取钱包内ETH余额
  const balanceETH = await provider.getBalance(wallet);
  console.log(`钱包ETH余额: ${ethers.formatEther(balanceETH)}\n`);

  // 如果钱包ETH足够
  if (ethers.formatEther(balanceETH) > 0.0015) {
    console.log("\n2. 调用deposit()函数，存入0.001 ETH");

    // 发起交易;
    const tx = await contractWETH.deposit({
      value: ethers.parseEther("0.001"),
    });

    // 等待交易上链
    await tx.wait();
    console.log("交易详情:");
    console.log(tx);

    const balacnceWETH_deposit = await contractWETH.balanceOf(address);
    console.log(
      `存款后WETH持仓: ${ethers.formatEther(balacnceWETH_deposit)}\n`
    );

    // 3. 调用transfer()函数，将0.001WETH转账给vitalik
    console.log("\n3. 调用transfer()函数，将0.001WETH转账给vitalik");

    console.log(
      `转账前Vitalik WETH余额: ${ethers.formatEther(
        await contractWETH.balanceOf("vitalik.eth")
      )}\n`
    );

    const tx2 = await contractWETH.transfer(
      "vitalik.eth",
      ethers.parseEther("0.001")
    );
    await tx2.wait();

    const balacnceWETH_transfer = await contractWETH.balanceOf(address);
    console.log(
      `转账后WETH持仓: ${ethers.formatEther(balacnceWETH_transfer)}\n`
    );

    console.log(
      `转账后Vitalik WETH余额: ${ethers.formatEther(
        await contractWETH.balanceOf("vitalik.eth")
      )}\n`
    );
  } else {
    console.log("ETH不足，去水龙头领一些 Sepolia ETH");
    console.log(
      "1. Ethereum Sepolia Faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
    );
  }
};

main();
