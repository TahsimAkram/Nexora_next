import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent the browser from restoring the previous position.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Reset the page and any Lenis-managed scroll position.
    window.scrollTo(0, 0);

    return undefined;
  }, [pathname]);
}
