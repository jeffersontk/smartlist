import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem[]) => void;
  removeItem: (itemId: string) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {},
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addItem = (items: CartItem[]) => {
    console.log("items", items);
    setItems((prevItems) => {
      const updatedItems = prevItems.map((prevItem) => {
        const newItem = items.find((item) => item.id === prevItem.id);
        if (newItem) {
          return {
            ...prevItem,
            quantity: newItem.quantity,
            price: newItem.price,
          };
        } else {
          return prevItem;
        }
      });
      const newItems = items.filter(
        (item) => !prevItems.some((prevItem) => prevItem.id === item.id)
      );
      return [...updatedItems, ...newItems];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  // Calculate the total price whenever the items change
  useEffect(() => {
    const newTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);

  const contextValue: CartContextType = {
    items,
    total,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
