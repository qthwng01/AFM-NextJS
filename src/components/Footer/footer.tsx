import { Row, Col } from 'antd'
import Image from 'next/image'
import './footer.scss'

function Footer() {
  return (
    <footer className="footer_ly">
      <div className="container footer_top">
        <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
          <Col span={6}>
            <div className="footer_top_inside">
              <h4>VỀ CHÚNG TÔI</h4>
              <ul>
                <li>Hướng dẫn mua hàng</li>
                <li>Thanh toán</li>
                <li>Vận chuyển</li>
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer_top_inside">
              <h4>CHÍNH SÁCH</h4>
              <ul>
                <li>Chính sách giao hàng</li>
                <li>Chính sách thanh toán</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer_top_inside">
              <h4>THÔNG TIN</h4>
              <ul>
                <li>Điều khoản</li>
                <li>Liên hệ</li>
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer_top_inside">
              <h4>LIÊN KẾT CHUNG</h4>
              <ul>
                <li>Liên kết 1</li>
                <li>Liên kết 2</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="container footer_bottom">
        <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
          <Col span={18}>
            <div className="footer_bottom_left">
              <p>
                ©2023 <strong>PickBazar</strong> All rights reserved
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer_bottom_right">
              <p>Kết nối qua</p>
              <div className="social_list">
                <div className="social_icon">
                  <Image src='https://img.icons8.com/color/240/facebook-new.png' width={40} height={40} alt="facebook"></Image>
                </div>
                <div className="social_icon">
                  <Image src='https://img.icons8.com/color/240/youtube-play.png' width={40} height={40} alt="youtube"></Image>
                </div>
                <div className="social_icon">
                  <Image src='https://img.icons8.com/color/240/instagram-new--v1.png' width={40} height={40} alt="instagram"></Image>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
