import React, {useContext} from 'react';
import { Context } from '../store/store';

export default function Home() {
    const [ state, dispatch ] = useContext(Context);
    const removeItem = (item) => dispatch({ type: 'REMOVE_ITEM', payload: item });

    return (
        <div className="wrap">
            {state.cart.map((product, i) => {
                const key = `cart-item--${i}`;

                return (
                    <div className="item" key={key}>
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p>{product.desc}</p>
                        <strong>Price: {product.price}</strong>
                        <button onClick={() => removeItem(product)}>Remove</button>
                    </div>
                )
            })}
        </div>
    )
};