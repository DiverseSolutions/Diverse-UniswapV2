const { expect } = require("chai")
const moment = require('moment');

const { MockProvider } = require("ethereum-waffle");


describe("UniswapV2Router - Add Liquidity", function () {

  it("Testing addLiquidity()", async function () {
    const [owner, feeSetter ,wEthChainManager] = await ethers.getSigners();
    const provider = new MockProvider();

    const wEth = await ethers.getContractFactory("MaticWETH")

    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory")
    const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router02")
    const DummyTokenA = await ethers.getContractFactory("DummyTokenA")
    const DummyTokenB = await ethers.getContractFactory("DummyTokenB")
    const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair")

    const factoryContract = await UniswapV2Factory.deploy(feeSetter.address)
    await factoryContract.deployed()

    const wEthContract = await wEth.deploy(wEthChainManager.address)
    await wEthContract.deployed()

    expect(await wEthContract.name()).to.equal("Wrapped Ether")
    expect(await wEthContract.symbol()).to.equal("WETH")
    expect(await wEthContract.decimals()).to.equal(18)
    expect(await wEthContract.totalSupply()).to.equal(0)

    let wEthMintAmountWei = ethers.utils.parseUnits("5000000",18);
    
    await (await wEthContract.mint(owner.address,wEthMintAmountWei)).wait();
    expect(await wEthContract.totalSupply()).to.equal(wEthMintAmountWei)
    expect(await wEthContract.balanceOf(owner.address)).to.equal(wEthMintAmountWei)


    const dummyTokenAContract = await DummyTokenA.deploy()
    const dummyTokenBContract = await DummyTokenB.deploy()

    await dummyTokenAContract.deployed()
    await dummyTokenBContract.deployed()

    expect(await dummyTokenAContract.name()).to.equal("DummyToken-A")
    expect(await dummyTokenBContract.name()).to.equal("DummyToken-B")

    const routerContract = await UniswapV2Router.deploy(factoryContract.address,wEthContract.address)
    await routerContract.deployed()

    // Mint And Fill Owner With Dummy A & B Tokens
    let tokenMintAmountWei = ethers.utils.parseUnits("10000",18);
    await dummyTokenAContract.mint(owner.address,tokenMintAmountWei)
    await dummyTokenBContract.mint(owner.address,tokenMintAmountWei)
    expect(await dummyTokenAContract.balanceOf(owner.address)).to.equal(tokenMintAmountWei)
    expect(await dummyTokenBContract.balanceOf(owner.address)).to.equal(tokenMintAmountWei)

    // Approve RouterContract To Spend Owner Dummy A & B Tokens
    let tokenApproveLiquidityAmountWei = ethers.utils.parseUnits("10000",18);
    await (await dummyTokenAContract.approve(
      routerContract.address,
      tokenApproveLiquidityAmountWei,
      { from : owner.address }
    )).wait()

    await (await dummyTokenBContract.approve(
      routerContract.address,
      tokenApproveLiquidityAmountWei,
      { from : owner.address }
    )).wait()

    // Check Allowance Of Owner Address with Dummy A & B Token
    expect(await dummyTokenAContract.allowance(owner.address,routerContract.address)).to.equal(tokenApproveLiquidityAmountWei)
    expect(await dummyTokenBContract.allowance(owner.address,routerContract.address)).to.equal(tokenApproveLiquidityAmountWei)

    let tokenAddLiquidityAmountWei = ethers.utils.parseUnits("5000",18);

    let result = await (await routerContract.addLiquidity(
      dummyTokenAContract.address,
      dummyTokenBContract.address,
      tokenAddLiquidityAmountWei,
      tokenAddLiquidityAmountWei,
      0,
      0,
      owner.address,
      2648035579,
      {
        from: owner.address
      }
    )).wait()

    // Check If Allowance & Supply Is Removed
    expect(await dummyTokenAContract.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("5000",18))
    expect(await dummyTokenBContract.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("5000",18))
    expect(await dummyTokenAContract.allowance(owner.address,routerContract.address)).to.equal(ethers.utils.parseUnits("5000",18))
    expect(await dummyTokenBContract.allowance(owner.address,routerContract.address)).to.equal(ethers.utils.parseUnits("5000",18))

    expect(await factoryContract.allPairsLength()).to.equal(1)


    let pairAddress = await factoryContract.getPair(dummyTokenAContract.address,dummyTokenBContract.address)
    expect(await factoryContract.allPairs(0)).to.equal(await factoryContract.allPairs(0))

    let pairContract = await ethers.getContractAt("UniswapV2Pair",pairAddress)
    expect(await pairContract.token0()).to.equal(dummyTokenAContract.address)
    expect(await pairContract.token1()).to.equal(dummyTokenBContract.address)

    let [ aReserve , bReserve  ] = await pairContract.getReserves();
    expect(aReserve).to.equal(ethers.utils.parseUnits("5000",18))
    expect(bReserve).to.equal(ethers.utils.parseUnits("5000",18))

  })

})
