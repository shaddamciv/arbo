// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./interfaces/IGrow.sol";
import "hardhat/console.sol";

contract Winner {
    address[] public winners;
    mapping(address => uint) public winnerStreamTimes;
    uint256 lastFlowCap;
    address public tellor;
    address public tree;
    constructor(address _tellor) {
        tellor = _tellor;
    }

    function setTree(address _tree) public {
        tree = _tree;
    }

    //setWinner should only be called by tree address
    function setWinners(
        uint8 latestFlowCap,
        address gardener,
        bool isStopped,
        uint8 currentGrowth,
        uint8 maxGrowth
    ) external returns (bool __isWon, address __winner) {
      require(msg.sender == tree);
        console.log("Inside setWinners", latestFlowCap);

        if (latestFlowCap > lastFlowCap) {
            //dilemma, remove existing winners and add new winner
            if (winners.length > 0) {
                delete winners;
            }
            winners.push(gardener);
        } else if (latestFlowCap == lastFlowCap) {
            winners.push(gardener);
        }
        lastFlowCap = latestFlowCap;
        if (currentGrowth >= maxGrowth) {
            //this player has watered the tree above the required height
            // _approve(gardener, _tokenIdCounter.current()-1);

            if (lastFlowCap == 1) {
                return (true, address(0));
            } else {
                //alas, a gardener has taken a tree from the forest
                //use tellor to get a random number and choose one of the winners
                //for now we just use winner 0
                uint256 randomNumber = IGrow(tellor).getRandomNumber() %
                    winners.length;
                console.log("The randomNumber is %s",randomNumber);
                address winner = winners[randomNumber];
                return (true, winner);
            }
        } else {
            return (false, address(0));
        }
    }
}
