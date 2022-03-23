// SPDX-License-Identifier: MIT
pragma solidity 0.6.0;

import "./DiverseERC20.sol";

contract DummyTokenA is DiverseERC20 {
    constructor() DiverseERC20("DummyTokenA", "TKNA") public {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
