import { createSlice } from "@reduxjs/toolkit";
import { notification } from 'antd';

const initialState = {
    cartItems:
        localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                notification.info({
                    message: `increased ${state.cartItems[itemIndex].name} quantity`,
                    placement: 'bottomLeft',
                    duration: 2
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                notification.success({
                    message: `${action.payload.name} added to cart`,
                    placement: 'bottomLeft',
                    duration: 2
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            state.cartItems = nextCartItems;
            notification.warning({
                message: `${action.payload.name} removed from cart`,
                placement: 'bottomLeft',
                duration: 2
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        incrementCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
            state.cartItems[itemIndex].cartQuantity += 1
            notification.info({
                message: `increased ${state.cartItems[itemIndex].name} quantity`,
                placement: 'bottomLeft',
                duration: 2
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        decrementCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                notification.info({
                    message: `decreased ${state.cartItems[itemIndex].name} quantity`,
                    placement: 'bottomLeft',
                    duration: 2
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
                state.cartItems = nextCartItems;
                notification.warning({
                    message: `${action.payload.name} removed from cart`,
                    placement: 'bottomLeft',
                    duration: 2
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart(state, action) {
            state.cartItems = []
            notification.warning({
                message: 'cleared cart',
                placement: 'bottomLeft',
                duration: 2
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                }
            )
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total
        }
    }
})

export const { addToCart, removeFromCart, incrementCart, decrementCart, clearCart, getTotals } = cartSlice.actions

export default cartSlice.reducer