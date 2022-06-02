import axios from "axios";
import { GET_PRODUCTS, SEARCHBAR_PRODUCTS, FILTER_BY_PET, SORT_PRICE, FILTER_CATEGORY,REMOVE_FROM_CART, FILTER_TARGET_ANIMAL, CHARGE_CART, CLEAR_CART} from "../actions-type/petshopActionsTypes";



export function getProducts (){
    return async function (dispatch){
        let response = await axios.get('http://localhost:3001/products');
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

export function chargeCart (email){
    console.log("se ejecuta la función charge cart")
    return {
        type: CHARGE_CART,
        email,
    }
}


export function sortByPrice(payload){
    return {
        type: SORT_PRICE,
        payload,
    }
}

export function filterByCategory(payload){
    return {
        type: FILTER_CATEGORY,
        payload,
    }
}

export function filterTargetAnimal(payload){
    return {
        type: FILTER_TARGET_ANIMAL,
        payload,
    }
}

export function removeFromCart(payload, email){
    return {
        type: REMOVE_FROM_CART,
        payload,
        email
    }
}

export function clearAllCart(email){
    return {
        type: CLEAR_CART,
        email
    }
}