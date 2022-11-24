import { createContext } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  return (
    <CartContex.Provider>
      {children}
    </CartContex.Provider>
  )
};
