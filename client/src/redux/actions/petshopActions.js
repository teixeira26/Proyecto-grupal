import axios from "axios";
import { GET_PRODUCTS } from "../actions-type/petshopActionsTypes";

export function getProducts (){
    return async function (dispatch){
        let response = await axios.get('http://localhost:3001/products');
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    }
}