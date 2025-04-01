import { useEffect, useState } from "react";

export default function useResizeObserver(elementRef, property) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setValue(entry.contentRect[property]);
      }
    });
    ro.observe(element);

    return () => {
      ro.disconnect();
    };
  }, [elementRef, property]);

  return value;
}
