const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

let contract;
let accounts;

beforeEach( async () => {
    accounts = await ethers.getSigners();
    const BlockHealth = await ethers.getContractFactory("BlockHealth");
    contract = await BlockHealth.deploy();
    await contract.deployed();

    // adding managers
    contract.addManager(accounts[1].address);
    contract.addManager(accounts[2].address);
    contract.addManager(accounts[3].address);

    // adding test data 
    contract.addRecord(
        accounts[11].address,
        accounts[6].address,
        "link1"
    );
    contract.addRecord(
        accounts[12].address,
        accounts[7].address,
        "link2"
    );

} );

describe("BlockHealth Contract Test", () => {
    it("Deployment Test and About Us", async () => {
        expect(await contract.aboutUs()).to.equal("Secure decentralized electronic health records sharing system based on blockchains");
      });

    it("Owner Check", async () => {
        expect(await contract.owner()).to.equal(accounts[0].address);
    });

    it("manager adding a record", async () => {
        assert.ok(await contract.connect(accounts[1]).addRecord(
            accounts[11].address,
            accounts[6].address,
            "link3",
        ));
    });

    it("others fail to add record", async () => {
        try{
            await contract.connect(accounts[16]).addRecord(
                accounts[11].address,
                accounts[6].address,
                "link4",
            );
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it("patients can get their record", async () => {
        const recordData = await contract.connect(accounts[12]).getMyRecords();
        assert.equal(recordData[0], "link2");
    });

    it("others cannot access patient data", async () => {
        try{
            await contract.connect(accounts[20]).getRecords(accounts[12].address);
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it("doctors can access patient data", async () => {
        const recordData = await contract.connect(accounts[7]).getRecords(accounts[12].address);
        assert.equal(recordData[0], "link2");
    });

    it("manager can get list of patients", async () => {
        const data = await contract.connect(accounts[1]).getPatients(accounts[7].address);
        assert.equal(data[0], accounts[12].address);
    });

    it("doctor can access, his/her list of patients", async () => {
        const data = await contract.connect(accounts[7]).getMyPatients();
        assert.equal(data[0], accounts[12].address);
    });

    it("add managers by owner", async () => {
        await contract.addManager(accounts[19].address);
        const managerAccess = await contract.managers(accounts[19].address);
        assert.equal(managerAccess, true);
    });

    it("remove manager access", async () => {
        await contract.deleteManager(accounts[3].address);
        const managerAccess = await contract.managers(accounts[3].address);
        assert.equal(managerAccess, false);
    });
});
