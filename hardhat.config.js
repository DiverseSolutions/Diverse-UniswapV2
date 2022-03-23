require('dotenv').config()

require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require("@nomiclabs/hardhat-etherscan");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


task("verify_uniswapv2_factory_mumbai", "Verify UniswapV2 Factory Contract On Polygon Mumbai", async (taskArgs, hre) => {
  await hre.run("verify:verify", {
    address: process.env.UNISWAPV2_FACTORY_ADDRESS,
    contract: "contracts/core/UniswapV2Factory.sol:UniswapV2Factory",
    constructorArguments: [
      process.env.FEE_SETTER_ADDRESS
    ],
  });
});

task("verify_uniswapv2_router_mumbai", "Verify UniswapV2 Router Contract On Polygon Mumbai", async (taskArgs, hre) => {
  const mumbaiWrappedEthAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";

  await hre.run("verify:verify", {
    address: process.env.UNISWAPV2_ROUTER_ADDRESS,
    contract: "contracts/periphery/UniswapV2Router02.sol:UniswapV2Router02",
    constructorArguments: [
      process.env.UNISWAPV2_FACTORY_ADDRESS,
      mumbaiWrappedEthAddress,
    ],
  });
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc"
    },
    polygonMumbai: {
      url: process.env.ALCHEMY_MUMBAI_API_URL,
      chainId: 80001,
      accounts: { mnemonic: process.env.MNEMONIC}
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.MUMBAI_API_KEY,
    },
  },
  solidity: {
    compilers: [
      { version: "0.4.0", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.5.0", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.5.16", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.6.0", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.6.2", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.6.6", settings: { optimizer: { enabled: true, runs: 200 } } },
    ]
  },
  abiExporter: {
    path: './src/abi',
    runOnCompile: true,
    except: ['IERC20'],
    flat: true,
    clear: true,
    spacing: 2,
    pretty: true,
  }
};
