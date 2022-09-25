import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const ONE_GWEI = 1_000_000_000;

    // const lockedAmount = ONE_GWEI;
    // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Grow = await ethers.getContractFactory("Grow");
    // const grow = await Grow.deploy("0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A");
    const grow = await Grow.attach("0x18FBeB37FaBBaA67CA55a9bA10eB6D4ec0052105");

    return { grow, owner, otherAccount };
  }

  describe("Deployment", function () {
    //we used the frontend to generate query id and then pushed 333333 as a value to test
    xit("Should set the MaticPrice", async function () {
      const { grow } = await loadFixture(deployOneYearLockFixture);
      await grow.getRandomNumber();
      const randomNumber = await grow.nativeTokenPrice();
      console.log(randomNumber);
      expect(randomNumber).to.equal(333333);
    });
    //we used the frontend to generate query id and then pushed 333333 as a value to test
    it("Should request for a random number", async function () {
      const { grow } = await loadFixture(deployOneYearLockFixture);
      await grow.requestRandomNumber(1664097140);
      // const randomNumber = await grow.getRandomNumber();
      // console.log(randomNumber);
      // expect(randomNumber).to.equal(333333);
    });
  })
});
