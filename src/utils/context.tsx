"use  client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Variants = "DEFAULT" | "LINK" | "TEXT" | "PROJECT" | "BUTTON" | "NONE";
interface ContextProps {
  variant: Variants;
  setVariant: Dispatch<SetStateAction<Variants>>;
}

const Context = createContext<ContextProps>({
  setVariant: () => {},
  variant: "DEFAULT",
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<Variants>("DEFAULT");

  return (
    <Context.Provider value={{ variant, setVariant }}>
      {children}
    </Context.Provider>
  );
};

export const useCursorVariants = () => {
  return useContext(Context);
};
