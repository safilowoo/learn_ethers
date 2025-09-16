import { ethers } from "ethers";

const oneWei = ethers.getBigInt("1000000000");
console.log(ethers.getBigInt("0x3b9aca00"));
console.log(ethers.getBigInt(1000000000));
console.log(oneWei === ethers.getBigInt("0x3b9aca00"));

console.log(ethers.formatUnits(oneWei, 9));
console.log(
  typeof ethers.formatUnits(oneWei, 0),
  typeof ethers.formatEther(oneWei)
);

const formatNumber18 = ethers.formatUnits(oneWei, 18);
const formatEtherString = ethers.formatUnits(oneWei, "ether");
const formatEther = ethers.formatEther(oneWei);
console.log(formatNumber18);
console.log(
  formatNumber18 === formatEtherString,
  formatNumber18 === formatEther
);

console.log("\n ----- parseUnits ------");

const parseResult = ethers.parseUnits("1.0");
console.log(parseResult, typeof parseResult, parseResult.toString());
console.log(ethers.parseUnits("1.0") === ethers.parseEther("1.0"));
console.log(ethers.parseUnits("1.0") === ethers.parseUnits("1.0", 18));
console.log(ethers.parseUnits("1.0", 9) === ethers.parseUnits("1.0", "gwei"));
