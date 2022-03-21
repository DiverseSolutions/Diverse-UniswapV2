require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.4.0", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.5.0", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.5.16", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.6.2", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.6.6", settings: { optimizer: { enabled: true, runs: 200 } } },
    ]
  },
  abiExporter: {
    path: './src/abi',
    runOnCompile: true,
    flat: true,
    clear: true,
    spacing: 2,
    pretty: true,
  }
};
