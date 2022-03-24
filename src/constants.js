const GanacheTokens = [
  {
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: 'DummyToken-A',
    symbol: "TKNA",
    address: "0x37d1a98cef3F0ee7A8b16f1FA1b80a7F5713f7dE",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
    name: 'DummyToken-B',
    symbol: "TKNB",
    address: "0x307AA17876E05b0aCd3F0A28E45c973b704d43e5",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
    name: 'DummyToken-C',
    symbol: "TKNC",
    address: "0xB46Bed838Ab61D3166ad0327D622D2de458289F9",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    name: 'DummyToken-D',
    symbol: "TKND",
    address: "0x5A44dCDC53337Bf3c87483Cb90E5dbf5E09eBC67",
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

const GanacheUniswapV2FactoryAddress = '0xFf6d35d7eADA57895a6C0804E958FB8D7080f99F'
const GanacheUniswapV2RouterAddress = '0xF4c9c5c36972b09F88aD5ECC02165D16581Ea326'

export {
  DiverseTokens,
  GanacheTokens,

  UniswapV2RouterAddress,
  GanacheUniswapV2RouterAddress,

  UniswapV2FactoryAddress,
  GanacheUniswapV2FactoryAddress,

  tokenLists,
}
