const { expect } = require("chai")
const { MockProvider } = require("ethereum-waffle");


describe("UniswapV2Router", function () {
  

  it("Testing addLiquidity()", async function () {
    const provider = new MockProvider();
    const [owner,feeSetter,wEthChainManager] = provider.getWallets();

    const wEth = await ethers.getContractFactory("MaticWETH")

    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory")
    const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router02")

    const factoryContract = await UniswapV2Factory.deploy(owner.address)
    await factoryContract.deployed()

    const wEthContract = await wEth.deploy(wEthChainManager.address)
    await wEthContract.deployed()

    expect(await wEthContract.name()).to.equal("Wrapped Ether")
    expect(await wEthContract.symbol()).to.equal("WETH")
    expect(await wEthContract.decimals()).to.equal(18)


    // const routerContract = await UniswapV2Router.deploy()
    // await routerContract.deployed()

    // expect(await contract.getVariable()).to.equal()
    // await (await contract.setVariable()).wait()
    // expect(await contract.getVariable()).to.equal()
  })
  

})
