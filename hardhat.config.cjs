require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts)
    console.log(account.address)
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.13',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/gTVaqzjXvzf_x6lSZT0Ru4yZOsREQqvo',
      accounts: ['6f8746e48644306d46539cb625fbe27324a3203554eaf8507de409dd6f76c15a'],
    },
  },
  // networks: {
  //   hardhat: {
  //     chainId: 1337,
  //   },
  // }
}
