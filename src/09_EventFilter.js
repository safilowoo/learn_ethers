import "dotenv/config";
import { ethers } from "ethers";
import ADDRESS from "./address.js";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);
const accountBinance = ADDRESS.BINANCE_MAINNET_ADDRESS;
const abiUSDT = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
const contractUSDT = new ethers.Contract(
  ADDRESS.USDT_MAINNET_ADDRESS,
  abiUSDT,
  provider
);

const main = async () => {
  try {
    console.log("\n1. 读取币安热钱包USDT余额");
    const balanceUSDT = await contractUSDT.balanceOf(accountBinance);
    console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT, 6)}`);

    console.log("\n2. 创建过滤器，监听USDT转进交易所");
    let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
    console.log("【转入】过滤器详情:");
    console.log(filterBinanceIn);
    contractUSDT.on(filterBinanceIn, (res) => {
      console.log("---------监听USDT【转入】交易所---------");
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
      );
    });

    console.log("\n3. 创建过滤器，监听USDT转出交易所");
    let filterBinanceOut = contractUSDT.filters.Transfer(accountBinance);
    console.log("【转出】过滤器详情:");
    console.log(filterBinanceOut);
    contractUSDT.on(filterBinanceOut, (res) => {
      console.log("---------监听USDT【转出】交易所---------");
      console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
      );
    });
  } catch (e) {
    console.log(e);
  }
};

main();
