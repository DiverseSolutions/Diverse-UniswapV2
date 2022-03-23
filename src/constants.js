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

const UniswapV2RouterAddress = '0x5374a8Ab01368D9A1Dff53c28BdA01E7b969c2eC'

export {
  DiverseTokens,
  UniswapV2RouterAddress,
  tokenLists,
}
