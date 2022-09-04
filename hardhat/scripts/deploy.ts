import { ethers } from "hardhat";

async function main() {
  const Grow = await ethers.getContractFactory("Grow");
  const grow = await Grow.deploy("0x840c23e39f9d029ffa888f47069aa6864f0401d7");

  await grow.deployed();

  console.log(`grow  deployed to ${grow.address}`);
  console.log("npx hardhat verify --network mumbai", grow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
