import axios from 'axios';

import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
} from '../actions-type/ownProvActionTypes';

export function getOwners() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/owners`);
        return dispatch({
            type: GET_OWNERS,
            payload: json.data
        })
    }
};

export function getProviders(filter, order) {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/providers?filter=${filter}&order=${order}`)
        return dispatch({
            type: GET_PROVIDERS,
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
};


export function filterByOwner(payload) {
    return {
        type: FILTER_BY_OWNER,
        payload
    }
};

