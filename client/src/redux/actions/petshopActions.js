import axios from "axios";
import { GET_PRODUCTS, SEARCHBAR_PRODUCTS, FILTER_BY_PET } from "../actions-type/petshopActionsTypes";

export function getProducts (filter, order){
    return async function (dispatch){
        let response = await axios.get(`http://localhost:3001/products?filter=${filter || ''}&order=${order || 'ASC'}`);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    }
}


export function searchBarProducts (name){
    return async function (dispatch){
        let response = await axios.get(`http://localhost:3001/products?name=${name}`);
        return dispatch({
            type: SEARCHBAR_PRODUCTS,
            payload: response.data
        })
    }
}

export function filterByPet (payload){
    return {
        type: FILTER_BY_PET,
        payload,
    }
}