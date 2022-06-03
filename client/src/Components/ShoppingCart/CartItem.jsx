import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/petshopActions";

const CartItem = ({ name, image, price, quantity, id }) => {
    const { user } = useAuth0()
    const dispatch = useDispatch()

    const delFromCart = (id) => {

        dispatch(removeFromCart(id, user.email))
    }
    return (
        <div>
            <div style={{ borderBottom: "thin solid gray" }}>
                <img src={image} alt="Pet App" width="150" height="200" />
                <h4>{name}</h4>
                <h5>precio x 1un. ${price}.00</h5>
                <h5>total: x {quantity}un. ${price * quantity}.00</h5>
                <button onClick={() => delFromCart(id)}>X</button>
            </div>
        </div>
    )
};

export default CartItem;