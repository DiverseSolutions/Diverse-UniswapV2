const GanacheTokens = [
  {
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: 'DummyToken-A',
    symbol: "TKNA",
    address: "0x8CFF69A24D87eAe878AC048756C26a366342F08A",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
    name: 'DummyToken-B',
    symbol: "TKNB",
    address: "0xB2FbBA17De5Cbc5dae0a366113140098CA7180bf",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
    name: 'DummyToken-C',
    symbol: "TKNC",
    address: "0x57599703f8097D370ef940fd12Daf012abd2Dd4A",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    name: 'DummyToken-D',
    symbol: "TKND",
    address: "0xDfd3A9d50be6DF5FE1E6bCb1fA78d168E632DeFa",
    decimals: 18,
  },
]

const DiverseTokens = [
  {
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: 'Diverse USDC',
    symbol: "dUSDC",
    address: "0x2b8920cBdDCc3e85753423eEceCd179cb9232554",
    decimals: 6,
    meta: 'diverse',
  },
  {
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
    name: 'Diverse Tether',
    symbol: "dTether",
    address: "0xECd313e29b85cAf347fb832F80427602030cD3Fc",
    decimals: 6,
    meta: 'diverse',
  },
  {
    logoURI: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022",
    name: 'Diverse Dai',
    symbol: "dDAI",
    address: "0xaB57fAf3b573B8ac1ad90255f6cF4E92DbbcCE91",
    decimals: 18,
    meta: 'diverse',
  },
]

const tokenLists = {
  polygon : 'https://api-polygon-tokens.polygon.technology/tokenlists/default.tokenlist.json'
} 

const UniswapV2RouterAddress = '0xfD4676DBAb9942cEB64674D864E29aEe31C4b209'
const UniswapV2FactoryAddress = ''

const GanacheUniswapV2FactoryAddress = '0xa09c1da10ce94a22cCfdad98f5105d94FE66e228'
const GanacheUniswapV2RouterAddress = '0x0C64814442463Ab058355EEFd90430B6E8717B5e'

export {
  DiverseTokens,
  GanacheTokens,

  UniswapV2RouterAddress,
  GanacheUniswapV2RouterAddress,

  UniswapV2FactoryAddress,
  GanacheUniswapV2FactoryAddress,

  tokenLists,
}
