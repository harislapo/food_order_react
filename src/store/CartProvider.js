import { useReducer } from 'react';
import CartContext from './cart-context';

// Initalize starting cart state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ITEM-ADDED') {
    // Update the old total amount with the price of the newly added item/s
    const updatedTotalAmount =
      state.totalAmount + action.itemAdded.price * action.itemAdded.amount;

    // Check if the item exists in the cart already
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.itemAdded.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // If found, update its amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.itemAdded.amount,
      };

      // Copy the existing cart items array
      updatedItems = [...state.items];
      // Overwrite the array with the new updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Add item to an array in an immutable way
      updatedItems = state.items.concat(action.itemAdded);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'ITEM-REMOVED') {
    // Find the item's index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.itemRemovedId
    );

    const existingItem = state.items[existingCartItemIndex];

    // Substract the item's price from the total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    // Check if the amount is 1, if true remove it completely from the cart
    if (existingItem.amount === 1) {
      // Return all items that don't have the id of the item that's about to be removed
      updatedItems = state.items.filter(
        (item) => item.id !== action.itemRemovedId
      );
    } else {
      // Copy the found item, decrease its amount by 1
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      // Copy items array
      updatedItems = [...state.items];
      // Update copied array with the new updated item 
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ITEM-ADDED', itemAdded: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'ITEM-REMOVED', itemRemovedId: id });
  };

  // Helper constant to initialize starting value of provider component
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
