import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserForm from "./components/UserForm";
import userApi from "./../../../../api/userApi";

UserPage.propTypes = {};

function UserPage(props) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getUser();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);
  return (
    <>
      <UserForm data={user} />
    </>
  );
}

export default UserPage;
