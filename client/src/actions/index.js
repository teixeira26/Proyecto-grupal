import axios from 'axios';

import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    GET_NAME_PROVIDER,
    FILTER_BY_PROVINDER
} from './types';

export function getOwner() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/owners');
        return dispatch({
            type: GET_OWNERS,
            payload: json.data
        })
    }
};

export function getNameOwner(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/owners?name=${name}`);
            return dispatch({
                type: GET_NAME_OWNER,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByOwner(payload) {
    console.log(payload, "estoy en actions de filter by owner");
    return {
        type: FILTER_BY_OWNER,
        payload
    }
};

export function filterByProvider() {

};
