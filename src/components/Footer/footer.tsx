import { Row, Col } from 'antd'
import Image from 'next/image'
import './footer.scss'

const Footer = () => {
  return (
    <footer className="footer_ly">
      <div className="container footer_top">
        <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
          <Col span={8}>
            <div className="footer_top_inside">
              <h4>VỀ CHÚNG TÔI</h4>
              <ul className='footer_list'>
                <li className='footer_item'>Hướng dẫn mua hàng</li>
                <li className='footer_item'>Thanh toán</li>
                <li className='footer_item'>Vận chuyển</li>
              </ul>
            </div>
          </Col>
          <Col span={4}>
            <div className="footer_top_inside">
              <h4>CHÍNH SÁCH</h4>
              <ul className='footer_list'>
                <li className='footer_item'>Chính sách giao hàng</li>
                <li className='footer_item'>Chính sách thanh toán</li>
                <li className='footer_item'>Chính sách bảo mật</li>
              </ul>
            </div>
          </Col>
          <Col span={4}>
            <div className="footer_top_inside">
              <h4>THÔNG TIN</h4>
              <ul className='footer_list'>
                <li className='footer_item'>Điều khoản</li>
                <li className='footer_item'>Liên hệ</li>
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="footer_top_inside">
              <h4>THEO DÕI</h4>
              <p>Theo dõi để nhận thông tin về những sản phẩm khuyến mãi, voucher mới nhất.</p>
              <form className='form_top_inside'>  
                <input className='newsletter' type='email' name='newsletter' placeholder='Nhập email...' />
                <button className='submit_form'>Submit</button>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <div className="container footer_bottom">
        <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
          <Col span={18}>
            <div className="footer_bottom_left">
              <p className='p_footer_bottom_left'>
                ©2024 <strong>PickBazar</strong> All rights reserved
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer_bottom_right">
              <p className='p_footer_bottom_right'>Kết nối qua</p>
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
