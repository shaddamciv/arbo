// SPDX-License-Identifier: MIT
interface IWinner {
  function setWinners(uint8 latestFlowCap, address gardener,bool isStopped, uint8 currentGrowth, uint8 maxGrowth) external returns (bool, address);
}