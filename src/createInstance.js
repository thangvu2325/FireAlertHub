import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  
  try {
    const res = await axios.post("https://backendjwt.onrender.com/auth/refresh" ,{
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      console.log(decodedToken.exp, date.getTime() / 1000)
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        console.log(data);
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};