import Link from 'next/link'
import { useEffect,useState } from 'react'
import { useQuery } from 'react-query'
import { ethers } from "ethers";
import Swal from 'sweetalert2'

import TokenDropdown from '../../components/TokenDropdown.js'
import { DiverseTokens,UniswapV2RouterAddress,tokenLists } from '../../constants.js'

import IERC20abi from '../../abi/IERC20.json'
import UniswapV2RouterABI from '../../abi/UniswapV2Router02.json'

import useProvider from '../../hooks/useProvider.js'
import useMetamask from '../../hooks/useMetamask.js'

export default function CreatePool() {
  const tokensQuery = useQuery('tokensQuery', () => fetch(tokenLists.polygon).then(res => res.json()).then(addTokens))
  const [fromToken, setFromToken] = useState(null)
  const [fromTokenAmount, setFromTokenAmount] = useState('0')
  const [toToken, setToToken] = useState(null)
  const [toTokenAmount, setToTokenAmount] = useState('0')

  const metamaskAccount = useMetamask(state => state.metamaskAccount)

  const provider = useProvider(state => state.provider)
  const signer = useProvider(state => state.signer)

  const [approveButtonDisabled, setApproveButtonDisabled] = useState(true)
  const [supplyButtonDisabled, setSupplyButtonDisabled] = useState(true)

  useEffect(() => {
    let result = tokensQuery.data;

    if(result != null){
      setFromToken(result.tokens[0])
      setToToken(result.tokens[1])
    }
  }, [tokensQuery.data])

  useEffect(() => {
    handleApproveButtonState()
    handleSwapButtonState()
  },[fromToken,toToken,toTokenAmount,fromTokenAmount])

  async function handleApproveFunction() {
    handleProviderSignerAuth()
    handleTokensAuth()

    try{
      const fromTokenContract = new ethers.Contract(fromToken.address, IERC20abi, provider);
      const toTokenContract = new ethers.Contract(toToken.address, IERC20abi, provider);

      const fromTokenContractSigner = fromTokenContract.connect(signer)
      const toTokenContractSigner = toTokenContract.connect(signer)

      await fromTokenContractSigner.approve(UniswapV2RouterAddress,ethers.utils.parseUnits(fromTokenAmount,fromToken.decimals))
      await toTokenContractSigner.approve(UniswapV2RouterAddress,ethers.utils.parseUnits(toTokenAmount,toToken.decimals))

    }catch(e){
      Swal.fire({ icon: 'error', title: 'Token Smart Contract Problem', timer: 1500 })
      console.log(e)
    }

  }


  async function handleSupplyFunction(){
    handleProviderSignerAuth()
    handleTokensAuth()

    try{
      let deadline = new Date();
      deadline.setHours(deadline.getHours() + 2);

      const uniswapRouterContract = new ethers.Contract(UniswapV2RouterAddress, UniswapV2RouterABI, provider);
      const uniswapRouterContractSigner = uniswapRouterContract.connect(signer)

      await uniswapRouterContractSigner.addLiquidity(
        fromToken.address,
        toToken.address,
        ethers.utils.parseUnits(fromTokenAmount,fromToken.decimals),
        ethers.utils.parseUnits(toTokenAmount,toToken.decimals),
        1,
        1,
        metamaskAccount,
        deadline.getTime()
      );

    }catch(e){
      Swal.fire({ icon: 'error', title: 'Uniswap Router Smart Contract Problem', timer: 1500 })
      console.log(e)
    }

  }

  return (
    <div class="w-full h-full flex justify-center">
      <div class="flex flex-col justify-center items-center w-8/12 h-4/12">

        <div class="mt-5 w-9/12">
          <div class="mockup-code">
            <pre data-prefix="$"><code class="text-3xl font-semibold">Create Pool</code></pre> 
            <pre data-prefix=">">
              <code class="relative text-lg">
                  <Link href="/pool/all">
                    <a class="relative z-20 hover:text-4xl transition-all cursor-pointer">All Pool</a>
                  </Link>
              </code>
            </pre> 
            <pre data-prefix=">">
              <Link href="/pool/my">
                <a class="relative z-20 hover:text-4xl transition-all cursor-pointer">My Pool</a>
              </Link>
            </pre> 
          </div>
        </div>

      </div>

      <div className="w-4/12 shadow-lg card bg-base-100">
        <div className="flex justify-center card-body">
          <h2 className="mb-2 text-2xl card-title">Create Pool</h2>

          <TokenDropdown 
            tokenAmount={fromTokenAmount} setTokenAmount={setFromTokenAmount}
            token={fromToken} setToken={setFromToken} 
            modalId={"from"} tokens={tokensQuery.data != null ? tokensQuery.data.tokens : []} />

          <div className="my-1"/>
          
          <TokenDropdown 
            tokenAmount={toTokenAmount} setTokenAmount={setToTokenAmount}
            token={toToken} setToken={setToToken} 
            modalId={"to"} tokens={tokensQuery.data != null ? tokensQuery.data.tokens : []} />

          <div className="flex flex-col items-center w-full mt-8 text-white">
            <button 
              onClick={() => { handleApproveFunction() }}
              className={buttonStyle("w-full btn btn-accent",approveButtonDisabled)} >Approve</button>
            <div className="my-2"></div>
            <button 
              onClick={() => { handleSupplyFunction() }}
              className={buttonStyle("w-full btn btn-primary",supplyButtonDisabled)} >Supply</button>
          </div>
        </div>
      </div>

    </div>
  )

  function buttonStyle(styles,isDisabled){
    if(isDisabled){
      let noPrimaryResult = styles.replace('btn-primary')
      let noAccentResult = noPrimaryResult.replace('btn-accent')
      return `${noAccentResult} btn-disabled bg-grey-800`
    }else{
      return `${styles}`
    }
  }

  function handleApproveButtonState() {
    if(fromToken != null && toToken != null && parseInt(toTokenAmount) != 0 && parseInt(fromTokenAmount) != 0){
      setApproveButtonDisabled(false)
    }else{
      setApproveButtonDisabled(true)
    }
  }

  async function handleSwapButtonState(){
    if(fromToken != null & toToken != null){
      if(provider != null & signer != null){
        if(fromTokenAmount != '0' & toTokenAmount != '0'){
          const fromTokenContract = new ethers.Contract(fromToken.address, IERC20abi, provider);
          const toTokenContract = new ethers.Contract(toToken.address, IERC20abi, provider);

          let fromTokenAllowanceBN = await fromTokenContract.allowance(metamaskAccount,UniswapV2RouterAddress)
          let toTokenAllowanceBN = await toTokenContract.allowance(metamaskAccount,UniswapV2RouterAddress)

          let fromTokenAllowance = ethers.utils.parseUnits(fromTokenAllowanceBN.toString(),fromToken.decimals).toString()
          let toTokenAllowance = ethers.utils.parseUnits(toTokenAllowanceBN.toString(),toToken.decimals).toString()

          if( (parseInt(fromTokenAmount) <= parseInt(fromTokenAllowance)) && (parseInt(toTokenAmount) <= parseInt(toTokenAllowance)) ){
            setSupplyButtonDisabled(false)
            setApproveButtonDisabled(true)
          }
        }
      }
    }
  }

  function handleTokensAuth(){
    if(fromToken == null && toToken == null) {
      Swal.fire({ icon: 'error', title: 'Tokens Are Not Selected', timer: 1500 })
      return
    }
  }

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

function addTokens(queryData){
  let tokens = queryData.tokens

  queryData.tokens = [...DiverseTokens,...tokens]

  return queryData
}
