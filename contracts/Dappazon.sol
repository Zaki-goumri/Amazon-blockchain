// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Dappazon {
    string public name;
    address public owner;

    event ProductAdded(string name, uint256 price, string category, uint stock);

    modifier onlyOwner() {
        require(msg.sender == owner,'Only the owner can do it');
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    struct product {
        uint id;
        string name;
        uint256 price;
        string category;
        string image;
        uint stock;
    }

    struct order {
        product item;
        uint256 quantityOfOrder;
        uint256 time;
    }

    mapping(uint256 => product) public products;
    uint256 public productCount = 0;

    mapping(address => uint256) public orderCounter;
    mapping(address => mapping(uint256 => order)) public orders;

    function addProduct(
        string memory _name,
        uint256 _price,
        string memory _category,
        string memory _image,
        uint _stock
    ) public onlyOwner {
        products[productCount] = product(
            productCount,
            _name,
            _price,
            _category,
            _image,
            _stock
        );
        productCount++;
        emit ProductAdded(_name, _price, _category, _stock);
    }

    function getProduct(uint _id) public view returns (product memory) {
        return products[_id];
    }

    function buyProduct(uint256 _id, uint _quantity) public payable {
        product memory selectedProduct = products[_id];
        require(products[_id].price > 0, "Product does not exist");
        require(_quantity <= selectedProduct.stock, " there no products ");

        require(
            msg.value >= selectedProduct.price * _quantity,
            "Not enough funds"
        );
        orders[msg.sender][orderCounter[msg.sender]] = order(
            selectedProduct,
            _quantity,
            block.timestamp
        );
        orderCounter[msg.sender]++;
        products[_id].stock -= _quantity;
    }

    function withdraw() public onlyOwner {
        (bool succes ,) = owner.call{value:address(this).balance}('');
        require(succes);
    }
}
