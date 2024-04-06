import { Skeleton, Space, Card, Row, Col } from 'antd'
import { FC } from 'react'

const CardProductSkeleton: FC<any> = () => {
  return (
    <>
      <Col xs={12} md={12} lg={4} xl={4}>
        <Card className="card_product">
          <Space>
            <Skeleton.Image active={true} />
          </Space>
          <br />
          <br />
          <Skeleton active />
        </Card>
      </Col>
      <Col xs={12} md={12} lg={4} xl={4}>
        <Card className="card_product">
          <Space>
            <Skeleton.Image active={true} />
          </Space>
          <br />
          <br />
          <Skeleton active />
        </Card>
      </Col>
      <Col xs={12} md={12} lg={4} xl={4}>
        <Card className="card_product">
          <Space>
            <Skeleton.Image active={true} />
          </Space>
          <br />
          <br />
          <Skeleton active />
        </Card>
      </Col>
      <Col xs={12} md={12} lg={4} xl={4}>
        <Card className="card_product">
          <Space>
            <Skeleton.Image active={true} />
          </Space>
          <br />
          <br />
          <Skeleton active />
        </Card>
      </Col>
      <Col xs={12} md={12} lg={4} xl={4}>
        <Card className="card_product">
          <Space>
            <Skeleton.Image active={true} />
          </Space>
          <br />
          <br />
          <Skeleton active />
        </Card>
      </Col>
      <Col xs={12} md={12} lg={4} xl={4}>
        <Card className="card_product">
          <Space>
            <Skeleton.Image active={true} />
          </Space>
          <br />
          <br />
          <Skeleton active />
        </Card>
      </Col>
    </>
  )
}

export default CardProductSkeleton
