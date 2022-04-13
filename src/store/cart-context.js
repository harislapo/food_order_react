import React from 'react';

const CartContext = React.createContext({
  // For better auto completion
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
