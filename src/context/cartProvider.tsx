import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  /*  const [total, setTotal] = useState<number>(0); */

  const addItem = (items: CartItem[]) => {
    setItems((prevItems) => {
      items.forEach((newItem) => {
        const index = prevItems.findIndex(
          (prevItem) => prevItem.id === newItem.id
        );
        if (index !== -1) {
          prevItems[index] = newItem;
        } else {
          prevItems.push(newItem);
        }
      });
      return [...prevItems];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  /*   // Calculate the total price whenever the items change
  useEffect(() => {
    const newTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]); */

  const total = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
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
