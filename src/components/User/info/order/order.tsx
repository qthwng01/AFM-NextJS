'use client'

import { useEffect, useState } from 'react'
import { IOrder } from '@/app/types'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/libs/firebase/FirebaseConfig'
import { formatPrice } from '@/utils/formatCurrency'
import OrderDetail from './orderDetail'

function Order() {
  const [order, setOrder] = useState<IOrder[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const [record, setRecord] = useState<string>('')
  const columns: ColumnsType<IOrder> = [
    {
      title: 'ID đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Tên người đặt hàng',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 200,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (text) => formatPrice(text),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <a>{text === 'pending' ? <Tag color={'geekblue'}>{text.toUpperCase()}</Tag> : <Tag color={'green'}>{text.toUpperCase()}</Tag>}</a>
      ),
    },
    {
      title: 'Tạo lúc',
      dataIndex: 'created_at',
      key: 'created_at',
      ellipsis: {
        showTitle: false,
      },
      width: 200,
    },
    {
      title: 'Cập nhật lúc',
      dataIndex: 'updated_at',
      key: 'updated_at',
      ellipsis: {
        showTitle: false,
      },
      width: 200,
    },
    {
      key: 'action',
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <span style={{ cursor: 'pointer', color: '#03c78c' }} onClick={() => ViewOrder(record.orderId)}>
            Xem
          </span>
        </Space>
      ),
    },
  ]

  // handle xem đơn hàng
  const ViewOrder = (record: string) => {
    setToggleModal(true)
    setRecord(record)
  }

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true)
        const newArr: any = []
        const querySnapshot = await getDocs(collection(db, 'orderByUser'))
        querySnapshot.forEach((doc) => {
          newArr.push(doc.data())
        })
        const dataWithKeys = newArr?.map((item: IOrder, index: number) => ({
          ...item,
          key: index, // Sử dụng index làm key
        }))
        setOrder(dataWithKeys)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }
    getOrder()
  }, [])

  return (
    <>
      <Table loading={loading} columns={columns} dataSource={order} scroll={{ x: 1300 }} />
      <OrderDetail toggleModal={toggleModal} setToggleModal={setToggleModal} record={record} order={order} />
    </>
  )
}

export default Order
