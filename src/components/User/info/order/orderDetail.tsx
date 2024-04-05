import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Modal, Button, Divider, Card, Avatar } from 'antd'
import { IOrder } from '@/app/types'
import { formatPrice } from '@/utils/formatCurrency'
import Link from 'next/link'
import { convertSlug } from '@/utils/convertSlugUrl'

const { Meta } = Card

interface IOrderDetailProps {
  toggleModal: boolean
  setToggleModal: Dispatch<SetStateAction<boolean>>
  record: string
  order: IOrder[]
}

const OrderDetail: React.FC<IOrderDetailProps> = ({ toggleModal, setToggleModal, record, order }) => {
  const [data, setData] = useState<IOrder | null>(null)

  const handleCancel = () => {
    setToggleModal(!toggleModal)
  }

  useEffect(() => {
    if (order && order.length > 0) {
      const dataDetail = order?.find((item) => item.orderId === record)
      if (dataDetail) {
        setData(dataDetail)
        //console.log(dataDetail)
      } else {
        setData(null)
      }
    } else {
      setData(null)
    }
  }, [record, order])

  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={toggleModal}
      onCancel={handleCancel}
      centered
      footer={[
        <Button type="primary" key="back" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      <p>ID đơn hàng: {data?.orderId}</p>
      <p>Tên người đặt hàng: {data?.fullname}</p>
      <p>Địa chỉ: {data?.address}</p>
      <p>SĐT: {data?.phone}</p>
      <p>Tổng tiền: {data?.total}</p>
      <p>Trạng thái: {data?.status}</p>
      <p>Tạo lúc: {data?.created_at}</p>
      <p>Cập nhật: {data?.updated_at}</p>
      <Divider />
      {data?.data.map((item, index) => (
        <React.Fragment key={index}>
          <Card style={{ width: '100%', marginTop: 16 }}>
            <Meta avatar={<Avatar src={item?.productImage} />} title={item?.productName} description={formatPrice(item?.productPrice) + " " + `SL: ${item?.quantity}`} />
            {/* <Link style={{ color: '#03c78c', marginTop: 20 }} href={`/product/${convertSlug(item?.productName)}-${item?.productId}.html`}>
              Chi tiết
            </Link> */}
          </Card>
        </React.Fragment>
      ))}
      <Divider />
    </Modal>
  )
}

export default OrderDetail
