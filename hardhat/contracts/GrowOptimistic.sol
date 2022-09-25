// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "hardhat/console.sol";

/**In case the oracle does not exist on a chain make use of a psuedo random generator */
contract GrowOptimistic {
    uint256 public nativeTokenPrice;

    //Not very random
    function getRandomNumber() public returns(uint256) {
        uint random = uint(keccak256(abi.encodePacked(block.timestamp))) % 100;

        return random;
    }

}
