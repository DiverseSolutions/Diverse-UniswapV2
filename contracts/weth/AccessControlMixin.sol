// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "./AccessControl.sol";

// File: contracts/common/AccessControlMixin.sol
contract AccessControlMixin is AccessControl {
    string private _revertMsg;
    function _setupContractId(string memory contractId) internal {
        _revertMsg = string(abi.encodePacked(contractId, ": INSUFFICIENT_PERMISSIONS"));
    }

    modifier only(bytes32 role) {
        require(
            hasRole(role, _msgSender()),
            _revertMsg
        );
        _;
    }
}
