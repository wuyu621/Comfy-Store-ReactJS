import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      // console.log(action.payload);

      const { product } = action.payload;
      // console.log(product);

      const item = state.cartItems.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("item added to cart");
    },

    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const { cartId } = action.payload;
      // console.log(cartId);

      //test if the item will be removed in the cart
      const removedProduct = state.cartItems.find((i) => i.cartId === cartId);
      console.log(removedProduct);

      //remove the removed item from the cartItems array
      state.cartItems = state.cartItems.filter(
        (i) => i.cartId !== cartId
        // if (i.cartId !== cartId) {
        //   console.log("keeping " + i.cartId);
        //   return false;
        // } else {
        //   console.log("removing " + i.cartId);
        //   return true;
        // }
      );

      // calculate the new numItemsInCart and cartTotal
      state.numItemsInCart -= removedProduct.amount;
      state.cartTotal -= removedProduct.amount * removedProduct.price;

      //calculate the new order total
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item was removed from cart");
    },

    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const editProduct = state.cartItems.find((i) => i.cartId === cartId);
      state.numItemsInCart += amount - editProduct.amount;
      state.cartTotal =
        state.cartTotal + editProduct.price * (amount - editProduct.amount);

      editProduct.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
