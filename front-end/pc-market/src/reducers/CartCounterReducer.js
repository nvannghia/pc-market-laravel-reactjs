const CartCounterReducer = (currentState, action) => {
    switch (action.type) {
        case "inc": 
        return currentState + action.payload.num;
        case "desc": 
        return currentState - action.payload.num;
    }

    return currentState;
}

export default CartCounterReducer