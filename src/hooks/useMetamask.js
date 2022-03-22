import create from 'zustand'

function checkMetamask(){
    if (typeof window.ethereum !== 'undefined') {
      return { haveMetamask: true }
    }
    return { haveMetamask: false }
}

function checkMetamaskConnected(state){
  if( state.haveMetamask == false) return { isMetamaskConnected: false };

  if( window.ethereum.selectedAddress === null ) return { isMetamaskConnected: false };
  if( window.ethereum.selectedAddress === '' ) return { isMetamaskConnected: false };
  if( window.ethereum.networkVersion == null  ) return { isMetamaskConnected: false };

  
  return { isMetamaskConnected: true, metamaskAccount: window.ethereum.selectedAddress , metamaskChainId : window.ethereum.networkVersion };
}

async function requestMetamaskConnection(set){
  try{
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' })

    set({ 
      isMetamaskConnected: true,
      metamaskAccounts: accounts,
      metamaskAccount: window.ethereum.selectedAddress,
      metamaskChainId: window.ethereum.networkVersion
    })

  }catch(e){
      if (e.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }

    set({  })
  }
}

function checkCorrectChain(set){
  if(window.ethereum.networkVersion === '80001'){
    set({ isOnCorrectChain: true })
  }else{
    set({ isOnCorrectChain: false })
  }
}


function handleChainChange(set){
  window.ethereum.on('chainChanged', (chainId) => {
    setTimeout(() => {
      set({ metamaskChainId: window.ethereum.networkVersion })
    },900)
  });

  set({})
}

function handleAccountChange(set){
  window.ethereum.on('accountsChanged', (accounts) => {
    set({ metamaskAccount: window.ethereum.selectedAddress, metamaskAccounts: accounts })
  });

  set({})
}









const useMetamask = create(set => ({
  haveMetamask: false,
  isMetamaskConnected: false,
  isOnCorrectChain: false,

  metamaskAccounts: [],
  metamaskAccount: '',
  metamaskChainId: null,

  checkMetamask: () => set(checkMetamask),
  checkMetamaskConnected: () => set(checkMetamaskConnected),
  checkCorrectChain: () => checkCorrectChain(set),

  requestMetamaskConnection: async () => requestMetamaskConnection(set),

  handleChainChange : () => handleChainChange(set),
  handleAccountChange : () => handleAccountChange(set),
}))

export default useMetamask;
