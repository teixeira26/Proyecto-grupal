import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS, 
} from '../actions-type/ownProvActionTypes';
import { FILTER_BY_PET, GET_PRODUCTS, SEARCHBAR_PRODUCTS, SORT_PRICE, FILTER_CATEGORY, FILTER_TARGET_ANIMAL } from '../actions-type/petshopActionsTypes';
import { TYPES } from '../actions/shoppingActions';
import axios from "axios";
// Definir constante con un objeto de estados iniciales.
const initialState = {
    owners: [],
    copyOwners: [],
    providers: [],
    copyProviders: [],
    products: [],
    filteredProducts: [],
    cart: []
};

// Definimos la función reducer
function rootReducer(state = initialState, action) {

    switch (action.type) {

        case TYPES.ADD_TO_CART: {
            console.log('entré al reducer')
            // Buscamos id (pasado por payload) en el arreglo de productos y guardamos el producto que coincida con el id.
            
                const product = state.products.find( product => product.id === action.payload);
                console.log(product)
                return{
                        ...state,
                        cart:[...state.cart, product]
                    }
                
           
            // let newItem = state.products.find(
            //     product => product.id === action.payload);
            // console.log(newItem);

            // // De la propiedad cart del stado encontrar el item que estamos pasando si se cumple la condición.
            // // Con itemInCart validamos que no se repitn en el render un mismo producto.
            // let itemInCart = state.cart.find(item => item.id === newItem.id);

            // return itemInCart ?
            //     {
            //         ...state,
            //         cart: state.cart.map(item =>
            //             item.id === newItem.id ?
            //                 {
            //                     ...item,
            //                     quantity: item.quantity + 1
            //                 } :
            //                 item)
            //     } :
            //     {
            //         ...state,
            //         cart: [...state.cart, { ...newItem, quantity: 1 }]
            //     }
        }
        case GET_OWNERS:
            return {
                ...state,
                owners: action.payload,
                copyOwners: action.payload
            }

        case GET_PROVIDERS:
            return {
                ...state,
                providers: action.payload,
                copyProviders: action.payload
            }

        case GET_NAME_OWNER:
            return {
                ...state,
                copyOwners: action.payload,
            }


        case FILTER_BY_OWNER:
            console.log("REDUCER FILTER_BY_OWNER", action.payload);
            console.log("REDUCER state.owners", state.owners);
            return {
                ...state,
                copyOwners: state.owners.filter(o => action.payload)
            }


        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload
            }
        
        case SEARCHBAR_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            }

        case FILTER_BY_PET:
            var array = [];
            for (var i = 0; i < state.products.length; i++) {
                var igual=false;
                    for (var j = 0; j < action.payload.length & !igual; j++) {
                        if(state.products[i]['targetAnimal'] === action.payload[j]) 
                        igual=true;
                        }
                        if(igual)array.push(state.products[i]);
                        }
                 console.log('reducer', array)       
            return {
                ...state,
                filteredProducts: array
            }


            case SORT_PRICE:
                let sortProduct = [...state.filteredProducts]
               if(action.payload === 'ASC') {
                sortProduct.sort((a, b) => {
                        if(a.price > b.price) return 1
                        if(a.price < b.price) return -1
                        return 0
                    }) }
            if(action.payload === 'DESC'){
                sortProduct.sort((a, b) => {
                        if(a.price > b.price) return -1
                        if(a.price < b.price) return 1
                        return 0
                    })}
                return{
                    ...state,
                    filteredProducts: sortProduct
                    }
    
            case FILTER_CATEGORY:
                return{
                    ...state,
                    filteredProducts: action.payload !== 'all'? 
                                        state.products.filter(p => action.payload === p.category) : 
                                        state.products
                }

                case FILTER_TARGET_ANIMAL:
                    return{
                        ...state,
                        filteredProducts: action.payload !== 'all'? 
                                            state.products.filter(p => action.payload === p.targetAnimal) : 
                                            state.products
                    }
    
            
    
        default:
            return state;
    }

}

export default rootReducer;