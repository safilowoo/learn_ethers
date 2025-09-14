import "dotenv/config";
import { ethers } from "ethers";
import configs from "./configs.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);

const abiWETH = [
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
const contract = new ethers.Contract(
  configs.WETH_SEPOLIA_ADDRESS,
  abiWETH,
  provider
);

const main = async () => {
  console.log("\n1. 获取过去10个区块内的Transfer事件，并打印出1个");

  const block = await provider.getBlockNumber();
  console.log(`当前区块高度: ${block}`);

  console.log("打印事件详情");
  const transferEvents = await contract.queryFilter(
    "Transfer",
    block - 9,
    block
  );
  // 打印第一个Transfer事件
  console.log(transferEvents[0], 22222, transferEvents.length);

  // 解析Transfer事件的数据（变量在args中）
  console.log("\n2. 解析事件");
  const amount = ethers.formatUnits(
    ethers.getBigInt(transferEvents[0].args["amount"]),
    "ether"
  );
  console.log(
    `地址${transferEvents[0].args["from"]} 转账 ${amount} WETH 到地址 ${transferEvents[0].args["to"]}`
  );
};

main();
