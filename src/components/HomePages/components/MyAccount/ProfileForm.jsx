import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import "./style.scss";
import userApi from "../../../../api/userApi";
import { UserInfo } from "../Auth/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

ProfileForm.propTypes = {};

function ProfileForm(props) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
  );

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.id;
      const response = await userApi.userinfo(user_id);
      const dataUser = response.data.user;
      setUserInfo(dataUser);
      dispatch(UserInfo(dataUser));
    })();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
    setEditedUserInfo({ ...editedUserInfo, [field]: userInfo[field] });
  };

  const handleChange = (e) => {
    setEditedUserInfo({ ...editedUserInfo, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      if (selectedFile) {
        const user_id = userInfo.id;
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        const avt = await userApi.uploadAvatar(user_id, formData);
        const avatar = avt.data.user;
        dispatch(UserInfo(avatar));
      }

      const data = await userApi.updateUserInfo(userInfo.id, editedUserInfo);
      setEditingField(null);
      setUserInfo({ ...userInfo, ...editedUserInfo });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "25px" }}>
      <Grid item xs={12} className="myaccount-right_lable">
        <Typography variant="h5">Hồ Sơ Của Tôi</Typography>
        <Typography>Quản lý thông tin hồ sơ để bảo mật tài khoản</Typography>
      </Grid>
      <hr />
      <Grid container spacing={2} className="myaccount-right_action">
        <Grid item xs={8} className="action-left">
          <div className="label-info">
            <label className="label-name">Vai trò</label>
            <label className="label-name">Tên</label>
            <label className="label-name">Email</label>
            <label className="label-name">Số điện thoại</label>
            <label className="label-name">Giới tính</label>
            <label className="label-name">Ngày sinh</label>
          </div>
          <div className="profile-info">
            <div className="info">
              {userInfo.role === 0 ? (
                <span>Khách Hàng</span>
              ) : userInfo.role === 1 ? (
                <>
                  <span>Quản trị viên</span>
                  <Link to="/admin" style={{ marginLeft: "10px" }}>
                    Đến Trang Admin
                  </Link>
                </>
              ) : (
                <span>Vô danh tiểu tốt</span>
              )}
            </div>
            <div className="info">
              {!editingField || editingField !== "name" ? (
                <>
                  {userInfo.name} &nbsp;
                  <a href="#" onClick={() => handleEdit("name")}>
                    Thay đổi
                  </a>
                </>
              ) : (
                <>
                  <TextField
                    style={{ padding: "0" }}
                    name="name"
                    value={editedUserInfo.name || ""}
                    onChange={handleChange}
                  />
                  <Button variant="contained" onClick={handleSave}>
                    Lưu
                  </Button>
                </>
              )}
            </div>
            <div className="info">{userInfo.email}</div>
            <div className="info">
              {!editingField || editingField !== "phone" ? (
                <>
                  {userInfo.phone} &nbsp;
                  <a href="#" onClick={() => handleEdit("phone")}>
                    Thay đổi
                  </a>
                </>
              ) : (
                <>
                  <TextField
                    name="phone"
                    value={editedUserInfo.phone || ""}
                    onChange={handleChange}
                  />
                  <Button variant="contained" onClick={handleSave}>
                    Lưu
                  </Button>
                </>
              )}
            </div>
            <div className="info">
              {!editingField || editingField !== "gender" ? (
                <>
                  {userInfo.gender} &nbsp;
                  <a href="#" onClick={() => handleEdit("gender")}>
                    Thay đổi
                  </a>
                </>
              ) : (
                <>
                  <TextField
                    name="gender"
                    value={editedUserInfo.gender || ""}
                    onChange={handleChange}
                  />
                  <Button variant="contained" onClick={handleSave}>
                    Lưu
                  </Button>
                </>
              )}
            </div>
            <div className="info">
              {!editingField || editingField !== "birthday" ? (
                <>
                  {userInfo.birthday} &nbsp;
                  <a href="#" onClick={() => handleEdit("birthday")}>
                    Thay đổi
                  </a>
                </>
              ) : (
                <>
                  <TextField
                    name="birthday"
                    type="date"
                    value={editedUserInfo.birthday || ""}
                    onChange={handleChange}
                  />
                  <Button variant="contained" onClick={handleSave}>
                    Lưu
                  </Button>
                </>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={4} className="action-right">
          <Grid className="action-image">
            <img
              style={{ width: "100px" }}
              className="user-avatar_img"
              src={previewImage}
              alt=""
            />
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            <br />
            <label htmlFor="" style={{ opacity: 0.5 }}>
              Định dạng: jpeg, png, jpg, gif
            </label>
            <br />
            <Button
              variant="contained"
              onClick={handleSave}
              style={{ marginTop: "20px" }}
            >
              Lưu
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileForm;
