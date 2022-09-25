// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {RedirectAll, ISuperToken, ISuperfluid} from "./base/RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IWinner.sol";
import "./interfaces/ITree.sol";


/// @title Tree NFT, derived from tradeable cashflow as a starter
/// @notice Inherits the ERC721 NFT interface from Open Zeppelin and the RedirectAll logic to
/// redirect all incoming streams to the current NFT holder.
/// Before each tree is grown fully, the NFT belongs to a factory contract
/// Once the tree has grown, the ownership can be transferred to the account
/// that had the largest flow rate when the tree was fully grown
contract Tree is ERC721, ERC721Holder, Ownable, RedirectAll {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Watered(
        address gardener,
        uint256 tokenId,
        int96 amountWatered,
        uint256 totalGrowth,
        uint8 maxGrowth,
        int96 totalFlowRate
    );
    event Winner(address gardener, uint256 tokenId, uint256 amountWon);
    event WithdrawWinnings(uint256 tokenId, uint256 amountWon);

    mapping(uint256 => ITree.TreeMeta) public trees;
    uint256 public prevBalance;
    address public winnerContractAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        ISuperfluid host,
        ISuperToken acceptedToken,
        address _winnerContractAddress
    ) ERC721(_name, _symbol) RedirectAll(host, acceptedToken) {
        winnerContractAddress = _winnerContractAddress;
        plantATree(35);
    }

    function plantATree(uint8 maxGrowth) public onlyOwner {
        // require(balanceOf(address(this)) == 0,"A tree still needs to grow");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(address(this), tokenId);
        emit Watered(address(this), tokenId, 0, 0, maxGrowth, 0);
        trees[tokenId].maxGrowth = maxGrowth;
        IWinner(winnerContractAddress).initalizeIndex(uint32(tokenId));
    }

    function withdrawFunds(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not ARBO gardener!"); // make sure that its the winner
        ITree.TreeMeta storage myTree = trees[tokenId];
        // (bool success, bytes memory result) = address(_acceptedToken).delegatecall(abi.encodeWithSignature("transfer(address,uint256)", msg.sender, myTree.amountWon));
        // require(success, "Unable to transfer");
        ISuperToken(_acceptedToken).transfer(msg.sender, myTree.amountWon);
        emit WithdrawWinnings(tokenId, myTree.amountWon);
    }

    function _waterTree(
        int96 flowRate,
        int96 inNetFlowRate,
        address gardener,
        bool isStopped
    ) internal override {
        uint256 tokenId = _tokenIdCounter.current() - 1;
        ITree.TreeMeta storage myTree = trees[tokenId];

        require(myTree.isWon == 0, "This ARBO is already grown!");
        uint8 latestFlowCap = flowCap(flowRate);
        uint8 amountWateredInTotal = latestFlowCap * getBoost(); // a not so random boost to the growth of the tree
        myTree.currentGrowth =
            trees[tokenId].currentGrowth +
            amountWateredInTotal;
        emit Watered(
            gardener,
            tokenId,
            flowRate,
            myTree.currentGrowth,
            myTree.maxGrowth,
            inNetFlowRate
        );

        (bool isWon, address winningAddress) = IWinner(winnerContractAddress).setWinners(
            tokenId,
            latestFlowCap,
            gardener,
            isStopped,
            myTree.currentGrowth,
            myTree.maxGrowth
        );
        //set info if won
        if (isWon) {
            myTree.isWon = 1;
            uint256 currBalance = ISuperToken(_acceptedToken).balanceOf(
                address(this)
            );
            myTree.amountWon = currBalance - prevBalance;
            prevBalance = currBalance;

            emit Winner(
                winningAddress,
                _tokenIdCounter.current() - 1,
                myTree.amountWon
            );
            if (winningAddress != address(0)) {
                _approve(winningAddress, _tokenIdCounter.current() - 1);
            }
        }
    }

    //1 DAI - Small sprite - we will pay him a fee when the winner withdraws
    //list of small sprites will be in a  pool
    // if the same user tries to increase flow it has to be 10 times else revert
    function flowCap(int96 a) public pure returns (uint8) {
        uint8 growBy = 0;
        if (a > 10000000 && a <= 100000000) {
            growBy = 25;
        } else if (a > 1000000 && a <= 10000000) {
            growBy = 5; 
        } else if (a > 10000 && a <= 100000) {
            growBy = 3;
        } else if (a > 100 && a <= 1000) {
            growBy = 2;
        } else if(a > 0 ) {
            return 1;
        }
        return growBy;
    }

    function getBoost() public view returns (uint8) {
        return uint8(block.number % 10) + 1;
        //we can use tellor here as well
    }
}
