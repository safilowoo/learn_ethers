import { ethers } from "ethers";

console.log("\n1. 创建HD钱包");
const randomBytes32 = ethers.randomBytes(32);
const mnemonic = ethers.Mnemonic.entropyToPhrase(randomBytes32);

console.log(randomBytes32, mnemonic);

const basePath = "44'/60'/0'/0'";
const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);
console.log(baseWallet);

console.log("\n2. 通过HD钱包派生20个钱包");
const numWallet = 20;
let wallets = [];
for (let i = 0; i < numWallet; i++) {
  let baseWalletNew = baseWallet.derivePath(i.toString());
  console.log(`第${i + 1}个钱包地址: ${baseWalletNew.address}`);
  wallets.push(baseWalletNew);
}

console.log("\n3. 保存钱包");
const wallet = ethers.Wallet.fromPhrase(mnemonic);
console.log("通过助记词创建钱包:");
console.log(wallet);

// 加密json用的密码
const pwd = "your_password";
const json = await wallet.encrypt(pwd);
console.log("钱包的加密json:");
console.log(json);

console.log("\n4. 从加密json读取钱包");
const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
console.log(wallet2);

console.log(
  "从加密json读取的钱包是否为同一个: ",
  wallet.address === wallet2.address
);
