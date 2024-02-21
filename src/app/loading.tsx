import { Spin, ConfigProvider } from 'antd'

export default function Loading() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#03c78c',
        },
      }}
    >
      <Spin tip="Loading" size="large">
        <div className="spin_content" />
      </Spin>
    </ConfigProvider>
  )
}
