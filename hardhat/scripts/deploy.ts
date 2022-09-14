import { ethers, web3 } from "hardhat";
import { BigNumber, Framework } from "@superfluid-finance/sdk-core"
const provider = web3
async function main() {
  // const Grow = await ethers.getContractFactory("Grow");
  // const grow = await Grow.deploy("0x840c23e39f9d029ffa888f47069aa6864f0401d7");
  // await grow.deployed();



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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
