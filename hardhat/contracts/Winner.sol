// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./interfaces/IGrow.sol";

import {ISuperfluid, ISuperToken, SuperAppBase, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

import "hardhat/console.sol";

contract Winner {
    struct gameMeta {
        uint256 timeStart;
        uint256 timeSpent;
    }
    address[] public winners;
    mapping(uint256 => mapping(address => gameMeta)) private winnerStreamTimes;

    mapping(uint256 => bool) initializedIndex;
    mapping(uint256 => uint256) totalTimeSpent;
    uint256 lastFlowCap;
    address public tellor;
    address public tree;
    /// @notice Super token to be distributed.
    ISuperToken public spreaderToken;

    /// @notice IDA Library
    using IDAv1Library for IDAv1Library.InitData;
    IDAv1Library.InitData public idaV1;

    constructor(address _tellor, ISuperfluid _host, ISuperToken _spreaderToken) {
        tellor = _tellor;
        spreaderToken = _spreaderToken;

        // IDA Library Initialize.
        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
                        )
                    )
                )
            )
        );
    }

    function initalizeIndex(uint32 tokenId) external returns(bool) {
        console.log("Initialize call attempted");
        if (initializedIndex[tokenId] == true) {
            return false;
        }
        initializedIndex[tokenId] = true;
        // idaV1.createIndex(spreaderToken, tokenId);
        return true;
    }

    function setTree(address _tree) public {
        tree = _tree;
    }

    // to be called after funding this contract from the Tree
    // for now this has to be manual
    function distribute(uint256 tokenId) public {
        //need to transfer from Tree contract
        uint256 spreaderTokenBalance = spreaderToken.balanceOf(address(this));

        (uint256 actualDistributionAmount, ) = idaV1.ida.calculateDistribution(
            spreaderToken,
            address(this),
            uint32(tokenId),
            spreaderTokenBalance
        );

        idaV1.distribute(spreaderToken, uint32(tokenId), actualDistributionAmount);
    }

    function setShares(uint256 tokenId) internal {
        //get the winners list and then calculate based on timeSpent
        for (uint256 i = 0; i < winners.length; i++) {
            uint256 share = totalTimeSpent[tokenId] /
                winnerStreamTimes[tokenId][winners[i]].timeSpent;

            // Update to current amount + 1
            idaV1.updateSubscriptionUnits(
                spreaderToken,
                uint32(tokenId),
                winners[i],
                uint128(share + 1)
            );
        }
    }

    //setWinner should only be called by tree address
    function setWinners(
        uint256 tokenID,
        uint8 latestFlowCap,
        address gardener,
        bool isStopped,
        uint8 currentGrowth,
        uint8 maxGrowth
    ) external returns (bool __isWon, address __winner) {
        console.log("Inside setWinners %s and tokenid is %s", latestFlowCap, tokenID%(2**32 -1));

        require(msg.sender == tree,"Not the tree");
        if (isStopped) {
            winnerStreamTimes[tokenID][gardener].timeSpent =
                block.timestamp -
                winnerStreamTimes[tokenID][gardener].timeStart;
        } else {
            winnerStreamTimes[tokenID][gardener].timeStart = block.timestamp;
            winnerStreamTimes[tokenID][gardener].timeSpent = 0;
            totalTimeSpent[tokenID] = block.timestamp;
        }
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
            //time to check winners
            if (lastFlowCap == 1) {
                totalTimeSpent[tokenID] =
                    block.timestamp -
                    totalTimeSpent[tokenID];
                //the gnomes have won vs the system
                setShares(tokenID);
                return (true, address(0));
            } else {
                //alas, a gardener has taken a tree from the forest
                //use tellor to get a random number and choose one of the winners
                //for now we just use winner 0
                uint256 randomNumber = IGrow(tellor).getRandomNumber() %
                    winners.length;
                console.log("The randomNumber is %s", randomNumber);
                address winner = winners[randomNumber];
                return (true, winner);
            }
        } else {
            return (false, address(0));
        }
    }
}
