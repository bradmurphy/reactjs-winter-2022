import React, {useContext} from 'react';
import { Context } from '../store/store';
import ShortUniqueId from 'short-unique-id';
import { addItemToCart } from '../utilities';

export default function Shop() {
    const [ state, dispatch ] = useContext(Context);
    const uid = new ShortUniqueId({length: 10});

    return (
        <div className="wrap">
            {state.products.map((product, i) => {
                const key = `product--${i}`;

                return (
                    <div className="item" key={key}>
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p>{product.desc}</p>
                        <strong>Price: {product.price}</strong>
                        <button onClick={() => addItemToCart(product, state, dispatch, uid)}>Add to Cart</button>
                    </div>
                )
            })}
        </div>
    )
};