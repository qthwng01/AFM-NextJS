import Link from 'next/link'
import { VoucherProps } from '@/app/types'

interface VoucherItemProps {
  data: VoucherProps[]
}

function VoucherItems({ data }: VoucherItemProps) {
  return (
    <>
      <div className="voucher_title">
        <h2>Mã giảm giá</h2>
        <Link href={''} className="show_voucher">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
      <ul className="voucher_items">
        {data?.map((item) => (
          <li className="voucher_detail" key={item.id}>
            <div className="voucher_detail_left">
              <p>{item.campaign_name}</p>
              <p>{item.content}</p>
              <p>Tiết kiệm {item.coupons[0].coupon_save}%</p>
              <p>{item.coupons[0].coupon_code}</p>
            </div>
            <div className="voucher_detail_right">
              <button type="button">Mua ngay</button>
              <p>HSD: {item.end_time}</p>
              <p>Điều kiện</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default VoucherItems
