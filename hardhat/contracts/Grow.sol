// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "usingtellor/contracts/UsingTellor.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Grow is UsingTellor {
    uint public wateringFee = 0.00001 ether;
    uint seedTime;
    uint totalWatered;
    uint totalGrowth;

    address public owner;
    bytes32 public queryId;

    uint256 public nativeTokenPrice;


    constructor(
        address payable _tellor
        ) UsingTellor(_tellor)  {
        owner = msg.sender;
        if(block.chainid == 80001 || block.chainid == 31337){
            //polygon
            queryId = 0x40aa71e5205fdc7bdb7d65f7ae41daca3820c5d3a8f62357a99eda3aa27244a3;
        }
        else{
            //optimism
            queryId = 0x40aa71e5205fdc7bdb7d65f7ae41daca3820c5d3a8f62357a99eda3aa27244a3;
        }
    }


    //use the native token price as a random number to decide who wins
    function getRandomNumber() public returns(uint256) {
        // TIP: For best practices, use getDataBefore with a time buffer to allow time for a value to be disputed
        (bool _ifRetrieve, bytes memory _value,) = getDataBefore(queryId, block.timestamp - 10 minutes);
        require(_ifRetrieve, "Not able to retrieve price!"); 
        
        nativeTokenPrice = abi.decode(_value,(uint256));
        console.log("The nativeTokenPrice is %s",nativeTokenPrice);

        return nativeTokenPrice;
    }

}
