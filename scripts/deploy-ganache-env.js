async function main() {
  const [owner] = await ethers.getSigners();

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");

  const DummyTokenA = await ethers.getContractFactory("DummyTokenA");
  const DummyTokenB = await ethers.getContractFactory("DummyTokenB");
  const DummyTokenC = await ethers.getContractFactory("DummyTokenC");
  const DummyTokenD = await ethers.getContractFactory("DummyTokenD");

  const mumbaiWrappedEthAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";



  const factoryContract = await UniswapV2Factory.deploy(owner.address);
  console.log("UniswapV2Factory Fee Setter Address is Contract Owner : ",owner.address);
  console.log("UniswapV2Factory Deployed Address :", factoryContract.address);

  const routerContract = await UniswapV2Router02.deploy(factoryContract.address,mumbaiWrappedEthAddress);
  console.log("UniswapV2Router02 Deployed Address :", routerContract.address);

  const dummyAContract = await DummyTokenA.deploy();
  console.log("DummyTokenA deployed to:", dummyAContract.address);

  const dummyBContract = await DummyTokenB.deploy();
  console.log("DummyTokenB deployed to:", dummyBContract.address);

  const dummyCContract = await DummyTokenC.deploy();
  console.log("DummyTokenC deployed to:", dummyCContract.address);

  const dummyDContract = await DummyTokenD.deploy();
  console.log("DummyTokenD deployed to:", dummyDContract.address);


  let mintAmount = ethers.utils.parseEther("50000",18)
  await dummyAContract.mint(owner.address,mintAmount);
  await dummyBContract.mint(owner.address,mintAmount);
  await dummyCContract.mint(owner.address,mintAmount);
  await dummyDContract.mint(owner.address,mintAmount);

  let balanceA = (await dummyAContract.balanceOf(owner.address)).toString();
  console.log("Owner BalanceA :", ethers.utils.formatUnits(balanceA,18).toString());

  let balanceB = (await dummyBContract.balanceOf(owner.address)).toString();
  console.log("Owner BalanceB :", ethers.utils.formatUnits(balanceB,18).toString());

  let balanceC = (await dummyCContract.balanceOf(owner.address)).toString();
  console.log("Owner BalanceC :", ethers.utils.formatUnits(balanceC,18).toString());

  let balanceD = (await dummyDContract.balanceOf(owner.address)).toString();
  console.log("Owner BalanceB :", ethers.utils.formatUnits(balanceD,18).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
