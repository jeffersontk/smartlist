import { useContext } from "react";
import { createContext } from "react";

interface PriceContextType {
  price: number;
  setPrice: (newPrice: number) => void;
}

export const PriceContext = createContext<PriceContextType>({
  price: 0,
  setPrice: () => {},
});

export const usePrice = () => {
  const { price, setPrice } = useContext(PriceContext);

  return { price, setPrice };
};
