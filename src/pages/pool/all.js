import Link from 'next/link'
import PoolTableItem from '../../components/PoolTableItem.js'

export default function PoolAll() {
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
                <th>Name</th>
                <th>Liquidity</th>
                <th>Volume (24H)</th>
                <th>Fees (24H)</th>
                <th>APR</th>
                <th>View Pool</th>
              </tr>
            </thead>
            <tbody>
              <PoolTableItem />
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

