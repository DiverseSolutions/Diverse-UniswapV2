import React from 'react'
import Link from 'next/link'

import useMetamask from '../hooks/useMetamask.js'

export default function Nav() {
  const isMetamaskConnected = useMetamask(state => state.isMetamaskConnected)
  const metamaskAccount = useMetamask(state => state.metamaskAccount)
  const metamaskChainId = useMetamask(state => state.metamaskChainId)
  const isOnCorrectChain = useMetamask(state => state.isOnCorrectChain)

  const requestMetamaskConnection = useMetamask(state => state.requestMetamaskConnection)

  function handleConnectToMetamask(){
    requestMetamaskConnection()
  }

  function checkConnection(){
    if(isMetamaskConnected == false || isOnCorrectChain == false){
      return 'btn-disabled'
    }
    
    return ''
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex="0" className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li tabIndex="0">
              <a className="justify-between">
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
              </a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <Link href="/"><a className="text-xl normal-case btn btn-ghost">ArdMoney</a></Link>
      </div>


      <div className="hidden navbar-center lg:flex">
        <ul className="p-0 menu menu-horizontal">
          <li><Link href="/"><a className={`${checkConnection()}`}>Home</a></Link></li>
          <li className="mx-2"><Link href="/swap"><a className={`${checkConnection()}`}>Swap</a></Link></li>

          <li className="dropdown dropdown-open">
            <Link href="/pool/all">
              <a tabindex="0" class="m-1" className={`${checkConnection()}`}>
                Pool
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
            </Link>

            <ul tabindex="0" className={`p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52`}>
              <li><Link href="/pool/create"><a className={`${checkConnection()}`}>Create Pool</a></Link></li>
              <li><Link href="/pool/all"><a className={`${checkConnection()} my-2`}>All Pool</a></Link></li>
              <li><Link href="/pool/my"><a className={`${checkConnection()}`}>My Pool</a></Link></li>
            </ul>
          </li>

        </ul>
      </div>
      <div className="navbar-end">
        { isMetamaskConnected && metamaskAccount != null && metamaskChainId != null ? (
          <>
            <a className="mr-3 btn btn-primary">{ metamaskChainId }</a>
            <a className="btn">{ metamaskAccount.substring(0,9) }...</a>
          </>
        ) : (
          <a className="btn" onClick={() => { handleConnectToMetamask() }}>Connect To Metamask</a>
        ) }
      </div>
    </div>
  )
}

