import axios from 'axios';

const url = 'https://balandrau.salle.url.edu/i3';

async function loginAPI(username, password) {
    let response;

    try {
        const loginURL = url + `/players/join`;

        response = await axios({
            method: 'post',
            url: loginURL,
            headers: { 'Content-Type': 'application/json'},
            data: {
                player_ID: username,
                password: password
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function registerAPI(username, password, img) {
    console.log(username, password, img);
    let response;

    try {
        const registerURL = url + `/players`;

        console.log(typeof username, typeof password, typeof img);

        response = await axios({
            method: 'post',
            url: registerURL,
            headers: { 'Content-Type': 'application/json' },
            data: {
                player_ID: username,
                password: password,
                img: img
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getBuyableAttacks() {
    try {
        const attacksURL = `${url}/shop/attacks`;

        const response = await axios.get(attacksURL);

        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // other than 2xx (success).
            console.error('Server responded with non-success status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received.
            console.error('No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error.
            console.error('Error setting up the request:', error.message);
        }

        throw error;
    }
}

async function getAttacksAPI(token, id) {
    try {
        const getAttacksURL = url + `/players/${id}/attacks`;
        console.log(getAttacksURL);

        let response = await axios({
            method: 'get',
            url: getAttacksURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getUserAPI(token, id) {
    try {
        const getUserURL = url + `/players/${id}`;
        console.log(getUserURL);

        let response = await axios({
            method: 'get',
            url: getUserURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getUsersAPI(token) {
    try {
        const getUsersURL = url + `/players`;
        console.log(token);

        let response = await axios({
            method: 'get',
            url: getUsersURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function deleteUserAPI(token) {
    try {
        const deleteUserURL = url + `/players`;
        console.log(token);

        let response = await axios({
            method: 'delete',
            url: deleteUserURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { loginAPI, registerAPI, getBuyableAttacks, getAttacksAPI, getUserAPI , getUsersAPI, deleteUserAPI};
