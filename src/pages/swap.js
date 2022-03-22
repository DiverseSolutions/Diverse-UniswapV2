import { useQuery } from 'react-query'
import { useEffect,useState,useRef } from 'react'
import { ethers } from "ethers";

import Swal from 'sweetalert2'

import IERC20 from '../abi/IERC20.json'

import useProvider from '../hooks/useProvider'
import useMetamask from '../hooks/useMetamask'


export default function Swap() {
  const tokensQuery = useQuery('tokensQuery', () => fetch('https://api-polygon-tokens.polygon.technology/tokenlists/default.tokenlist.json').then(res => res.json()).then(addTokens))
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)

  useEffect(() => {
    let result = tokensQuery.data;

    if(result != null){
      setFromToken(result.tokens[0])
      setToToken(result.tokens[1])
    }
  }, [tokensQuery.data])
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-4/12 shadow-2xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-2 text-2xl card-title">Swap</h2>

          <TokenDropdown token={fromToken} setToken={setFromToken} modalId={"from"} tokens={tokensQuery.data != null ? tokensQuery.data.tokens : []} />
          <div className="my-1"/>
          <TokenDropdown token={toToken} setToken={setToToken} modalId={"to"} tokens={tokensQuery.data != null ? tokensQuery.data.tokens : []} />

          <div className="flex justify-center w-full mt-8">
            <button className="w-11/12 text-white btn btn-error justify-self-center">Swap</button>
          </div>
        </div>
      </div>
    </div>
  )
}


function TokenDropdown({ modalId, tokens, token, setToken }){
  const modalRef = useRef(null);
  const [amount, setAmount] = useState(0.0)
  const [tokenContract, setTokenContract] = useState(null)
  const [userBalance, setUserBalance] = useState('0')


  const metamaskAccount = useMetamask(state => state.metamaskAccount)

  const provider = useProvider(state => state.provider)
  const signer = useProvider(state => state.signer)

  useEffect(() => {
    if(provider != null && token != null){
      const tokenContract = new ethers.Contract(token.address, IERC20, provider);
      setTokenContract(tokenContract)
    }
  },[provider,token])

  useEffect(() => {
    if(tokenContract != null){ getUserTokenBalance() }
  }, [tokenContract])




  async function getUserTokenBalance(){
    try{
      let balance = await tokenContract.balanceOf(metamaskAccount)
      setUserBalance(ethers.utils.formatUnits(balance,token.decimals))
    } catch(e){
      Swal.fire({
        title: 'Error!',
        text: 'Contract Address Isnt On This Network',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      setUserBalance('0')
    }
  }

  function handleButton(t){
    modalRef.current.checked = false
    setToken(t)
    setAmount(0)
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="w-full form-control">
          <label className="label">
            <span className="text-xs text-gray-300 label-text">{modalId == 'from' ? 'From' : 'To'}</span>
            <span className="text-gray-400 label-text-alt">Balance : {userBalance}</span>
          </label>

          <label className="input-group">
            <input type="number" placeholder="0.0" value={amount} className="w-full input input-bordered" onChange={(e) => { setAmount(e.target.value) }}/>
            <label for={modalId == 'from' ? 'fromModal' : 'toModal'} className="self-end justify-between w-4/12 ml-2 text-white btn modal-button btn-info">
              { token != null && ( <img src={token.logoURI} alt="token_image" className="w-5 h-5 mr-3 rounded-full" />) }
              { token != null ? token.symbol : 'Token' }
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </label>
          </label>
        </div>
      </div>

      <input type="checkbox" ref={modalRef} id={modalId == 'from' ? 'fromModal' : 'toModal'} className="modal-toggle" />
      <label for={modalId == 'from' ? 'fromModal' : 'toModal'} className="cursor-pointer modal">
        <label className="relative modal-box" for="">
          <h3 className="mb-3 text-2xl font-bold">Tokens</h3>

          { tokens.length > 0 && tokens.map((t,k) => (
            <button key={k} onClick={() => { handleButton(t) }} className={`justify-start w-full my-2 btn btn-outline ${t.meta != undefined && 'btn-success'}`}>
              <img src={t.logoURI} alt="token_image" className="w-5 h-5 mr-3 rounded-full" />
              {t.name}
            </button>
          ))}

        </label>
      </label>

    </>
  )
}




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
    address: "0x6E99Fa3F37a1BA6429a149384072b5377d843006",
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

function addTokens(queryData){
  let tokens = queryData.tokens

  queryData.tokens = [...DiverseTokens,...tokens]

  return queryData
}
