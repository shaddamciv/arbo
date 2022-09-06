// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {RedirectAll, ISuperToken, ISuperfluid} from "./base/RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title Tree NFT, derived from tradeable cashflow as a starter
/// @notice Inherits the ERC721 NFT interface from Open Zeppelin and the RedirectAll logic to
/// redirect all incoming streams to the current NFT holder.
/// Before each tree is grown fully, the NFT belongs to a factory contract
/// Once the tree has grown, the ownership can be transferred to the account 
/// that had the largest flow rate till the tree was fully grown
contract Tree is ERC721, RedirectAll {
    constructor(
        address owner,
        string memory _name,
        string memory _symbol,
        ISuperfluid host,
        ISuperToken acceptedToken
    ) ERC721(_name, _symbol) RedirectAll(host, acceptedToken, owner) {
        _mint(owner, 1);
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
        _changeReceiver(to);
    }
}