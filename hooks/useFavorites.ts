"use client";

import { useState, useCallback, useEffect } from "react";
import type { FavoriteItem } from "@/lib/types";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorited,
} from "@/lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggle = useCallback(
    (packId: string, section: string, content: string) => {
      if (isFavorited(packId, section, content)) {
        const fav = getFavorites().find(
          (f) => f.packId === packId && f.section === section && f.content === content
        );
        if (fav) {
          removeFavorite(fav.id);
          setFavorites(getFavorites());
        }
      } else {
        addFavorite(packId, section, content);
        setFavorites(getFavorites());
      }
    },
    []
  );

  const isStarred = useCallback(
    (packId: string, section: string, content: string) =>
      isFavorited(packId, section, content),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favorites]
  );

  return { favorites, toggle, isStarred };
}
