import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AVATAR, THUMBNAIL_PLACEHOLDER } from "../../../../constants/common";
import ChangePasswordForm from "./ChangePassWordForm";
import MyOrder from "./MyOrder";
import ProfileForm from "./ProfileForm";
import "./style.scss";
MyAccount.propTypes = {};

const FORMS = {
  PROFILE: "profile",
  MY_ORDER: "order",
  CHANGE_PASSWORD: "change_password",
};

function MyAccount(props) {
  const [currentForm, setCurrentForm] = useState(FORMS.PROFILE);
  const [showChildActions, setShowChildActions] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg";
  const avatarUrl = userInfo.avatar
    ? `http://localhost:8000/assets/uploads/avatar/${userInfo.avatar}`
    : defaultAvatarUrl;

  const handleFormChange = (formName) => {
    setCurrentForm(formName);
  };

  const renderForm = () => {
    switch (currentForm) {
      case FORMS.PROFILE:
        return <ProfileForm />;
      case FORMS.MY_ORDER:
        return <MyOrder />;
      case FORMS.CHANGE_PASSWORD:
        return <ChangePasswordForm />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <Container style={{ display: "flex" }}>
      <Grid container spacing={2} className="container">
        <Grid className="myaccount-left" item xs={2}>
          <Grid className="myaccount-left_avatar">
            <Grid className="user-avatar">
              <img
                className="user-avatar_img"
                src={avatarUrl}
                alt={userInfo.avatar || "Default Avatar"}
              />
            </Grid>
            <Grid className="user-name">Thinh</Grid>
          </Grid>
          <Grid className="myaccount-left_action">
            <Grid
              className="action-user"
              onClick={() => setShowChildActions(!showChildActions)}
            >
              <div className="action-user_icon">
                <PersonIcon style={{ color: "blue" }} />
                <a>Tài Khoản Của Tôi</a>
              </div>
            </Grid>
            {showChildActions && (
              <Grid className="action-user child">
                <a onClick={() => handleFormChange(FORMS.PROFILE)}>Hồ Sơ</a>
                <a>Ngân Hàng</a>
                <a>Địa Chỉ</a>
                <a onClick={() => handleFormChange(FORMS.CHANGE_PASSWORD)}>
                  Đổi Mật Khẩu
                </a>
              </Grid>
            )}
            <Grid className="action-user">
              <div className="action-user_icon">
                <EventNoteIcon style={{ color: "blue" }} />
                <a onClick={() => handleFormChange(FORMS.MY_ORDER)}>Đơn Mua</a>
              </div>
            </Grid>
            <Grid className="action-user">
              <div className="action-user_icon">
                <NotificationsNoneIcon style={{ color: "#ff4217" }} />
                <a>Thông Báo</a>
              </div>
            </Grid>
            <Grid className="action-user">
              <div className="action-user_icon">
                <ConfirmationNumberIcon style={{ color: "#ff2424" }} />
                <a>Kho Voucher</a>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="myaccount-right" item xs={10}>
          {renderForm()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyAccount;
