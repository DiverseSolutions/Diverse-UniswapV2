import { useQuery } from 'react-query'
import { useEffect,useState } from 'react'

import TokenDropdown from '../components/TokenDropdown.js'
import { DiverseTokens,tokenLists } from '../constants.js'


export default function Swap() {
  const tokensQuery = useQuery('tokensQuery', () => fetch(tokenLists.polygon).then(res => res.json()).then(addTokens))
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

          <div className="flex flex-row justify-between w-full mt-8">
            <button className="w-4/12 text-white btn-outline btn btn-accent justify-self-center">Approve</button>
            <button className="flex-grow ml-1 text-white btn-outline btn btn-primary justify-self-center">Swap</button>
          </div>
        </div>
      </div>
    </div>
  )
}



function addTokens(queryData){
  let tokens = queryData.tokens

  queryData.tokens = [...DiverseTokens,...tokens]

  return queryData
}
