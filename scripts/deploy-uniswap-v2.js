async function main() {
  const [deployer] = await ethers.getSigners();

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
  const mumbaiWrappedEthAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";


  const factoryContract = await UniswapV2Factory.deploy(deployer.address);
  console.log("UniswapV2Factory Fee Setter Address is Contract Owner : ",deployer.address);
  console.log("UniswapV2Factory Deployed Address :", factoryContract.address);

  const routerContract = await UniswapV2Router02.deploy(factoryContract.address,mumbaiWrappedEthAddress);
  console.log("UniswapV2Router02 Deployed Address :", routerContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
