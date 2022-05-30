import { TYPES } from '../actions/shoppingActions';
import axios from "axios";

export const shoppingInitialState = {
    // products: [
    //     // { id: 1, name: 'Product 1', price: 100, pic: 'https://pbs.twimg.com/media/DuqswVqW4AA3QVM.jpg:large' },
    //     // { id: 2, name: 'Product 2', price: 150, pic: 'https://pbs.twimg.com/media/DuqswVqW4AA3QVM.jpg:large' },
    //     // { id: 3, name: 'Product 3', price: 130, pic: 'https://pbs.twimg.com/media/DuqswVqW4AA3QVM.jpg:large' },
    //     // { id: 4, name: 'Product 4', price: 170, pic: 'https://pbs.twimg.com/media/DuqswVqW4AA3QVM.jpg:large' },
    //     // { id: 5, name: 'Product 5', price: 106, pic: 'https://pbs.twimg.com/media/DuqswVqW4AA3QVM.jpg:large' },
    //     // { id: 6, name: 'Product 6', price: 188, pic: 'https://pbs.twimg.com/media/DuqswVqW4AA3QVM.jpg:large' }
    // ],
    cart: []
};

export function shoppingReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {
            console.log('entré al reducer')
            // Buscamos id (pasado por payload) en el arreglo de productos y guardamos el producto que coincida con el id.
            axios.get('http://localhost:3001/products').then(x=>{
                const product = x.find( product => product.id === action.payload);
                console.log(product)
            })
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

        case TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find(item => item.id === action.payload);
            return itemToDelete.quantity > 1 ?
                {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload ?
                            {
                                ...item,
                                quantity: item.quantity - 1
                            } :
                            item
                    )
                } :
                {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload)
                }
        }

        case TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        }

        case TYPES.CLEAR_CART: {
            return shoppingInitialState;
        }

        default:
            return state;
    }
};