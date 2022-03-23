// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "./ChildERC20.sol";

// File: contracts/child/ChildToken/MaticWETH.sol
contract MaticWETH is ChildERC20 {
    constructor(address childChainManager) public ChildERC20("Wrapped Ether", "WETH", 18, childChainManager) {}
}
