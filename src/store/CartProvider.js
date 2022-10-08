import CartContext from "./cartContext";
import React, { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case "REMOVE_CART_ITEM": {
      //Index of state using id of state item that matches sent action id, returns a single integer (index)
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      //Returns value of item of state object using index - id, name, amount, price
      const existingItem = state.items[existingCartItemIndex];

      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;
      if (existingItem.amount === 1) {
        // Returns an array using array.filter method; item is object with (id, name, amount, price); action returns single string id
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        // Single out the item that needs its amount subtracted by 1
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        // Create an array of state items
        updatedItems = [...state.items];
        // Update array of state items with singled out item with updated amount (-1)
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems, // array of updated objects
        totalAmount: updatedTotalAmount, // integer
      };
    }

    case "CLEAR": {
      return defaultCartState;
    }

    default:
      throw new Error();
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  const clearCarthandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCarthandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
