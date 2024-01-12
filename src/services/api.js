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
        const getBuyableAttacksURL = url + `/shop/attacks`;
        console.log(token);

        let response = await axios({
            method: 'get',
            url: getBuyableAttacksURL,
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
        const getUsersURL = url + '/shop/attacks/' + id + '/buy';
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

async function createAttack(token, attack_ID, positions, img) {
    try {
        const createAttackURL = url + `/shop/attacks`;

        console.log(typeof token, typeof attack_ID, typeof positions, typeof img);

        let response = await axios({
            method: 'post',
            url: createAttackURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            data: {
                attack_ID: attack_ID,
                positions: positions,
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

async function getPlayerAttacks(token, id) {
    try {
        const getPlayerAttacksURL = url + `/players/${id}/attacks`;
        console.log(getPlayerAttacksURL);

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

async function createGame(token, game_ID, Size, HP) {
    try {
        const createGameURL = url + `/arenas`;
        console.log(createGameURL);
        let response = await axios({
            method: 'post',
            url: createGameURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            data: {
                game_ID: game_ID,
                size: Size,
                HP_max: HP
            },
            timeout: 30000
        });
    } catch (error){
        console.error('Error: ', error);
        throw error;
    }
}

async function getAvailableGames(token) {
    try {
        const getAvailableGamesURL = url + `/arenas`;
        console.log(getAvailableGamesURL);

        let response = await axios({
            method: 'get',
            url: getAvailableGamesURL,
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

async function joinGame(token, id) {
    try {
        const joinGameURL = url + '/arenas/' + id + '/play';
        console.log(joinGameURL);
        let response = await axios({
            method: 'post',
            url: joinGameURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            timeout: 30000
        });
    } catch (error){
        console.error('Error: ', error);
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

async function sellAttack(token, id, price) {
    try {
        const sellAttackURL = url + `/shop/attacks/${id}/sell`;
        console.log(sellAttackURL);
        let response = await axios({
            method: 'post',
            url: sellAttackURL,
            headers: {
                'Content-Type': 'application/json',
                'Bearer' : token
            },
            data: {
                price: price
            },
            timeout: 30000
        });
    } catch (error){
        console.error('Error: ', error);
        throw error;
    }
}


export { loginAPI, registerAPI, getBuyableAttacks, getPlayerAttacks, getUserAPI , getUsersAPI, deleteUserAPI, getStatsAPI, getMyAttacksAPI, buyAttack, createAttack, sellAttack, createGame, getAvailableGames, joinGame, equipAttack, swapAttack, unequipAttack};
