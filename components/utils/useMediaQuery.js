import { useEffect, useState } from "react";

export function useIsMd() {
  return useMediaQuery("(min-width: 768px)");
}
export function useIsLg() {
  return useMediaQuery("(min-width: 1024px)");
}
export function useIsLandscape() {
  return useMediaQuery("(orientation: landscape)");
}

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
