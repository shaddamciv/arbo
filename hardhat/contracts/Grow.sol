// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "usingtellor/contracts/UsingTellor.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


// Uncomment this line to use console.log
import "hardhat/console.sol";
interface IAutopay {
    /**
     * @dev Function to run a single tip
     * @param _queryId ID of tipped data
     * @param _amount amount to tip
     * @param _queryData the data used by reporters to fulfill the query
     */
    function tip(
        bytes32 _queryId,
        uint256 _amount,
        bytes calldata _queryData
    ) external;
}
contract Grow is UsingTellor {
    uint public wateringFee = 0.00001 ether;
    uint seedTime;
    uint totalWatered;
    uint totalGrowth;

    address public owner;
    bytes32 public queryId;

    uint256 public nativeTokenPrice;
    IAutopay public autopay;
    IERC20 public tellorToken;
    uint256 public tipAmount;


    constructor(address payable _tellor, 
                address _autopay, 
                address _tellorToken, 
                uint256 _tipAmount) 
                UsingTellor(_tellor) {
        autopay = IAutopay(_autopay);
        tellorToken = IERC20(_tellorToken);
        tipAmount = _tipAmount;
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

    /**
    * @dev Request a random number by sending a tip
    * @param _timestamp input to TellorRNG query type
    */
    function requestRandomNumber(uint256 _timestamp) public {
        bytes memory _queryData = abi.encode("TellorRNG", abi.encode(_timestamp));
        bytes32 _queryId = keccak256(_queryData);
        tellorToken.approve(address(autopay), tipAmount);
        autopay.tip(_queryId, tipAmount, _queryData);
    }

    /**
    * @dev Retrieve a random number from tellor oracle
    * @param _timestamp input to TellorRNG query type
    * @return uint256 random number reported to tellor oracle
    */
    function retrieveRandomNumber(uint256 _timestamp) public view returns(uint256) {
        bytes memory _queryData = abi.encode("TellorRNG", abi.encode(_timestamp));
        bytes32 _queryId = keccak256(_queryData);
        bytes memory _randomNumberBytes;
        (, _randomNumberBytes, ) = getDataBefore(_queryId, block.timestamp - 10 minutes);
        uint256 _randomNumber = abi.decode(_randomNumberBytes, (uint256));
        return _randomNumber;
    }

}
