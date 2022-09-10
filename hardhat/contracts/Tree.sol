// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {RedirectAll, ISuperToken, ISuperfluid} from "./base/RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

/// @title Tree NFT, derived from tradeable cashflow as a starter
/// @notice Inherits the ERC721 NFT interface from Open Zeppelin and the RedirectAll logic to
/// redirect all incoming streams to the current NFT holder.
/// Before each tree is grown fully, the NFT belongs to a factory contract
/// Once the tree has grown, the ownership can be transferred to the account
/// that had the largest flow rate when the tree was fully grown
contract Tree is ERC721, ERC721Holder, Ownable, RedirectAll {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Watered(address gardener, uint256 tokenId, uint256 amountWatered, uint256 totalGrowth);
    event Winner(address gardener, uint256 tokenId);

    struct TreeMeta {
        uint8 currentGrowth; //no need to grow more than 256
        uint8 maxGrowth; // the max that this tree can grow to
        uint8 growthMultiplier;// a random multiplier based on price of native token
        uint8 isWon;
    }

    mapping(uint => TreeMeta) public trees;

    constructor(
        string memory _name,
        string memory _symbol,
        ISuperfluid host,
        ISuperToken acceptedToken
    ) ERC721(_name, _symbol) RedirectAll(host, acceptedToken) { 
        plantATree(); 
    }

    function plantATree() public onlyOwner {
        require(balanceOf(address(this)) == 0,"A tree still needs to grow");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(address(this), tokenId);
        emit Watered(address(this), tokenId, 0, 0);
        initTree(tokenId, 0,address(this));
    }

    function initTree(uint tokenId, uint8 maxGrowth, address gardener) private {
        trees[tokenId].currentGrowth = 0;
        trees[tokenId].maxGrowth = maxGrowth;
    }
    
    function waterTree(int96 flowRate, address gardener) internal {
        uint256 tokenId = _tokenIdCounter.current()-1;
        TreeMeta storage myTree = trees[tokenId];

        require(myTree.isWon == 0, "This ARBO is already grown!");

        uint8 amountWatered = flowCap(flowRate) * getMultiplierCapped();
        myTree.currentGrowth = trees[tokenId].currentGrowth + amountWatered;

        if(myTree.currentGrowth >= myTree.maxGrowth) {
            //this player has watered the tree above the required height
            approve(gardener, _tokenIdCounter.current()-1);
            myTree.isWon = 1;
            emit Winner(gardener, _tokenIdCounter.current()-1);
        }

        emit Watered(address(this), tokenId, amountWatered, myTree.currentGrowth);
    }

    // ---------------------------------------------------------------------------------------------
    // BEFORE TOKEN TRANSFER CALLBACK

    /// @dev Before transferring the NFT, set the token receiver to be the stream receiver as
    /// defined in `RedirectAll`.
    /// @param to New receiver.
    function _beforeTokenTransfer(
        address, // from
        address to,
        uint256 // tokenId
    ) internal override {
        // transfer the flow to the new owner
        if(to != address(this))
            _changeReceiver(to);
    }

    function _updateTreeStatus(int96 inFlowRate, address gardener)
        internal
        override
    {
        waterTree(inFlowRate, gardener);
    }
    
    function getTreeInfo(uint tokenId) public view returns(TreeMeta memory treeInfo) {
        TreeMeta memory myTree = trees[tokenId];
        return myTree;
    }

    //100 MATIC = 100 $
    //1 Matic - Small sprite - we will pay him a fee when the winner withdraws
    //list of small sprites will be in a  pool
    function flowCap(int96 a) public pure returns (uint8) {
        uint8 growBy = 0;
        if( a > 100) {  
            growBy = 1;
        } else if( a > 100 && a <= 1000 ){
            growBy = 2;
        } else if( a > 1000 && a <= 10000 ){
            growBy = 3;
        } else if( a > 10000 && a <= 100000 ){
            growBy = 5;
        } else if( a > 1000000 && a <= 1000000 ){
            growBy = 8;
        }
        return growBy;
    }

    function getMultiplierCap() public pure returns(uint8) {
       return uint8(block.number - (block.number%10));
    }
}
