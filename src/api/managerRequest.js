import axios from 'axios';

export const getalluserinUserManager = (id, accessToken, axiosJWT) => {
    return axiosJWT
        .get('http://localhost:5000/api/getalluserinUserManager', {
            params: { id },
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};
export const sendConnectToDevice = async (id, accessToken, axiosJWT) => {
    try {
        await axiosJWT.post(
            'http://localhost:5000/api/send-mqtt',
            {},
            {
                params: { id },
                headers: { token: `Bearer ${accessToken}` },
                withCredentials: true,
            },
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
export const getAllUserWarninginUserManager = (id, accessToken, axiosJWT) => {
    return axiosJWT
        .get('http://localhost:5000/api/getAllUserWarninginUserManager', {
            params: { id },
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};
export const getLocationofAllUser = () => {
    return axios
        .get('http://localhost:5000/api/getLocationofAllUser', {
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};
export const getInbox = (id, accessToken, axiosJWT) => {
    return axiosJWT
        .get('http://localhost:5000/api/getInbox', {
            params: { id },
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};
