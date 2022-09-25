/* eslint-disable no-undef */

import { BigNumber, Framework } from "@superfluid-finance/sdk-core"

import { assert } from "chai";
import { ethers, web3 } from "hardhat";

const  deployFramework =require(  "@superfluid-finance/ethereum-contracts/scripts/deploy-framework")
const   deployTestToken =require(   "@superfluid-finance/ethereum-contracts/scripts/deploy-test-token")
const   deploySuperToken =require(   "@superfluid-finance/ethereum-contracts/scripts/deploy-super-token")

// This is only used in the set up, and these are the only functions called in this script.
const daiABI = [
    "function mint(address to,uint256 amount) returns (bool)",
    "function approve(address,uint256) returns (bool)",
    "function balanceOf(address) returns (uint)"
]

const provider = web3

let accounts

let sf
let dai
let daix
let superSigner
let Tree
let winner
let grow

const errorHandler = err => {
    if (err) throw err
}


before(async function () {
    //get accounts from hardhat
    accounts = await ethers.getSigners()

    //deploy the framework
    await deployFramework(errorHandler, {
        web3,
        from: accounts[0].address
    })

    //deploy a fake erc20 token
    await deployTestToken(errorHandler, [":", "fDAI"], {
        web3,
        from: accounts[0].address
    })

    //deploy a fake erc20 wrapper super token around the fDAI token
    await deploySuperToken(errorHandler, [":", "fDAI"], {
        web3,
        from: accounts[0].address
    })

    //initialize the superfluid framework...put custom and web3 only bc we are using hardhat locally
    sf = await Framework.create({
      chainId:31337,
        networkName: "custom",
        provider,
        dataMode: "WEB3_ONLY",
        resolverAddress: process.env.RESOLVER_ADDRESS, //this is how you get the resolver address
        protocolReleaseVersion: "test"
    })

    superSigner = sf.createSigner({
        signer: accounts[0],
        provider: provider
    })

    //use the framework to get the super toen
    daix = await sf.loadSuperToken("fDAIx")

    //get the contract object for the erc20 token
    let daiAddress = daix.underlyingToken.address
    dai = new ethers.Contract(daiAddress, daiABI, accounts[0])
    let App = await ethers.getContractFactory("Tree", accounts[0])

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
    Tree = await App.deploy(
        "Grow ARBO",
        "ARBO",
        sf.settings.config.hostAddress,
        daix.address,
        winner.address
    )
        
    await winner.setTree(Tree.address);

})

beforeEach(async function () {
    await dai
        .connect(accounts[0])
        .mint(accounts[0].address, ethers.utils.parseEther("1011"))

    await dai
        .connect(accounts[0])
        .approve(daix.address, ethers.utils.parseEther("1000"))

    const daixUpgradeOperation = daix.upgrade({
        amount: ethers.utils.parseEther("1000")
    })

    await daixUpgradeOperation.exec(accounts[0])
    //give Bob some as well
    await dai
    .connect(accounts[0])
    .mint(accounts[1].address, ethers.utils.parseEther("1000"))

    await dai
        .connect(accounts[1])
        .approve(daix.address, ethers.utils.parseEther("1000"))

    const daixUpgradeOperationBob = daix.upgrade({
        amount: ethers.utils.parseEther("1000")
    })

    await daixUpgradeOperationBob.exec(accounts[1])

    const daiBal = await daix.balanceOf({
        account: accounts[0].address,
        providerOrSigner: accounts[0]
    })
    console.log("daix bal for acct 0: ", daiBal)

    await daix.transfer(accounts[0].address,winner.address, ethers.utils.parseEther("10"))
})

describe("watering plants", async function () {
    it("Case #1 - Alice waters arbo", async () => {
        console.log("Tree address - ",Tree.address, "Alice's Address is - ", accounts[0].address)

        const initialTreeData = await Tree.trees(ethers.BigNumber.from("0"))

        const createFlowOperation = sf.cfaV1.createFlow({
            receiver: Tree.address,
            superToken: daix.address,
            flowRate: "1000"
        })

        const txn = await createFlowOperation.exec(accounts[0])
        console.log(initialTreeData[0], ethers.BigNumber.from("0"))

        await txn.wait()

        const afterFlowTreeData = await Tree.trees(ethers.BigNumber.from("0"))

        assert.equal(
            initialTreeData[0].toString(),
            "0",
            "it did not start as a seed"
        )

        assert.closeTo(parseInt(afterFlowTreeData[0].toString()), 10, 10, "Tree has not grown by a correct amount")
    })
    it("Case #2 - Bob waters arbo", async () => {
        console.log("Tree address - ",Tree.address, "Bobs's Address is - ", accounts[1].address)

        const initialTreeData = await Tree.trees(ethers.BigNumber.from("0"))

        const createFlowOperation = sf.cfaV1.createFlow({
            receiver: Tree.address,
            superToken: daix.address,
            flowRate: "1000"
        })

        const txn = await createFlowOperation.exec(accounts[1])

        await txn.wait()

        const afterFlowTreeData = await Tree.trees(ethers.BigNumber.from("0"))

        assert.closeTo(parseInt(afterFlowTreeData[0].toString()), 10, 20, "Tree has not grown by a correct amount")
    })
    //Assumption is the initial tree was planted with max Growth of 35
    it("Case #3 - Alice can win the arbo", async () => {
        console.log("Tree address - ",Tree.address, "Alice's Address is - ", accounts[0].address)
        console.log("Stopping Bob!!")
        const stopFlowOperation3 = sf.cfaV1.deleteFlow({
            sender: accounts[1].address,
            receiver: Tree.address,
            superToken: daix.address
        })

        const stopFlowOperation3Txn = await stopFlowOperation3.exec(
            accounts[1]
        )

        await stopFlowOperation3Txn.wait()
        const initialTreeData = await Tree.trees(ethers.BigNumber.from("0"))

        const createFlowOperation = sf.cfaV1.updateFlow({
            receiver: Tree.address,
            superToken: daix.address,
            flowRate: "100000000"
        })

        const txn = await createFlowOperation.exec(accounts[0])

        await txn.wait()

        const afterFlowTreeData = await Tree.trees(ethers.BigNumber.from("0"))
        console.log("The afterFlowTreeData in bal - ", afterFlowTreeData[3].toString())
        const stopFlowOperation2 = sf.cfaV1.deleteFlow({
            sender: accounts[0].address,
            receiver: Tree.address,
            superToken: daix.address
        })

        const stopFlowOperation2Txn = await stopFlowOperation2.exec(
            accounts[0]
        )

        await stopFlowOperation2Txn.wait()
        assert.equal(afterFlowTreeData[2].toString(), "1", "Tree was not won")
    })
    it("Case #4 - Alice can win and withdraw", async () => {
        const account0BalanceInit = await daix.balanceOf({
            account: accounts[0].address,
            providerOrSigner: accounts[0]
        })
        const initialTreeTransfer = await Tree.transferFrom(Tree.address, accounts[0].address, ethers.BigNumber.from("0"))
        await initialTreeTransfer.wait();

        const initialTreeBalance = await Tree.balanceOf(accounts[0].address)
        assert.equal(initialTreeBalance.toString(), 1, "Alice does not own the tree")

        const withdraw = await Tree.withdrawFunds(ethers.BigNumber.from("0"));
        await withdraw.wait()

        const account0Balance = await daix.balanceOf({
            account: accounts[0].address,
            providerOrSigner: accounts[0]
        })
        const diffBal = ethers.BigNumber.from(account0Balance).sub(ethers.BigNumber.from(account0BalanceInit));
        console.log("The difference in bal - ",account0Balance,account0BalanceInit, diffBal)
        // alice has made some money
        assert.isAtLeast(diffBal.toNumber(), 1000, "Alice did not manage to withdraw funds")

    })

    //need deletion case
})
