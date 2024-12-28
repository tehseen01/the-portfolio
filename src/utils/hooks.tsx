"use client";

import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";

type Variants = "DEFAULT" | "PROJECT" | "BUTTON" | "TEXT";

interface ContextProps {
  variant: Variants;
  setVariant: Dispatch<SetStateAction<Variants>>;
}

const Context = createContext<ContextProps>({
  variant: "DEFAULT",
  setVariant: () => {},
});

const VariantProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<Variants>("DEFAULT");

  return (
    <Context.Provider value={{ variant, setVariant }}>
      {children}
    </Context.Provider>
  );
};

const useVariants = () => {
  const { setVariant, variant } = useContext(Context);

  return { variant, setVariant };
};

interface MediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

function useMediaQuery(query: string, options?: MediaQueryOptions): boolean {
  const [matches, setMatches] = useState<boolean>(
    options?.defaultValue ?? false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    if (options?.initializeWithValue !== false) {
      setMatches(media.matches); // Initialize with initial state
    }

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [query, options]);

  return matches;
}

export { useMediaQuery, useVariants, VariantProvider };
