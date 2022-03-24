async function main() {
  const [owner] = await ethers.getSigners();
  const DummyTokenA = await ethers.getContractFactory("DummyTokenA");
  const contract = await DummyTokenA.deploy();
  await contract.deployed();

  console.log("DummyTokenA deployed to:", contract.address);

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
