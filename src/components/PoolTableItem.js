export default function PoolTableItem(){
  return (
    <tr>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-6 h-6">
              <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022" alt="token_base" />
            </div>
            <div class="mx-1"></div>
            <div class="mask mask-squircle w-6 h-6">
              <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" alt="token_quote" />
            </div>
          </div>
          <div class="font-bold">dDAI-dUSDT</div>
        </div>
      </td>
      <td>$174,414,786</td>
      <td>$42,594,863</td>
      <td>$106,487</td>
      <td>22.28470%</td>
      <th>
        <button class="btn btn-primary w-full">View</button>
      </th>
    </tr>

  )
}
