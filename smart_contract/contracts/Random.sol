// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Random {
    uint8 public rand_number;

    function Generate_Number() public returns (uint8) {
        bytes32 hash = blockhash(block.number);
        uint256 randomnumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, hash, msg.sender))
        );
        rand_number = uint8((randomnumber % 20) + 1);
        return rand_number;
    }
}
