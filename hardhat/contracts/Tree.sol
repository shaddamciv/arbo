// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {RedirectAll, ISuperToken, ISuperfluid} from "./base/RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/// @title Tree NFT, derived from tradeable cashflow as a starter
/// @notice Inherits the ERC721 NFT interface from Open Zeppelin and the RedirectAll logic to
/// redirect all incoming streams to the current NFT holder.
/// Before each tree is grown fully, the NFT belongs to a factory contract
/// Once the tree has grown, the ownership can be transferred to the account 
/// that had the largest flow rate when the tree was fully grown
contract Tree is ERC721, Ownable, RedirectAll {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Watered(address seeder, uint amountWatered, uint totalGrowth);

    struct TreeMeta{
        uint8 currentGrowth; //no need to grow more than 256
        uint8 maxGrowth; // the max that this tree can grow to
        address ownerOfTree;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        ISuperfluid host,
        ISuperToken acceptedToken
    ) ERC721(_name, _symbol) RedirectAll(host, acceptedToken) {
        _mint(address(this), _tokenIdCounter.current());//Mint the first tree to self
        emit Watered(address(this), 0, 0);
    }

    function plantATree() onlyOwner external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment(); 
        _mint(address(this), tokenId);
    }

    function waterArbo() public payable {
        require(msg.value >= wateringFee);
        require(block.timestamp >= seedTime, "Dont over water!");
        seedTime = block.timestamp;
        totalWatered += msg.value;

        emit Reseeded(msg.sender, totalWatered, 0);
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
        // add code here to collect fees from the 
        _changeReceiver(to);
    }


}