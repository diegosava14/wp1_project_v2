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

async function getBuyableAttacks(token) {
    try {
        const getUsersURL = url + `/shop/attacks`;
        console.log(token);

        let response = await axios({
            method: 'get',
            url: getUsersURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function buyAttack(token, id) {
    try {
        const getUsersURL = url + `/shop/attacks/${id}/buy`;
        console.log(token);

        let response = await axios({
            method: 'post',
            url: getUsersURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function swapAttack(token, equip_id, unequip_id) {
    try {
        const getUsersURL = url + `/players/attacks/${equip_id}/${unequip_id}`;
        console.log(token);

        let response = await axios({
            method: 'patch',
            url: getUsersURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function equipAttack(token, equip_id) {
    try {
        const getUsersURL = url + `/players/attacks/${equip_id}`;
        console.log(token);

        let response = await axios({
            method: 'post',
            url: getUsersURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function unequipAttack(token, unequip_id) {
    try {
        const getUsersURL = url + `/players/attacks/${unequip_id}`;
        console.log(token);

        let response = await axios({
            method: 'delete',
            url: getUsersURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
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
                'Bearer' : token
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
                'Bearer' : token
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
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getStatsAPI(token, id) {
    try {
        const getUserURL = url + `/players/${id}/statistics`;
        console.log(getUserURL);

        let response = await axios({
            method: 'get',
            url: getUserURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getMyAttacksAPI(token) {
    try {
        const getUserURL = url + `/players/attacks`;
        console.log(getUserURL);

        let response = await axios({
            method: 'get',
            url: getUserURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
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
                'Bearer' : token
            },
            timeout: 30000
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { loginAPI, registerAPI, getBuyableAttacks, getAttacksAPI, getUserAPI , getUsersAPI, deleteUserAPI, getStatsAPI,
    getMyAttacksAPI, buyAttack, equipAttack, unequipAttack, swapAttack };
