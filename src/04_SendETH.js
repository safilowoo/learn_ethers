import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);

// 创建随机的Wallet对象
const wallet1 = ethers.Wallet.createRandom();
const wallet1WithProvider = wallet1.connect(provider);
const mnemonic = wallet1.mnemonic;

// 利用私钥和provider创建wallet对象
const privateKey = process.env.PRIVATE_KEY;
const wallet2 = new ethers.Wallet(privateKey, provider);

// 使用助记词创建wallet对象
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase);

const main = async () => {
  // 1. 获取钱包地址
  const address1 = wallet1.getAddress();
  const address2 = wallet2.getAddress();
  const address3 = wallet3.getAddress();

  console.log("1. 获取钱包地址");
  console.log(`钱包1地址: ${address1}`);
  console.log(`钱包2地址: ${address2}`);
  console.log(`钱包3地址: ${address3}`);
  console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);

  // 2. 获取助记词 从privete key 生成的钱包没有助记词
  console.log("\n2. 获取助记词");
  console.log(`钱包1助记词: ${wallet1.mnemonic.phrase}`);

  // 3. 获取私钥
  console.log("\n3. 获取私钥");
  console.log(`钱包1私钥: ${wallet1.privateKey}`);
  console.log(`钱包2私钥: ${wallet2.privateKey}`);

  // 4. 获取链上发送交易次数
  console.log("\n4. 获取链上发送交易次数");
  const txCount1 = await provider.getTransactionCount(wallet1WithProvider);
  const txCount2 = await provider.getTransactionCount(wallet2);
  console.log(`钱包1发送交易次数: ${txCount1}`);
  console.log(`钱包2发送交易次数: ${txCount2}`);

  // 5. 发送ETH
  console.log("\n5. 发送ETH");

  // i. 打印交易前余额
  console.log("I. 发送前余额");
  console.log(
    `钱包1: ${ethers.formatEther(
      await provider.getBalance(wallet1WithProvider)
    )} ETH`
  );
  console.log(
    `钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`
  );

  // 构造交易请求
  const tx = {
    to: address1,
    value: ethers.parseEther("0.001"),
  };

  // II. 发送交易，获得收据
  console.log("\nII. 等待交易在区块链确认（需要几分钟）");
  const receipt = await wallet2.sendTransaction(tx);
  await receipt.wait(); // 等待链上确认交易
  console.log(receipt); // 打印交易详情

  // III. 打印交易后余额
  console.log("\nIII. 发送后余额");
  console.log(
    `钱包1: ${ethers.formatEther(
      await provider.getBalance(wallet1WithProvider)
    )} ETH`
  );
  console.log(
    `钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`
  );
};

main();
