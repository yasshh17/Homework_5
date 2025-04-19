// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // Add more functions if needed
}
