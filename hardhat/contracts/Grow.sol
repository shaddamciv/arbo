// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "usingtellor/contracts/UsingTellor.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISuperfluid, IInstantDistributionAgreementV1, IConstantFlowAgreementV1, StreamInDistributeOut, ISuperToken} from "./base/StreamInDistributeOut.sol";


// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Grow is UsingTellor {
    uint public wateringFee = 0.00001 ether;
    uint seedTime;
    uint totalWatered;
    uint totalGrowth;

    address public owner;

    event Reseeded(address seeder, uint amountWatered, uint totalGrowth);
    uint256 maticPrice;
    bytes32 public maticQueryId = 0x40aa71e5205fdc7bdb7d65f7ae41daca3820c5d3a8f62357a99eda3aa27244a3;


    constructor(
        address payable _tellor,
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        IInstantDistributionAgreementV1 ida,
        ISuperToken inToken,
        ISuperToken outToken,
        IUniswapV2Router02 router
        ) UsingTellor(_tellor) StreamInDistributeOut(host, cfa, ida, inToken, outToken)  {
        //initial Seed of the plant
        seedTime = block.timestamp;
        emit Reseeded(msg.sender, 0, 0);
        owner = msg.sender;

        _router = router;

        // approve router to transfer the underlying `inToken` on behalf of this contract
        IERC20(inToken.getUnderlyingToken()).approve(address(router), type(uint256).max);

        // approve `outToken` to upgrade the underlying `outToken` on behalf of this contract.
        IERC20(outToken.getUnderlyingToken()).approve(address(outToken), type(uint256).max);
    }

    function waterArbo() public payable {
        require(msg.value >= wateringFee);
        require(block.timestamp >= seedTime, "Dont over water!");
        seedTime = block.timestamp;
        totalWatered += msg.value;

        emit Reseeded(msg.sender, totalWatered, 0);
    }

    function setMaticPrice() external {
        // TIP: For best practices, use getDataBefore with a time buffer to allow time for a value to be disputed
        (bool _ifRetrieve, bytes memory _value, uint256 _timestampRetrieved) = getDataBefore(maticQueryId, block.timestamp - 10 minutes);
        require(_ifRetrieve, "Not able to retrieve price!"); 
        
        maticPrice = abi.decode(_value,(uint256));
        console.log("matic Price  - %d ", maticPrice);
    
    }

    // ---------------------------------------------------------------------------------------------
    // BEFORE DISTRIBUTION CALLBACK

    /// @dev Before action callback. This swaps the `inToken` for the `outToken`, then returns the
    /// amount to distribute out in the `executeAction` function.
    /// @return distributionAmount amount to distribute after the callback.
    function _beforeDistribution() internal override returns (uint256 distributionAmount) {
        // Downgrade the full balance of the `_inToken`.
        _inToken.downgrade(_inToken.balanceOf(address(this)));

        
        // Get the full balance of the underlying `_outToken`.
        // Implicitly return the `upgrade`d amount by the end of the function.
        distributionAmount = IERC20(_inToken.balanceOf(address(this)));

        //Upgrade the full underlying `_outToken` balance.
        _outToken.upgrade(distributionAmount);
    }
}
