import { Card, ConfigProvider } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import { formatPrice, formatUnit } from '@/utils/formatCurrency'
import { convertSlug } from '@/utils/convertSlugUrl'
import './CardProduct.scss'

interface ICardProps {
  id: string
  name: string
  thumbImage: string
  price: number
  priceBeforeDiscount: number
  discountAmount: number
  totalSelling: number
  className: string
}

const CardProduct: FC<ICardProps> = ({ id, name, thumbImage, price, priceBeforeDiscount, discountAmount, totalSelling, className }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 12,
          fontFamily: '__Montserrat_417c07',
        },
      }}
    >
      <Card className={!!className ? className : 'card_product'}>
        <div className="image_product">
          <Link href={`/product/${convertSlug(name)}-${id}.html`}>
            <Image src={thumbImage} width={160} height={160} alt={name} className="image_product_main" />
          </Link>
        </div>
        <div className="description_product">
          <div className="name_product">
            <Link href={`/product/${convertSlug(name)}-${id}.html`}>
              <h2 title={name}>{name}</h2>
            </Link>
          </div>
          <div className="price_product">
            <p>{formatPrice(price)}</p>
          </div>
          <div className="old_price">
            <p className="content_info_discount">
              {priceBeforeDiscount > 0 ? <span className="old_price_first">{formatPrice(priceBeforeDiscount)}</span> : ''}
              {discountAmount > 0 ? (
                <span className="badge_discount">
                  -{discountAmount}
                  <strong>%</strong>
                </span>
              ) : (
                ''
              )}
            </p>
            <p>Đã bán: {formatUnit(totalSelling)}</p>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default CardProduct
