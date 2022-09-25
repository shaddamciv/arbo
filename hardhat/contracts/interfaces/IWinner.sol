// SPDX-License-Identifier: MIT
interface IWinner {
  function setWinners(uint256 tokenId, uint8 latestFlowCap, address gardener,bool isStopped, uint8 currentGrowth, uint8 maxGrowth) external returns (bool, address);
  function initalizeIndex(uint32 tokenId) external returns(bool);
}