import axios from 'axios';

import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    GET_NAME_PROVIDER,
    GET_SERVICE_PROVIDERS,  
    FILTER_BY_PROVIDER,  
    FILTER_BY_SERVICE_PROVIDER
} from './ownProvActionTypes';

export function getOwners() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/owners');
        return dispatch({
            type: GET_OWNERS,
            payload: json.data
        })
    }
};

export function getProviders() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/providers')
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

export function getNameProvider(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/providers?name=${name}`);
            return dispatch({
                type: GET_NAME_PROVIDER,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function getServiceProviders(service) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/providers?service=${service}`);
            return dispatch({
                type: GET_SERVICE_PROVIDERS,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function filterByOwner(payload) {
    console.log(payload, "estoy en actions de filter by owner");
    return {
        type: FILTER_BY_OWNER,
        payload
    }
};

export function filterByProvider(payload) {
    console.log(payload, "estoy en actions de filter by provider");
    return {
        type: FILTER_BY_PROVIDER,
        payload
    }
};

export function filterByServiceProviders(payload) {
    console.log(payload, "estoy en actions de filter by owner");
    return {
        type: FILTER_BY_SERVICE_PROVIDER,
        payload
    }
};
