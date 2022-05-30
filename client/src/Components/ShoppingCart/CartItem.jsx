const cartItem = ({name, image}) => {
    // let { id, name, price, pic, quantity } = data;

    return (
        <div style={{borderBottom: "thin solid gray"}}>
            
            <img src={image} alt="Pet App" width="150" height="200"/>
            <h4>{name}</h4>
            {/* <h5>${price}.00 x {quantity} = {price * quantity}.00</h5> */}
            {/* <button onClick={() => delFromCart(id)}>Eliminar Uno</button>
            <br />
            <button onClick={() => delFromCart(id, true)}>Eliminar Todos</button>
            <br/><br/> */}
        </div>
    )
};

export default cartItem;