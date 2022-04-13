import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsBumped, setBtnIsBumped] = useState(false);

  const cartCtx = useContext(CartContext);

  // Pull items array from the context in order to monitor changes in useEffect
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currentNumber, currentItem) => {
    return currentNumber + currentItem.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ''}`;

  // Add 'bump' class to cart button whenever an item has been added to the cart
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsBumped(true);

    // Remove 'bump' class
    const timer = setTimeout(() => {
      setBtnIsBumped(false);
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.clicked}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
