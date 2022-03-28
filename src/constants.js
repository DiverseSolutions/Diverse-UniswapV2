const GanacheTokens = [
  {
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: 'DummyToken-A',
    symbol: "TKNA",
    address: "0xA51cEC9bC15D1f0f319Fc77C82b271b7ab534E89",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
    name: 'DummyToken-B',
    symbol: "TKNB",
    address: "0x9c57FE31D77860f8e418A3c48E5f017c0e933d68",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
    name: 'DummyToken-C',
    symbol: "TKNC",
    address: "0x723dCC66A4105b75Fe14dEa40EF025C3bDcF731E",
    decimals: 18,
  },
  {
    logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    name: 'DummyToken-D',
    symbol: "TKND",
    address: "0x4b170157f88809d81937E123950Dd6280d0BF1f0",
    decimals: 18,
  },
]

const DiverseTokens = [
  // {
  //   logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
  //   name: 'Diverse USDC',
  //   symbol: "dUSDC",
  //   address: "0x2b8920cBdDCc3e85753423eEceCd179cb9232554",
  //   decimals: 6,
  //   meta: 'diverse',
  // },
  // {
  //   logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
  //   name: 'Diverse Tether',
  //   symbol: "dTether",
  //   address: "0xECd313e29b85cAf347fb832F80427602030cD3Fc",
  //   decimals: 6,
  //   meta: 'diverse',
  // },
  // {
  //   logoURI: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022",
  //   name: 'Diverse Dai',
  //   symbol: "dDAI",
  //   address: "0xaB57fAf3b573B8ac1ad90255f6cF4E92DbbcCE91",
  //   decimals: 18,
  //   meta: 'diverse',
  // },
  {
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022",
    name: 'DummyToken-A',
    symbol: "TKNA",
    address: "0x8A250B3517AD8d59354D50af0D9be5c4Cd90F070",
    decimals: 18,
    meta: 'diverse',
  },
  {
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022",
    name: 'DummyToken-B',
    symbol: "TKNB",
    address: "0x551181Be541f56ce6C6c13448F54Adb8eA2AB531",
    decimals: 18,
    meta: 'diverse',
  },
  {
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
    name: 'DummyToken-C',
    symbol: "TKNC",
    address: "0x14cD48F91D3ca4FE9C7e2e888d68667879942A9D",
    decimals: 18,
    meta: 'diverse',
  },
  {
    logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=022",
    name: 'DummyToken-D',
    symbol: "TKND",
    address: "0x76Cc59faf54D6262680049D4B5c74e7A587C8849",
    decimals: 18,
    meta: 'diverse',
  },
]

const tokenLists = {
  polygon : 'https://api-polygon-tokens.polygon.technology/tokenlists/default.tokenlist.json'
} 

const UniswapV2RouterAddress = '0x60a2779d0E441e06Dea955AF160cCE98DB78d261'
const UniswapV2FactoryAddress = '0xB05AA12a5E8093A6aB561413Ea1B22684C79454B'

const GanacheUniswapV2FactoryAddress = '0xa56D009772ae5B0071A52Feae5Ba2DdBD8c7f807'
const GanacheUniswapV2RouterAddress = '0x66bA5c37e015B0ceb7013f03A82283c727241A27'

const factoryAddress = process.env.NEXT_PUBLIC_ENV == 'prod' ? UniswapV2FactoryAddress : GanacheUniswapV2FactoryAddress
const routerAddress = process.env.NEXT_PUBLIC_ENV == 'prod' ? UniswapV2RouterAddress : GanacheUniswapV2RouterAddress

const allTokens = process.env.NEXT_PUBLIC_ENV == 'prod' ? DiverseTokens : GanacheTokens;

export {
  DiverseTokens,
  GanacheTokens,

  UniswapV2RouterAddress,
  GanacheUniswapV2RouterAddress,

  UniswapV2FactoryAddress,
  GanacheUniswapV2FactoryAddress,

  factoryAddress,
  routerAddress,

  allTokens,
  tokenLists,
}
