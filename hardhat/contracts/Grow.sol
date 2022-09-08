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

    uint256 maticPrice;
    bytes32 public maticQueryId = 0x40aa71e5205fdc7bdb7d65f7ae41daca3820c5d3a8f62357a99eda3aa27244a3;


    constructor(
        address payable _tellor
        ) UsingTellor(_tellor)  {
        //initial Seed of the plant
        seedTime = block.timestamp;
        emit Reseeded(msg.sender, 0, 0);
        owner = msg.sender;
    }



    function setMaticPrice() external {
        // TIP: For best practices, use getDataBefore with a time buffer to allow time for a value to be disputed
        (bool _ifRetrieve, bytes memory _value, uint256 _timestampRetrieved) = getDataBefore(maticQueryId, block.timestamp - 10 minutes);
        require(_ifRetrieve, "Not able to retrieve price!"); 
        
        maticPrice = abi.decode(_value,(uint256));
        console.log("matic Price  - %d ", maticPrice);
    
    }

}
