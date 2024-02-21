'use client'

import { useEffect, useState } from 'react'
import { IOrder } from '@/app/types'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/libs/firebase/FirebaseConfig'

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
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <a>{text === 'pending' ? <Tag color={'geekblue'}>{text.toUpperCase()}</Tag> : <Tag color={'green'}>{text.toUpperCase()}</Tag>}</a>,
  },
  {
    title: 'Tạo lúc',
    dataIndex: 'created_at',
    key: 'created_at',
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: 'Cập nhật lúc',
    dataIndex: 'updated_at',
    key: 'updated_at',
    ellipsis: {
      showTitle: false,
    },
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags?.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green'
  //         if (tag === 'loser') {
  //           color = 'volcano'
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         )
  //       })}
  //     </>
  //   ),
  // },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 80,
    render: (_, record) => (
      <Space size="middle">
        <a>Xem</a>
      </Space>
    ),
  },
]

function Order() {
  const [order, setOrder] = useState<IOrder[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true)
        const newArr: any = []
        const querySnapshot = await getDocs(collection(db, 'orderByUser'))
        querySnapshot.forEach((doc) => {
          newArr.push(doc.data())
        })
        const dataWithKeys = newArr?.map((item: any, index: any) => ({
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
    </>
  )
}

export default Order
