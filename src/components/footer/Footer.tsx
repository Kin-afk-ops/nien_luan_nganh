import React from "react";
import styles from "./Footer.module.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";
// import logo from "../../assets/logo/logo.png";
import banner from "../../assets/banner/footer_banner.png";
import vnpayLogo from "../../assets/logo/vnpay_logo.svg";
import visaLogo from "../../assets/logo/visa_logo.svg";
import momoLogo from "../../assets/logo/momo_logo.png";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Image
        src={banner}
        alt="Footer Banner"
        className={styles.footer_banner}
      ></Image>
      <div className={styles.footerContainer}>
        {/* Contact Section */}
        <div className={styles.footerColumn}>
          <h3>Phương thức thanh toán</h3>
          <div className={styles.footerLogo}>
            <Image src={vnpayLogo} alt="VNPAY" width={50} height={50}></Image>
            <Image
              src={visaLogo}
              alt="Visa"
              width={50}
              height={50}
              style={{ marginLeft: "10px" }}
            ></Image>
            <Image
              src={momoLogo}
              alt="Visa"
              width={30}
              height={30}
              style={{ marginLeft: "10px" }}
            ></Image>
          </div>
          <h3>Liên hệ với chúng tôi</h3>
          <p>
            <FaPhone /> 0 chín không chiên
          </p>
          <p>
            <FaEnvelope /> lienhe@web.vn
          </p>
          <p>
            <FaMapMarkerAlt /> Số nhà B2.25 Vinhomes Gardenia, Hàm Nghi, P. Cầu
            Diễn, Q. Nam Từ Liêm, TP. Hà Nội
          </p>
        </div>

        {/* About Section */}
        <div className={styles.footerColumn}>
          <h3>Về Tên Web</h3>
          <ul>
            <li>
              <a href="#">Giới thiệu Web</a>
            </li>
            <li>
              <a href="#">Các câu hỏi thường gặp</a>
            </li>
            <li>
              <a href="#">Điều khoản dịch vụ</a>
            </li>
            <li>
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="#">Hướng dẫn an toàn sử dụng</a>
            </li>
            <li>
              <a href="#">Hướng dẫn bán hàng</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Policy Section */}
        <div className={styles.footerColumn}>
          <h3>Chính sách</h3>
          <ul>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Chính sách bảo vệ người mua</a>
            </li>
            <li>
              <a href="#">Chính sách giải quyết tranh chấp</a>
            </li>
            <li>
              <a href="#">Chính sách giao tiếp</a>
            </li>
            <li>
              <a href="#">Những món đồ bị cấm</a>
            </li>
            <li>
              <a href="#">Hành vi bị cấm</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3>Theo dõi chúng tôi tại</h3>
          <div className={styles.footerLogo}>
            <a href="https://www.facebook.com/" className={styles.icon}>
              <FaFacebook style={{ color: "#1877F2", fontSize: "30" }} />
            </a>
            <a href="instargram" className={styles.icon}>
              <FaInstagram style={{ color: "#E1306C", fontSize: "30" }} />
            </a>
            <a
              href="https://www.tiktok.com/foryou?lang=vi-VN"
              className={styles.icon}
            >
              <FaTiktok style={{ color: "black", fontSize: "30" }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
