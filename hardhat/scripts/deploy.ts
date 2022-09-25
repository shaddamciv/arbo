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
    chainId:10,
      provider
  })
  // let sf = await Framework.create({
  //   chainId:420,
  //     networkName: "custom",
  //     provider,
  //     dataMode: "WEB3_ONLY",
  //     resolverAddress: process.env.RESOLVER_ADDRESS, //this is how you get the resolver address
  //     protocolReleaseVersion: "test"
  // })
  let daix;
  


  // const Grow = await ethers.getContractFactory("Grow");
  // const Grow_OP = await ethers.getContractFactory("GrowOptimistic");
  // if(process.env.NETWORK !== "OP") {
  //     daix = await sf.loadSuperToken("fDAIx")
  //     grow = await Grow.deploy(
  //       "0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A", 
  //       "0x7B49420008BcA14782F2700547764AdAdD54F813",
  //       "0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE",
  //       30);
  //       console.log("npx hardhat verify --network optimism", grow.address, 
  //       "0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A", 
  //       "0x7B49420008BcA14782F2700547764AdAdD54F813",
  //       "0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE",
  //       30);
  // }
  // else{
  //     console.log("Deploying to optimism")
  //     grow = await Grow_OP.deploy();
  //     daix = await sf.loadSuperToken("DAIx")
  // }
  // console.log("The Grow address is - ", grow.address)
  // console.log("The daix address is - ", daix.address)

   const Winner = await ethers.getContractFactory("Winner");
   winner = await Winner.attach("0xe97A434341f839079d15543008F98Aad016d5d64");
  // winner = await Winner.deploy( grow.address,
  //                               sf.settings.config.hostAddress, // Getting the Goerli Host contract address from the Framework object
  //                               daix.address);
  // console.log("The winner address is - ", winner.address);
  // console.log("npx hardhat verify --network optimism", winner.address,
  //                                                   grow.address,
  //                                                   sf.settings.config.hostAddress, // Getting the Goerli Host contract address from the Framework object
  //                                                   daix.address);

  const Tree = await ethers.getContractFactory("TreeOP");
  const tree = await Tree.deploy(
    // "Grow ARBO",
    // "ARBO",
    // "0xEB796bdb90fFA0f28255275e16936D25d3418603",
    // "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
    "Grow ARBO",
    "ARBO",
    // sf.settings.config.hostAddress,
    // daix.address,
    // winner.address
    // "0x7d342726B69C28D942ad8BfE6Ac81b972349d524",
    "0xe97A434341f839079d15543008F98Aad016d5d64"
  )
  // console.log(`grow  deployed to ${grow.address}`);
  // console.log("npx hardhat verify --network optimism", grow.address);
  console.log(`tree deployed to ${tree.address}`);
  console.log("npx hardhat verify --network optimism", tree.address, '\"'+"Grow ARBO"+'\"', '\"'+"ARBO"+'\"',                                                                
                                                                  // sf.settings.config.hostAddress,
                                                                  // "0x7d342726B69C28D942ad8BfE6Ac81b972349d524",
                                                                  "0xe97A434341f839079d15543008F98Aad016d5d64"
                                                                  // daix.address,
                                                                  // winner.address
                                                                  );



  await winner.setTree(tree.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
