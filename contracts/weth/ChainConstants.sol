// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

// File: contracts/ChainConstants.sol
contract ChainConstants {
    string constant public ERC712_VERSION = "1";

    uint256 constant public ROOT_CHAIN_ID = 1;
    bytes constant public ROOT_CHAIN_ID_BYTES = hex"01";

    uint256 constant public CHILD_CHAIN_ID = 137;
    bytes constant public CHILD_CHAIN_ID_BYTES = hex"89";
}
