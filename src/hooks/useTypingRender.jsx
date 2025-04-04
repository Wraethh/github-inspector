import { useCallback, useEffect, useRef } from "react";

export default function useTypingRender(elements, texts) {
  const timeoutIds = useRef({});

  const type = useCallback(
    (ref, text, key, i = 50) => {
      if (text) {
        ref.textContent += text[0];
        return (timeoutIds.current[key] = setTimeout(() => {
          type(ref, text.slice(1), key, i-- < 15 ? i : i--);
        }, i));
      }
    },
    [timeoutIds]
  );

  useEffect(() => {
    timeoutIds.current = {};

    if (Object.values(elements.current).some((value) => !!value)) {
      for (const key in elements.current) {
        const ref = elements.current[key];
        if (ref) {
          ref.textContent = "";
          type(ref, texts[key], key);
        }
      }
    }

    return () => {
      for (const id of Object.values(timeoutIds.current)) {
        clearTimeout(id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
