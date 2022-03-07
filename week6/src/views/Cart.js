import React, {useContext} from 'react';
import { Context } from '../store/store';
import ShortUniqueId from 'short-unique-id';
import { addItemToCart, removeItem, sortByKey } from '../utilities';


export default function Home() {
    const [ state, dispatch ] = useContext(Context);
    const visualCart = sortByKey(state.cart, 'title');
    const uid = new ShortUniqueId({length: 10});

    return (
        <div className="wrap">
            {Object.entries(visualCart).map((p, i) => {
                const key = `cart-item--${i}`;
                const product = p[1][0];

                return (
                    <div className="item" key={key}>
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p>{product.desc}</p>
                        <strong>Price: {product.price}</strong>
                        <span>x {p[1].length}</span>
                        <button onClick={() => removeItem(product, state, dispatch)}>- Remove</button>
                        <button onClick={() => addItemToCart(product, state, dispatch, uid)}>+ Add</button>
                    </div>
                )
            })}
        </div>
    )
};