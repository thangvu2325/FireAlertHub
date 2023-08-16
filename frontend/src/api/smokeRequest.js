export const pushSmokeValue = async (id, data, accessToken, axiosJWT) => {
    try {
        await axiosJWT.patch('http://localhost:5000/api/addSmoke', data, {
            params: { id },
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
export const getSmokeValue = (id, accessToken, axiosJWT) => {
    return axiosJWT
        .get('http://localhost:5000/api/getsmoke', {
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
