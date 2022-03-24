const { expect } = require("chai");
const { ethers } = require("hardhat");

let contract;

beforeEach( async () => {
    const BlockHealth = await ethers.getContractFactory("BlockHealth");
    contract = await BlockHealth.deploy();
    await contract.deployed();
} );

describe("BlockHealth Contract Test", () => {
    it("Deployment Test and About Us", async function () {
        expect(await contract.aboutUs()).to.equal("Secure decentralized electronic health records sharing system based on blockchains");
      });
});