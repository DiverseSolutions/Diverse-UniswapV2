// SPDX-License-Identifier: MIT
pragma solidity 0.6.0;

import "./DiverseERC20.sol";

contract DummyTokenB is DiverseERC20 {
    constructor() DiverseERC20("DummyTokenB", "TKNB") public {
      _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
