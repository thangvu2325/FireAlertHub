import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
//npm install axios

export const loginUser = async (user, dispatch, navigate,toast) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://backendjwt.onrender.com/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success('Đăng nhập thành công');
    navigate("/");
  } catch (err) {
    toast.warn('Đăng nhập thất bại');
    dispatch(loginFailed(err.response.data.message));
  }
};

export const registerUser = async (user, dispatch, navigate, toast) => {
  dispatch(registerStart());
  try {
    await axios.post("https://backendjwt.onrender.com/auth/register", user);
    dispatch(registerSuccess());
    toast.success('Đăng ký thành công!')
    navigate("/login");
    return true;
  } catch (err) {
    toast.warn('Đăng ký thất bại!')
    dispatch(registerFailed());
    return false;
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("https://backendjwt.onrender.com/user", {
      withCredentials: true,
    });

    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    // await axiosJWT.post("https://backendjwt.onrender.com/auth/logout", id, {
    //   headers: { token: `${accessToken}` },
    // });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};