async function main() {
  const [owner] = await ethers.getSigners();
  const DummyTokenD = await ethers.getContractFactory("DummyTokenD");
  const contract = await DummyTokenD.deploy();
  await contract.deployed();

  console.log("DummyTokenB deployed to:", contract.address);

  let mintAmount = ethers.utils.parseEther("50000",18)
  await contract.mint(owner.address,mintAmount);

  let balance = (await contract.balanceOf(owner.address)).toString();

  console.log("Deployer Balance :", ethers.utils.formatUnits(balance,18).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
