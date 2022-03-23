// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

// File: contracts/common/Initializable.sol
contract Initializable {
    bool inited = false;

    modifier initializer() {
        require(!inited, "already inited");
        _;
        inited = true;
    }
}
