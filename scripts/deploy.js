const main = async () => {
  const BlockHealthFactory = await hre.ethers.getContractFactory(
    "BlockHealth"
  );
  const BlockHealthContract = await BlockHealthFactory.deploy();

  await BlockHealthContract.deployed();

  console.log(
    "BlockHealth:",
    BlockHealthContract.address
  );
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();