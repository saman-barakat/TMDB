import { useEffect, useState } from "react";

/** True while the user is scrolling down past `offset`; false when scrolling up. */
export function useHideOnScroll(threshold = 10, offset = 80): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > threshold) {
        setHidden(y > lastY && y > offset);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, offset]);

  return hidden;
}
