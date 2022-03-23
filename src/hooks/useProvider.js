import create from 'zustand'
import { ethers } from "ethers";


async function connectProvider(set){
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", []);

  set({ haveProvider: true, provider: provider})
}

async function connectSigner(state,set){
  if(state.provider != null){
    const signer = state.provider.getSigner()
    set({ signer: signer , haveSigner: true })
  }
}



const useProvider = create(set => ({
  haveProvider: false,
  haveSigner: false,

  provider: null,
  signer: null,

  connectProvider: async () => connectProvider(set),
  connectSigner: () => set((state) => {
    connectSigner(state,set)
    return {}
  }),

}))

export default useProvider;
