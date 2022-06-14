export default function EachPurchase({ id, state, date, price, items }) {

    return (
        <>
            <h3>Comprobante #{id}</h3>
            <h4>Estado {state}</h4>
            <h4>Fecha de la compra {date.slice(0, 10)}</h4>
            <h4>Total: ${price}</h4>
            {items.map(i => {
                return <div>
                    <h5>x{i.quantity} </h5> <h5>{i.title}</h5>
                    <h5>Precio unitario: {i.unit_price}</h5>
                </div>
            })}
        </>
    )
}