import { useQuery } from 'react-query'
import { useEffect,useState } from 'react'

import TokenDropdown from '../components/TokenDropdown.js'
import Swal from 'sweetalert2'

import { 

  routerAddress,
  factoryAddress,

  allTokens,

} from '../constants.js'

import { ethers } from "ethers";

import IERC20abi from '../abi/IERC20.json'
import UniswapV2RouterABI from '../abi/UniswapV2Router02.json'
import IUniswapV2PairABI from '../abi/IUniswapV2Pair.json'
import UniswapV2FactoryABI from '../abi/UniswapV2Factory.json'
import IERC20 from '../abi/IERC20.json'



import useProvider from '../hooks/useProvider.js'
import useMetamask from '../hooks/useMetamask.js'


export default function Swap() {
  const [tokens, setTokens] = useState([])
  const [fromToken, setFromToken] = useState(null)
  const [fromTokenAmount, setFromTokenAmount] = useState('0')
  const [toToken, setToToken] = useState(null)
  const [toTokenAmount, setToTokenAmount] = useState('0')

  const [routerContract, setRouterContract] = useState(null)
  const [factoryContract, setFactoryContract] = useState(null)

  const provider = useProvider(state => state.provider)
  const signer = useProvider(state => state.signer)

  const metamaskAccount = useMetamask(state => state.metamaskAccount)

  const [recheckUserBalance, setRecheckUserBalance] = useState(false)

  const [approveButtonDisabled, setApproveButtonDisabled] = useState(true)
  const [swapButtonDisabled, setSwapButtonDisabled] = useState(true)

  const [approveButtonLoading, setApproveButtonLoading] = useState(false)
  const [swapButtonLoading, setSwapButtonLoading] = useState(false)

  useEffect(() => {
    handleApproveButtonState()
  },[fromToken,toToken,toTokenAmount,fromTokenAmount])

  useEffect(() => {
    handleSwapButtonState()
  }, [approveButtonDisabled])


  useEffect(() => {
    if(provider != null & signer != null){ 
      factoryContractInitialize() 
      routerContractInitialize()
    }
  },[provider,signer])

  async function routerContractInitialize(){
    let router = new ethers.Contract(routerAddress,UniswapV2RouterABI,provider)
    setRouterContract(router)
  }

  async function factoryContractInitialize(){
    let factory = new ethers.Contract(factoryAddress,UniswapV2FactoryABI,provider)
    let poolLength = (await factory.allPairsLength()).toNumber()

    setFactoryContract(factory)

    let _pairTokens = [];
    let _resultTokens = []

    // Get Pair - Tokens
    for(let i=0; i < poolLength; i++){
      let pairAddress = await factory.allPairs(i)
      let _pair = new ethers.Contract(pairAddress,IUniswapV2PairABI,provider)

      let _tokenA_address = await _pair.token0();
      let _tokenB_address = await _pair.token1();

      _pairTokens.push(_tokenA_address)
      _pairTokens.push(_tokenB_address)
    }

    // Keep Only Unique Tokens
    for(let i=0; i < _pairTokens.length; i++){
      let _tokenAddress = _pairTokens[i];

      if(_resultTokens.length == 0 || _resultTokens.find((t) => t.address == _tokenAddress) == undefined){
        let _token = new ethers.Contract(_tokenAddress,IERC20,provider)
        let _name = await _token.name();

        _resultTokens.push({ 
          name: _name,
          address: _token.address
        })
        continue;
      }
    }

    finalizeResultTokens(_resultTokens)
  }

  function finalizeResultTokens(foundTokens){
    let _tokens = []

    allTokens.map((t) => {
      if(foundTokens.find((i) => i.address === t.address) !== undefined){
        _tokens.push(t)
      }
    })

    setTokens(_tokens)
  }


  useEffect(() => {
    if(tokens.length >= 2){
      setFromToken(tokens[0])
      setToToken(tokens[1])
    }
  }, [tokens])


  async function calculateTokenAmount(tokenType,amount){
    if(tokenType == 'fromToken'){
      if(amount !== '0'){
        if(fromToken == null || routerContract == null) return;
        let weiAmount = ethers.utils.parseUnits(amount,fromToken.decimals).toString()

        let [ amountIn,amountOut ] = await routerContract.getAmountsOut(weiAmount,[fromToken.address,toToken.address])
        setToTokenAmount(ethers.utils.formatUnits(amountOut.toString(),toToken.decimals))
      }
    }else{
      if(amount !== '0'){
        if(toToken == null || routerContract == null) return;
        let weiAmount = ethers.utils.parseUnits(amount,toToken.decimals).toString()

        let [ amountIn,amountOut ] = await routerContract.getAmountsOut(weiAmount,[toToken.address,fromToken.address])
        setFromTokenAmount(ethers.utils.formatUnits(amountOut.toString(),fromToken.decimals))
      }
    }
  }

  async function handleApproveFunction() {
    setApproveButtonLoading(true)

    try{
      const fromTokenContract = new ethers.Contract(fromToken.address, IERC20abi, provider);

      const fromTokenContractSigner = fromTokenContract.connect(signer)

      await (await fromTokenContractSigner.approve(routerAddress,ethers.utils.parseEther(fromTokenAmount,fromToken.decimals))).wait()

      setApproveButtonDisabled(true)
      setSwapButtonDisabled(false)

    }catch(e){
      Swal.fire({ icon: 'error', title: 'Token Smart Contract Problem', timer: 1500 })
      console.log(e)
    }

    setApproveButtonLoading(false)

  }

  async function handleSwapFunction(){
    setSwapButtonLoading(true)

    try{
      let path = [ fromToken.address,toToken.address ]
      let weiAmount = ethers.utils.parseUnits(toTokenAmount,toToken.decimals).toString()

      let routerContactSigner = routerContract.connect(signer)

      await (await routerContactSigner.swapExactTokensForTokens(
        weiAmount,
        1,
        path,
        metamaskAccount,
        2648035579,
      )).wait()

      Swal.fire({ 
        icon: 'success', 
        title: 'Successfully Swapped Tokens', 
        showCancelButton: true,
        confirmButtonText: 'Add Swapped Token',
        cancelButtonText: 'Close',
        timer: 4000 
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`https://metamask.dsolutions.mn/add-token?name=${fromToken.name}&symbol=${fromToken.symbol}&decimals=${fromToken.decimals}&address=${fromToken.address}&imgUrl=https://www.dsolutions.mn/static/media/logo-no-text.8057f73a.png`);
        }
      })

      setApproveButtonDisabled(true)
      setSwapButtonDisabled(true)
      setFromTokenAmount('0')
      setToTokenAmount('0')

      setRecheckUserBalance(true)
    }catch(e){
      Swal.fire({ icon: 'error', title: ' Router Smart Contract Swap Functionality Problem', timer: 1500 })
      console.log(e)
    }

    setSwapButtonLoading(false)
  }
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-4/12 shadow-2xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-2 text-2xl card-title">Swap</h2>

          <TokenDropdown 
            tokenAmount={fromTokenAmount} setTokenAmount={setFromTokenAmount}
            recheckUserBalance={recheckUserBalance}
            setRecheckUserBalance={setRecheckUserBalance}
            token={fromToken} setToken={setFromToken} 
            calculateTokenAmount={(amount) => { calculateTokenAmount('fromToken',amount) }}
            modalId={"from"} tokens={tokens} />

          <div className="my-1"/>

          <TokenDropdown 
            tokenAmount={toTokenAmount} setTokenAmount={setToTokenAmount}
            recheckUserBalance={recheckUserBalance}
            setRecheckUserBalance={setRecheckUserBalance}
            calculateTokenAmount={(amount) => { calculateTokenAmount('toToken',amount) }}
            token={toToken} setToken={setToToken} 
            modalId={"to"} tokens={tokens} />

          <div className="flex flex-row justify-between w-full mt-8">
            <button  
              onClick={() => { handleApproveFunction() }}
              className={buttonStyle("w-4/12 text-white btn-outline btn btn-accent justify-self-center",approveButtonDisabled,approveButtonLoading)}>Approve</button>
            <button 
              onClick={() => { handleSwapFunction() }}
              className={buttonStyle("flex-grow ml-1 text-white btn-outline btn btn-primary justify-self-center",swapButtonDisabled,swapButtonLoading,)}>Swap</button>
          </div>
        </div>
      </div>
    </div>
  )

  function buttonStyle(styles,isDisabled,isLoading){
    let result = styles

    if(isLoading){
      result += " loading";
    }

    if(isDisabled){
      result = result.replace('btn-outline')
      result = result.replace('btn-accent')
      result = result.replace('btn-primary')
      result += " btn-disabled bg-grey-800" 
    }

    return result 
  }

  async function handleApproveButtonState() {
    if(fromToken != null && toToken != null && parseInt(toTokenAmount) != 0 && parseInt(fromTokenAmount) != 0){
      const fromTokenContract = new ethers.Contract(fromToken.address, IERC20abi, provider);

      let fromTokenAllowanceBN = await fromTokenContract.allowance(metamaskAccount,routerAddress)

      setApproveButtonDisabled(false)
      // if(parseInt(fromTokenAllowanceBN.toString()) < parseInt(fromTokenAmount)){
      // }
    }else{
      setApproveButtonDisabled(true)
    }
  }

  async function handleSwapButtonState(){
    if(fromToken != null & toToken != null){
      if(provider != null & signer != null){
        if(fromTokenAmount != '0' & toTokenAmount != '0'){

          if(approveButtonDisabled){
            setSwapButtonDisabled(false)
          }else{
            setSwapButtonDisabled(true)
          }

        }
      }
    }
  }
}
