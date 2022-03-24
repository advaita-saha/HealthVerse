const { expect } = require("chai");
const { ethers } = require("hardhat");

let contract;
let accounts;

beforeEach( async () => {
    accounts = await ethers.getSigners();
    const BlockHealth = await ethers.getContractFactory("BlockHealth");
    contract = await BlockHealth.deploy();
    await contract.deployed();
} );

describe("BlockHealth Contract Test", () => {
    it("Deployment Test and About Us", async () => {
        expect(await contract.aboutUs()).to.equal("Secure decentralized electronic health records sharing system based on blockchains");
      });

    it("Owner Check", async () => {
        expect(await contract.owner()).to.equal(accounts[0].address);
    });
});