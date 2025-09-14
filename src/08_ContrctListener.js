import "dotenv/config";
import { ethers } from "ethers";
import configs from "./configs.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);
const addressUSDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const abiUSDT = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];
const contractUSDT = new ethers.Contract(addressUSDT, abiUSDT, provider);

const main = async () => {
  try {
    console.log("\n1. 利用contract.once()，监听一次Transfer事件");
    contractUSDT.once("Transfer", (from, to, value) => {
      console.log(
        `contract.once(): ${from} -> ${to} ${ethers.formatUnits(
          ethers.getBigInt(value),
          6
        )}`
      );
    });

    console.log("\n2. 利用contract.on()，持续监听Transfer事件");
    contractUSDT.on("Transfer", (from, to, value) => {
      console.log(
        `contract.on(): ${from} -> ${to} ${ethers.formatUnits(
          ethers.getBigInt(value),
          6
        )}`
      );
    });
  } catch (e) {
    console.log(e);
  }
};

main();
