import { USER_API_END_POINT } from "@/utils/constant";
import { setAllUsers } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token 
     
      try {
        //    const res= await axios.get(`${USER_API_END_POINT}/get`, {withCredentials:true});
        const res = await axios.get(
          `${USER_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
            withCredentials: true, // Include credentials if needed
          }
          // { withCredentials: true }
        );
        //    console.log('API response1:', res.data.users);

        if (res.data.success) {
          // console.log('Fetched users:', res.data);
          dispatch(setAllUsers(res.data.users));
        }
        else {
          console.log("Failed to fetch users:", res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, [dispatch, searchedQuery]);
};

export default useGetAllUsers;
