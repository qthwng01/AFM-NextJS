import bus from '@/app/assets/bus.svg'
import likee from '@/app/assets/likee.svg'
import refund from '@/app/assets/refund.svg'
import returnIcon from '@/app/assets/return.svg'

interface ServicesProps {
  img: string
  value: string
}[]

export const DataServices: ServicesProps[] = [
  {
    img: bus,
    value: 'Freeship 2km',
  },
  {
    img: returnIcon,
    value: 'Giao hàng từ 1 đến 3 ngày',
  },
  {
    img: refund,
    value: 'Bảo hiểm hoàn hàng',
  },
  {
    img: likee,
    value: 'Hàng chính hãng',
  },
]
