import React from "react";
import PropTypes from "prop-types";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

ProductMenu.propTypes = {};

function ProductMenu(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className="box-description"
      sx={{ width: "100%", typography: "body1" }}
    >
      <hr style={{ margin: "0 0 10px 0", opacity: "0.3" }} />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="DESCRIPTION" value="1" />
            <Tab label="DETAILS" value="2" />
            <Tab label="REVIEW" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <p className="detail-small--des">
            Màn hình: AMOLED6.73"Quad HD+ (2K+) <br />
            Hệ điều hành: Android 12 <br />
            Camera sau: 3 <br />
            camera 50 MP <br />
            Camera trước: 32 MP Chip: Snapdragon 8 Gen 1 8 nhân <br />
            RAM: 12 GB <br />
            Bộ nhớ trong: 256 GB SIM: 2 Nano SIM <br />
            Hỗ trợ 5G <br />
            Pin, Sạc: 4600 mAh120 W <br />* CAM KẾT VÀ BẢO HÀNH
            <br /> - hoàn tiền và đổi trả , dùng thử trong vòng 15 ngày , nếu
            quý khách có phát hiện các lỗi hay sai sản phẩm cửa hàng chúng tôi
            sẽ chịu trách nhiệm bồi thường và hoàn lại tiền cho quý khách <br />
            - Bảo hành 1 năm phần trong máy nếu có lỗi CẢM ƠN QUÝ KHÁCH ĐÃ TIN
            TƯỞNG VÀ ỦNG HỘ SHOP <br />
            #new #chinhhang #nguyenseal #moi100%
          </p>
        </TabPanel>
        <TabPanel
          value="2"
          style={{ display: "flex", flexFlow: "column", textAlign: "start" }}
        >
          <div className="detail-small">
            <div className="detail-small--left">
              <label htmlFor="">Danh Mục:</label>
              <label htmlFor="">Dung lượng lưu trữ:</label>
              <label htmlFor="">Loại bảo hành:</label>
              <label htmlFor="">Hạn bảo hành:</label>
              <label htmlFor="">Tình trạng:</label>
              <label htmlFor="">Kho hàng:</label>
              <label htmlFor="">Gửi từ:</label>
            </div>
            <div className="detail-small--right">
              <label htmlFor="">Xiaomi</label>
              <label htmlFor="">256GB</label>
              <label htmlFor="">Bảo hành nhà sản xuất</label>
              <label htmlFor="">12 tháng</label>
              <label htmlFor="">Khác</label>
              <label htmlFor="">895</label>
              <label htmlFor="">Đà Nẵng</label>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}

export default ProductMenu;
