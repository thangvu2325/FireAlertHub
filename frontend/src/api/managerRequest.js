import axios from 'axios';

export const getalluserinUserManager = (id, accessToken, axiosJWT) => {
    return axiosJWT
        .get('https://firealerthub.onrender.com/api/getalluserinUserManager', {
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
            'https://firealerthub.onrender.com/api/send-mqtt',
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
        .get('https://firealerthub.onrender.com/api/getAllUserWarninginUserManager', {
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
        .get('https://firealerthub.onrender.com/api/getLocationofAllUser', {
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
        .get(`https://firealerthub.onrender.com/api/${id}/getInbox`, {
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
        .patch(`https://firealerthub.onrender.com/api/${id}/${inboxId}/handleCheckInbox`, {
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
        .delete(`https://firealerthub.onrender.com/api/${id}/${inboxId}/handleDeleteInbox`, {
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
