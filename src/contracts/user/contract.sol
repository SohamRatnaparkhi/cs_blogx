// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAuth {
    struct User {
        string username;
        string password;
        address ethAddress;
    }

    address public owner;

    mapping(address => User) public users;
    address[] public userAddresses; // New array to store user addresses

    event UserRegistered(address indexed userAddress, string username);
    event UsernameUpdated(
        address indexed userAddress,
        string oldUsername,
        string newUsername
    );
    event LoginAttempt(address indexed userAddress, bool success);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    function register(string memory _username, string memory _password) public {
        require(
            bytes(users[msg.sender].username).length == 0,
            "User already registered"
        );
        users[msg.sender] = User(_username, _password, msg.sender);
        userAddresses.push(msg.sender); // Add user address to the array
        emit UserRegistered(msg.sender, _username);
    }

    function updateUsername(string memory _newUsername) public {
        require(bytes(_newUsername).length > 0, "New username cannot be empty");
        require(
            bytes(users[msg.sender].username).length > 0,
            "User is not registered"
        );
        string memory oldUsername = users[msg.sender].username;
        users[msg.sender].username = _newUsername;
        emit UsernameUpdated(msg.sender, oldUsername, _newUsername);
    }

    function login(
        string memory _username,
        string memory _password
    ) public returns (bool) {
        bool success = keccak256(
            abi.encodePacked(users[msg.sender].username)
        ) ==
            keccak256(abi.encodePacked(_username)) &&
            keccak256(abi.encodePacked(users[msg.sender].password)) ==
            keccak256(abi.encodePacked(_password));
        emit LoginAttempt(msg.sender, success);
        return success;
    }

    function isRegistered(address _userAddress) public view returns (bool) {
        return bytes(users[_userAddress].username).length > 0;
    }

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory userList = new User[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            userList[i] = users[userAddresses[i]];
        }
        return userList;
    }
}
