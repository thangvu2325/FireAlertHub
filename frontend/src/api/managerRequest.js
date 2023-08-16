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

//inboxs
export const getInbox = (id, accessToken, axiosJWT) => {
    return axiosJWT
        .get(`http://localhost:5000/api/${id}/getInbox`, {
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
export const handleCheckInbox = (id, inboxId, accessToken, axiosJWT) => {
    return axiosJWT
        .patch(`http://localhost:5000/api/${id}/${inboxId}/handleCheckInbox`, {
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
export const handleDeleteInbox = (id, inboxId, accessToken, axiosJWT) => {
    return axiosJWT
        .delete(`http://localhost:5000/api/${id}/${inboxId}/handleDeleteInbox`, {
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
