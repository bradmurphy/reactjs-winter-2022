 const sortByKey = (list, key) => {
	return list.reduce((r, a) => {
        r[a[key]] = [...r[a[key]] || [], a];
        return r;
    }, {});
};

const addItemToCart = (item, state, dispatch, uid) => {
    const product = {
        ...item,
        uid: uid()
    };
    const cartItems = [ ...state.cart, product ];
    dispatch({ type: 'ADD_ITEM' , payload: cartItems});
};

const removeItem = (item, state, dispatch) => {
    const removedCartItems = state.cart.filter((i) => i.uid !== item.uid);
    dispatch({ type: 'REMOVE_ITEM', payload: removedCartItems });
}

export {
    addItemToCart,
    removeItem,
    sortByKey
}