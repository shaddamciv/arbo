// SPDX-License-Identifier: MIT
interface ITree {
      struct TreeMeta {
        uint8 currentGrowth; //no need to grow more than 256
        uint8 maxGrowth; // the max that this tree can grow to
        uint8 isWon;
        uint256 amountWon;// a random multiplier based on price of native token
    }
}