import { useLayoutEffect } from "react";

const useScrollToTop = () => {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
};

export default useScrollToTop;
