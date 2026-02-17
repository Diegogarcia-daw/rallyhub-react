import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {

        const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {

        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }

      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };


  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };


  const clearCart = () => setCart([]);


  const totalCart = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);


  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};