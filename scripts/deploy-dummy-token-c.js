async function main() {
  const [owner] = await ethers.getSigners();
  const DummyTokenC = await ethers.getContractFactory("DummyTokenC");
  const contract = await DummyTokenC.deploy();
  await contract.deployed();

  console.log("DummyTokenC deployed to:", contract.address);

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
