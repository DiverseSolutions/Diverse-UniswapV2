import { useState,useRef,useEffect } from 'react'
import { ethers } from "ethers";
import Swal from 'sweetalert2'

import useProvider from '../hooks/useProvider'
import useMetamask from '../hooks/useMetamask'

import IERC20 from '../abi/IERC20.json'

export default function TokenDropdown({ modalId, tokens, token, setToken, tokenAmount, setTokenAmount , recheckUserBalance,setRecheckUserBalance,calculateTokenAmount }){
  const modalRef = useRef(null);
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

  useEffect(() => {
    if(recheckUserBalance){ getUserTokenBalance() }
  }, [recheckUserBalance])




  async function getUserTokenBalance(){
    try{
      let balance = await tokenContract.balanceOf(metamaskAccount)
      setUserBalance(ethers.utils.formatUnits(balance,token.decimals))
    } catch(e){
      Swal.fire({ title: 'Error!', text: 'Contract Address Isnt On This Network', icon: 'error', timer: 1500 })
      setToken(null)
      setUserBalance('0')
    }

    setRecheckUserBalance(false)
  }

  function handleButton(t){
    modalRef.current.checked = false
    setToken(t)
    setTokenAmount('0')
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="w-full form-control">
          <label className="label">
            <span className="text-xs text-gray-300 label-text">{modalId == 'from' ? 'From' : 'To'}</span>
            <span className="text-gray-400 cursor-pointer label-text-alt hover:scale-150 transition-transform"
              onClick={() => {
                if(parseInt(userBalance) > 0){
                  setTokenAmount(parseInt(userBalance).toString())
                  calculateTokenAmount(parseInt(userBalance).toString())
                }
              }}
              >Balance : {userBalance}</span>
          </label>

          <label className="input-group">
            <input type="number" placeholder="0" value={tokenAmount == 0 ? '' : tokenAmount.toString()} className="w-full input input-bordered" onChange={(e) => { 

              if(e.target.value == ''){ setTokenAmount('0'); return; }
              if(e.target.value == '0'){ setTokenAmount('0'); return; }

              if(parseInt(e.target.value) <= parseInt(userBalance)){
                setTokenAmount(parseInt(e.target.value).toString())
                calculateTokenAmount(parseInt(e.target.value).toString())
              }

            }}/>
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
