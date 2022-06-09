import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    ID_PROVIDER,
    SORT_PROVIDER_PRICE,
    FILTER_PROVIDER_PRICE,
    GET_EVENTS,
    GET_PETS
} from '../actions-type/ownProvActionTypes';
import {
    FILTER_BY_PET,
    GET_PRODUCTS,
    SEARCHBAR_PRODUCTS,
    SORT_PRICE,
    FILTER_CATEGORY,
    FILTER_TARGET_ANIMAL,
    ID_PRODUCT,
    CHARGE_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    ADD_ITEM,
    DELETE_ITEM,
    CHARGE_FAVORITES
} from '../actions-type/petshopActionsTypes';
import { TYPES } from '../actions/shoppingActions';

const initialState = {
    owners: [],
    copyOwners: [],
    providers: [],
    copyProviders: [],
    products: [],
    filteredProducts: [],
    cart: [],
    productDetail:[],
    pets: [],
    favorites:[],
    filteredProviders:[],
    events: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case TYPES.ADD_TO_CART:
            let product = state.products.find(product => product.id === action.payload);
        if (state.cart.find(x => x.id === action.payload)) {
            product = state.cart.find(x => x.id === action.payload);
            product.quantity = product.quantity + action.quantity;
            var cart = state.cart.filter(x => x.id !== action.payload);
            cart = [...cart, product];
            localStorage.setItem(action.email, JSON.stringify(cart));
            return {
                ...state,
                cart: cart
            }
        } else {
            product.quantity = action.quantity;
            cart = [...state.cart, product];
            localStorage.setItem(action.email, JSON.stringify(cart));
            return {
                ...state,
                cart: [...state.cart, product]
            }
        }

        case REMOVE_FROM_CART:
            console.log(action.payload);
        const newCart = state.cart.filter(x => x.id !== action.payload)
        localStorage.removeItem(action.email)
        localStorage.setItem(action.email, JSON.stringify(newCart))
        return {
            ...state,
            cart: newCart
        }

        case CHARGE_FAVORITES:
            console.log(action.payload);
        return {
            ...state,
            favorites: action.payload,
        }

        case CHARGE_CART:
            console.log("entré al reducer", action.email);
        if (localStorage.getItem(action.email)) {
            let dataUser = JSON.parse(localStorage.getItem(action.email));
            return {
                ...state,
                cart: dataUser,
            }
        }

        case CLEAR_CART:
            localStorage.removeItem(action.email);
        return {
            ...state,
            cart: []
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
                filteredProviders: action.payload
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
            var igual = false;
            for (var j = 0; j < action.payload.length & !igual; j++) {
                if (state.products[i]['targetAnimal'] === action.payload[j])
                    igual = true;
            }
            if (igual) array.push(state.products[i]);
        }
        console.log('reducer', array)
        return {
            ...state,
            filteredProducts: array
        }

        case SORT_PRICE:
            let sortProduct = [...state.filteredProducts]
        if (action.payload === 'ASC') {
            sortProduct.sort((a, b) => {
                if (a.price > b.price) return 1
                if (a.price < b.price) return -1
                return 0
            })
        }
        if (action.payload === 'DESC') {
            sortProduct.sort((a, b) => {
                if (a.price > b.price) return -1
                if (a.price < b.price) return 1
                return 0
            })
        }
        return {
            ...state,
            filteredProducts: sortProduct
        }

        case FILTER_CATEGORY:
            return {
                ...state,
                filteredProducts: action.payload !== 'all' ?
                    state.products.filter(p => action.payload === p.category) : state.products
            }

        case FILTER_TARGET_ANIMAL:
            return {
                ...state,
                filteredProducts: action.payload !== 'all' ?
                    state.products.filter(p => action.payload === p.targetAnimal) : state.products
            }

        case ID_PRODUCT:
            return{
                ...state,
                productDetail: [action.payload]
            }

        case ID_PROVIDER:
            return{
                ...state,
                providers: [action.payload]
            }

        case GET_PETS:
            return{
                ...state,
                pets: action.payload
            }

        case ADD_ITEM:
            let newCart2 = state.cart.map(i => {
                if (i.id === action.payload && i.quantity < action.stock) {
                    return ({
                        ...i,
                        quantity: i.quantity + 1
                    })
                } else return i
            })
        localStorage.setItem(action.email, JSON.stringify(newCart2))
        return {
            ...state,
            cart: newCart2
        }

        case DELETE_ITEM:
            let newCart3 = state.cart.map(i => {
                if (i.id === action.payload && i.quantity > 1) {
                    return ({
                        ...i,
                        quantity: i.quantity - 1
                    })
                } else return i
            })
        localStorage.setItem(action.email, JSON.stringify(newCart3))
        return {
            ...state,
            cart: newCart3
        }

        case FILTER_PROVIDER_PRICE:
            return {
                ...state,
                filteredProviders: action.payload !== 'all' ?
                    state.providers.filter(p => action.payload === p.service[0]) : state.providers
            }

        case SORT_PROVIDER_PRICE:
            let sortService = [...state.filteredProviders]
        if (action.payload === 'ASC') {
            sortService.sort((a, b) => {
                if (a.price > b.price) return 1
                if (a.price < b.price) return -1
                return 0
            })
        }
        if (action.payload === 'DESC') {
            sortService.sort((a, b) => {
                if (a.price > b.price) return -1
                if (a.price < b.price) return 1
                return 0
            })
        }
        return {
            ...state,
            filteredProviders: sortService
        }

        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
            }

        default:
            return state;
    }
};

export default rootReducer;