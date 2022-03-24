const GanacheTokens = [
  {
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: 'DummyTokenA',
    symbol: "TKNA",
    address: "0x864ae9E244484E576e8950e10bBd10dF0C756f22",
    decimals: 18,
    meta: 'diverse',
  },
  {
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
    name: 'DummyTokenB',
    symbol: "TKNB",
    address: "0x13758DE2a03f73E61b0d9Bef56C49C341FF90999",
    decimals: 18,
    meta: 'diverse',
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
const GanacheUniswapV2RouterAddress = '0xb71Cf7bb214C94F227766d99f89FC0339D860BFA'

export {
  DiverseTokens,
  GanacheTokens,
  UniswapV2RouterAddress,
  GanacheUniswapV2RouterAddress,
  tokenLists,
}
