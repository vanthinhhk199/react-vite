import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Box, Container } from "@mui/material";
import {
  Twitter,
  Google,
  Instagram,
  GitHub,
  Facebook,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FaxIcon from "@mui/icons-material/Fax";
import "./style.scss";

Footer.propTypes = {};

function Footer(props) {
  return (
    <Container>
      <Box bgcolor="#fff">
        <Grid>
          <hr style={{ margin: "0" }} />
          <Grid className="above-ft">
            <Typography>Get connected with us on social networks:</Typography>
            <Grid className="grid-icon">
              <a
                href="https://www.facebook.com/profile.php?id=100004187805429"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="grid-icon" style={{ color: "blue" }} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="grid-icon" />
              </a>
              <a
                href="https://www.instagram.com/thinh_dangvan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="grid-icon" style={{ color: "#dd621a" }} />
              </a>
              <a
                href="https://github.com/vanthinhhk199"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub style={{ color: "black" }} />
              </a>
            </Grid>
          </Grid>
          <hr />
          <Grid className="footer-info" container spacing={0}>
            <Grid
              className="footer-info--left"
              item
              xs={4}
              style={{ textAlign: "start" }}
            >
              <div className="form-text">
                <Typography variant="h5" className="footer-info_title">
                  Hỗ trợ khách hàng
                </Typography>
                <Typography>Hotline: 1900-6035</Typography>
                <Typography>(1000 đ/phút, 8-21h kể cả T7, CN)</Typography>
                <Typography>Các câu hỏi thường gặp</Typography>
                <Typography>Gửi yêu cầu hỗ trợ</Typography>
                <Typography>Hướng dẫn đặt hàng</Typography>
                <Typography>Phương thức vận chuyển</Typography>
                <Typography>Chính sách đổi trả</Typography>
                <Typography>Hướng dẫn trả góp</Typography>
                <Typography>Chính sách hàng nhập khẩu</Typography>
                <Typography>Hỗ trợ khách hàng: hotro@.vn</Typography>
                <Typography>Báo lỗi bảo mật: security@.vn</Typography>
              </div>
            </Grid>
            <Grid
              className="footer-info--center"
              item
              xs={4}
              style={{ textAlign: "start" }}
            >
              <Typography className="footer-info_title" variant="h5">
                Về T-SHOP
              </Typography>
              <div className="form-text">
                <Typography>Giới thiệu T-SHOP</Typography>
                <Typography>Tuyển dụng</Typography>
                <Typography>Shop Blog</Typography>
                <Typography>Chính sách bảo mật thanh toán</Typography>
                <Typography>Chính sách bảo mật thông tin cá nhân</Typography>
                <Typography>Chính sách giải quyết khiếu nại</Typography>
                <Typography>Tiếp thị liên kết cùng T-SHOP</Typography>
                <Typography>Bán hàng doanh nghiệp</Typography>
                <Typography>Điều kiện vận chuyển</Typography>
                <Typography>Chính sách hàng nhập khẩu</Typography>
                <Typography>Gửi Astra nhận Xu mua sắm thả ga</Typography>
                <Typography>Báo lỗi bảo mật: security@.vn</Typography>
              </div>
            </Grid>
            <Grid
              className="footer-info--right"
              item
              xs={4}
              style={{ textAlign: "start" }}
            >
              <div className="form-text">
                <Typography className="footer-info_title" variant="h5">
                  CONTACT
                </Typography>
                <div className="text-info">
                  <HomeIcon />
                  <Typography>Hoà Vang, Đà Nẵng</Typography>
                </div>
                <div className="text-info">
                  <EmailIcon />
                  <Typography>vanthinh199@gmail.com</Typography>
                </div>
                <div className="text-info">
                  <PhoneIcon />
                  <Typography>+ 09905xxxxxx</Typography>
                </div>
                <div className="text-info">
                  <FaxIcon />
                  <Typography>+ 09905xxxxxx</Typography>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ backgroundColor: "#d1d0d0", padding: "10px" }}>
              © 2023 Copyright: Thinh
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Footer;
