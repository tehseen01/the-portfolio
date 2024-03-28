"use client";

import { useState, useEffect } from "react";

// Define a type alias for media query options
interface MediaQueryOptions {
  defaultValue?: boolean; // Default value to return on server-side rendering
  initializeWithValue?: boolean; // Whether to initialize reading the media query on mount (default: true)
}

export function useMediaQuery(
  query: string,
  options?: MediaQueryOptions
): boolean {
  const [matches, setMatches] = useState<boolean>(
    options?.defaultValue ?? false
  );

  useEffect(() => {
    // Check if we're on the server (no window object)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);

      if (options?.initializeWithValue !== false) {
        setMatches(media.matches); // Initialize with initial state
      }

      window.addEventListener("resize", listener);

      return () => window.removeEventListener("resize", listener);
    }

    // Return default value on server-side rendering
    return () => {};
  }, [query, options]);

  return matches;
}
