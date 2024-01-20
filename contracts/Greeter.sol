// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./ERC721A.sol";
import "./Ownable.sol";

contract Greeter is Ownable, ERC721A {
    uint256 public constant MAX_SUPPLY = 100;
    uint256 public constant MAX_SUPPLY_PER_USER = 5;
    uint256 public constant PRICE_PER_TOKEN = 0.000001 ether;
    uint256 public immutable START_TIME;
    bool public mintPaused;
    string private _baseTokenURI;

    constructor() Ownable(msg.sender) ERC721A("Greeter", "721AT") {
        START_TIME = block.timestamp;
        mintPaused = false;
    }

    function mint(uint256 quantity) external payable {
        require(!mintPaused, "Mint is paused");
        require(block.timestamp >= START_TIME, "Sale not started");
        require(_totalMinted() + quantity <= MAX_SUPPLY, "Max Supply Hit");
        // require(
        //     _numberMinted(msg.sender) + quantity <= MAX_SUPPLY_PER_USER,
        //     "Max Mint per user Reached"
        // );
        require(msg.value >= quantity * PRICE_PER_TOKEN, "Insufficient Funds");
        _safeMint(msg.sender, quantity);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        // Address.sendValue(payable(msg.sender), balance);
        payable(msg.sender).transfer(balance);

        // (bool success, ) = msg.sender.call{value: address(this).balance}("");
        // require(success, "Transfer Failed");
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/QmPq58FTVaZukiB6q8SXz1cMiMEEPaBswuykTNkfhWuDNz/";
    }

    function pauseMint(bool _paused) external onlyOwner {
        require(!mintPaused, "Contract paused.");
        mintPaused = _paused;
    }
}
