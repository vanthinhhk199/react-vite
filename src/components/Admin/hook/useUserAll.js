import { useEffect, useState } from "react";
import userApi from './../../../api/userApi';

export function useUserAll() {
  const [user, setUser] = useState([]);

  const reloadUser = async () => {
    try {
        const response = await userApi.getUser();
        setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    reloadUser();
  }, []);

  return { user, reloadUser };
}
