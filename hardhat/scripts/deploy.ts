import { ethers, web3 } from "hardhat";
import { BigNumber, Framework } from "@superfluid-finance/sdk-core"
const provider = web3
async function main() {
  // const Grow = await ethers.getContractFactory("Grow");
  // const grow = await Grow.deploy("0x840c23e39f9d029ffa888f47069aa6864f0401d7");
  // await grow.deployed();
  let grow;
  let winner;
  let sf = await Framework.create({
    chainId:80001,
      networkName: "custom",
      provider,
      dataMode: "WEB3_ONLY",
      resolverAddress: process.env.RESOLVER_ADDRESS, //this is how you get the resolver address
      protocolReleaseVersion: "test"
  })
  let daix = await sf.loadSuperToken("fDAIx")


  const Tree = await ethers.getContractFactory("Tree");
  const tree = await Tree.deploy(
    "Grow ARBO",
    "ARBO",
    "0xEB796bdb90fFA0f28255275e16936D25d3418603",
    "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
)
  // console.log(`grow  deployed to ${grow.address}`);
  // console.log("npx hardhat verify --network mumbai", grow.address);
  console.log(`tree deployed to ${tree.address}`);
  console.log("npx hardhat verify --network mumbai", tree.address, '\"'+"Grow ARBO"+'\"', '\"'+"ARBO"+'\"', "0xEB796bdb90fFA0f28255275e16936D25d3418603",
  "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f");


  const Grow = await ethers.getContractFactory("Grow");
  const Grow_OP = await ethers.getContractFactory("GrowOptimistic");
  if(process.env.NETWORK !== "OP") {
      grow = await Grow.deploy("0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A", 
      "0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A",
      "0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A",
      1000);
  }
  else{
      console.log("Deploying to optimism")
      grow = await Grow_OP.deploy();
      
  }
  console.log("The Grow address is - ", grow.address)

  const Winner = await ethers.getContractFactory("Winner");
  winner = await Winner.deploy( grow.address,
      sf.settings.config.hostAddress, // Getting the Goerli Host contract address from the Framework object
  daix.address);
  console.log("The winner address is - ", winner.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
