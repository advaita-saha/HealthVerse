// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract BlockHealth {

    string public aboutUs = "";
    address public owner;
    address[] public managers;
    
    mapping(address => address[]) patientList;
    mapping(address => string[]) medicalRecords;

    modifier restricted(){
        bool allowed = false;
        for(uint i; i < managers.length; i++){
            if(managers[i] == msg.sender){
                allowed = true;
                break;
            }
        }
        require(allowed || owner == msg.sender, "Only allowed managers or the owner can perform this operation");
        _;
    }

    modifier onlyDoctor(address patient){
        bool allowed = false;
        for(uint i; i < patientList[msg.sender].length; i++){
            if(patientList[msg.sender][i] == patient){
                allowed = true;
                break;
            }
        }
        require(allowed || owner == msg.sender, "You cannot access someone's private information");
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function addRecord(address patient, address doctor, string memory url) public restricted {
        bool isThere = false;
        for(uint i; i < patientList[doctor].length; i++){
            if(patientList[doctor][i] == patient){
                isThere = true;
                break;
            }
        }
        if(isThere == false){
            patientList[doctor].push(patient);
        }

        medicalRecords[patient].push(url);

    }

    function getPatients(address doctor) public view restricted returns(address[] memory){
        require(msg.sender == doctor, "You are not allowed to access personl information");
        return patientList[doctor];
    }

    function getRecords(address patient) public view onlyDoctor(patient) returns(string[] memory){
        return medicalRecords[patient];
    }

    function addManager(address newManager) public {
        require(msg.sender == owner, "Only the owner can add/remove managers");
        managers.push(newManager);
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Only the owner can transfer ownership of this contract");
        owner = newOwner;
    }


}