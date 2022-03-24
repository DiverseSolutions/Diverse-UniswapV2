import { useEffect,useState } from 'react'
import { ethers } from "ethers";
import Link from 'next/link'
import Swal from 'sweetalert2'

import { GanacheUniswapV2RouterAddress,GanacheUniswapV2FactoryAddress } from '../../constants'

import UniswapV2FactoryABI from '../../abi/UniswapV2Factory.json'
import IUniswapV2PairABI from '../../abi/IUniswapV2Pair.json'
import IERC20 from '../../abi/IERC20.json'

import useProvider from '../../hooks/useProvider.js'
import useMetamask from '../../hooks/useMetamask.js'

export default function PoolAll() {
  const [pairs, setPairs] = useState([])

  const metamaskAccount = useMetamask(state => state.metamaskAccount)

  const provider = useProvider(state => state.provider)
  const signer = useProvider(state => state.signer)

  useEffect(() => {
    if(provider != null & signer != null){ factoryContractInitialize() }
  },[provider,signer])

  async function factoryContractInitialize(){
    let factory = new ethers.Contract(GanacheUniswapV2FactoryAddress,UniswapV2FactoryABI,provider)
    let poolLength = (await factory.allPairsLength()).toNumber()

    let _pairs = []
    for(let i=0;i < poolLength;i++){
      let pairAddress = await factory.allPairs(i)
      console.log(pairAddress)
      _pairs.push(pairAddress)
    }

    setPairs(_pairs)

  }

  return (
    <div class="w-full h-full flex justify-center">
      <div class="flex flex-col items-center w-8/12 h-4/12">

        <div class="mt-5 w-full relative z-10">
          <div class="mockup-code">
            <pre data-prefix="$"><code class="text-3xl font-semibold">All Pool</code></pre> 
            <pre data-prefix=">">
              <code class="relative text-lg">
                <Link href="/pool/create">
                  <a class="relative z-20 hover:text-4xl transition-all cursor-pointer">Create Pool</a>
                </Link>
              </code>
            </pre> 
            <pre data-prefix=">">
              <code class="relative text-lg">
                <Link href="/pool/my">
                  <a class="relative z-20 hover:text-4xl transition-all cursor-pointer">My Pool</a>
                </Link>
              </code>
            </pre> 
          </div>
        </div>

        <div class="overflow-x-auto mt-8 w-full">
          <h1 class="text-2xl uppercase font-bold mb-2">All Pool</h1>
          <table class="table w-full">
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th>Reserve</th>
              </tr>
            </thead>
            <tbody>
              {
                pairs.map((p) => {
                  return ( <PoolTableItem pairAddress={p} provider={provider} />) }
                )
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )

  function handleProviderSignerAuth(){
    if(provider == null){
      Swal.fire({ icon: 'error', title: 'Provider Is Empty', timer: 1500 })
      return
    }

    if(signer == null){
      Swal.fire({ icon: 'error', title: 'Signer Is Empty', timer: 1500 })
      return
    }
  }
}

function PoolTableItem({ pairAddress,provider }){
  const [pairContract, setPairContract] = useState(null)
  const [tokenAcontract, setTokenAcontract] = useState(null)
  const [tokenBcontract, setTokenBcontract] = useState(null)

  const [tokenA_name, setTokenA_name] = useState(null)
  const [tokenB_name, setTokenB_name] = useState(null)
  const [tokenA_reserve, setTokenA_reserve] = useState(null)
  const [tokenB_reserve, setTokenB_reserve] = useState(null)

  useEffect(() => {
    let _pair = new ethers.Contract(pairAddress,IUniswapV2PairABI,provider)
    setPairContract(_pair);
  },[])

  useEffect(() => {
    if(pairContract != null){ initializePairData() }
  },[pairContract])

  useEffect(() => {
    if(tokenAcontract != null){ initializeTokenAData() }
  },[tokenAcontract])

  useEffect(() => {
    if(tokenBcontract != null){ initializeTokenBData() }
  },[tokenBcontract])


  return (
    <tr>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
          { tokenA_name != null && tokenB_name != null && (
            <>
              <div class="mask mask-squircle w-6 h-6">
                <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022" alt="token_base" />
              </div>
              <div class="mx-1"></div>
              <div class="mask mask-squircle w-6 h-6">
                <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" alt="token_quote" />
              </div>
            </>
          ) }
          </div>
          { tokenA_name != null && tokenB_name != null ? (
            <div class="font-bold">{tokenA_name} / {tokenB_name}</div>
          ) : (
            <div class="font-bold">...</div>
          ) }
        </div>
      </td>

      <td>
          { tokenA_reserve != null && tokenB_reserve != null ? (
            <div class="font-bold">{parseInt(tokenA_reserve)} / {parseInt(tokenB_reserve)}</div>
          ) : (
            <div class="font-bold">...</div>
          ) }
      </td>

    </tr>
  )


  async function initializePairData(){
    let tokenA_address = await pairContract.token0();
    let tokenB_address = await pairContract.token1();

    let [reserve0,reserve1] = await pairContract.getReserves()

    setTokenA_reserve(ethers.utils.formatUnits(reserve0,18))
    setTokenB_reserve(ethers.utils.formatUnits(reserve1,18))

    let _tokenA = new ethers.Contract(tokenA_address,IERC20,provider)
    let _tokenB = new ethers.Contract(tokenB_address,IERC20,provider)

    setTokenAcontract(_tokenA)
    setTokenBcontract(_tokenB)
  }

  async function initializeTokenAData(){
    let _name = await tokenAcontract.name();
    setTokenA_name(_name)
  }

  async function initializeTokenBData(){
    let _name = await tokenBcontract.name();
    setTokenB_name(_name)
  }

}
