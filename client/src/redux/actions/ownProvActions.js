import axios from 'axios';
import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    ID_PROVIDER,
    SORT_PROVIDER_PRICE,
    FILTER_PROVIDER_PRICE,
    GET_EVENTS,
    GET_PETS,
    GET_SOLDS,
    GET_REVIEWS
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


export function getProviders() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/providers`)
        return dispatch({
            type: GET_PROVIDERS,
            payload: json.data
        })
    }
};

export function getProviderById(email) {
    return function(dispatch){
        axios.get(`http://localhost:3001/providers/${email}`)
        .then(response => {
            dispatch({
                type: ID_PROVIDER,
                payload: response.data
            })
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

export function getSolds() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/solds`);
        return dispatch({
            type: GET_SOLDS,
            payload: json.data
        })
    }
};


export function filterByOwner(payload) {
    return {
        type: FILTER_BY_OWNER,
        payload
    }
};

export function putProvider(modification) {
    return async function () {
        try {
            await axios.put(`http://localhost:3001/providers/`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};

export function postPet(email, modification) {
    return async function () {
        try {
            console.log(email)
            await axios.post(`http://localhost:3001/pets`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};

export function putOwnerInfo(email, modification) {
    return async function () {
        try {
            console.log(email)
            await axios.put(`http://localhost:3001/owners/${email}`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};

export function getPets() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/pets`);
        return dispatch({
            type: GET_PETS,
            payload: json.data
        })
    }
};


export function postProvider(newProvider) {
    return async function () {
        try {
            await axios.post(`http://localhost:3001/providers`, newProvider)
        } catch (error) {
            console.log(error)
        }
    }
}


export function sortByProviderPrice(payload){
    return {
        type: SORT_PROVIDER_PRICE,
        payload,
    }
};

export function filterByProviderService(payload){
    return {
        type: FILTER_PROVIDER_PRICE,
        payload,
    }
};

export function getEvents() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/events`);
        return dispatch({
            type: GET_EVENTS,
            payload: json.data
        })
    }
};

export function postEvent(newEvent) {
    return async function () {
        try {
            await axios.post(`http://localhost:3001/events`, newEvent)
        } catch (error) {
            console.log(error)
        }
    }
};

export function getReviews() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/reviews`);
        return dispatch({
            type: GET_REVIEWS,
            payload: json.data
        })
    }
};

