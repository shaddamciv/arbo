// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {RedirectAll, ISuperToken, ISuperfluid} from "./base/RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Tree NFT, derived from tradeable cashflow as a starter
/// @notice Inherits the ERC721 NFT interface from Open Zeppelin and the RedirectAll logic to
/// redirect all incoming streams to the current NFT holder.
/// Before each tree is grown fully, the NFT belongs to a factory contract
/// Once the tree has grown, the ownership can be transferred to the account
/// that had the largest flow rate when the tree was fully grown
contract Tree is ERC721, ERC721Holder, Ownable, RedirectAll {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Watered(address seeder, uint256 tokenId, uint256 amountWatered, uint256 totalGrowth);

    struct TreeMeta {
        uint256 currentGrowth; //no need to grow more than 256
        uint8 maxGrowth; // the max that this tree can grow to
        address ownerOfTree;
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
        trees[tokenId].ownerOfTree = gardener;
    }
    
    function waterTree(int flowRate) internal {
        uint256 tokenId = _tokenIdCounter.current();
        trees[tokenId].currentGrowth = trees[tokenId].currentGrowth + uint(flowRate);
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

    function _updateTreeStatus(int96 inFlowRate)
        internal
        override
    {
        waterTree(inFlowRate);
    }
    
    function getTreeInfo(uint tokenId) public returns(TreeMeta memory treeInfo) {
        TreeMeta memory myTree = trees[tokenId];
        return myTree;
    }
}
