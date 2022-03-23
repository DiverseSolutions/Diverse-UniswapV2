// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

// File: contracts/child/ChildToken/IChildToken.sol
interface IChildToken {
    function deposit(address user, bytes calldata depositData) external;
}
