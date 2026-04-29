import React, { useState } from "react";
import { Heart } from "lucide-react";

const CardRating = ({ cardText, onRate }) => {
  const [rated, setRated] = useState(false);

  const handleRate = (rating) => {
    if (rated) return;
    setRated(true);
    onRate?.(cardText, rating);

    // Save to localStorage
    const ratings = JSON.parse(localStorage.getItem("cardRatings") || "{}");
    ratings[cardText] = rating;
    localStorage.setItem("cardRatings", JSON.stringify(ratings));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCards") || "[]");
    const newFavorites = favorites.includes(cardText)
      ? favorites.filter((c) => c !== cardText)
      : [...favorites, cardText];
    localStorage.setItem("favoriteCards", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCards") || "[]");
    return favorites.includes(cardText);
  });

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={() => handleRate("funny")}
        disabled={rated}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
          rated
            ? "opacity-40 cursor-not-allowed"
            : "border-zinc-800 hover:border-cyan-900/50 hover:text-cyan-700"
        }`}
      >
        <span className="text-lg">😂</span>
        <span className="text-[9px] uppercase tracking-wider">Funny</span>
      </button>

      <button
        onClick={() => handleRate("intense")}
        disabled={rated}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
          rated
            ? "opacity-40 cursor-not-allowed"
            : "border-zinc-800 hover:border-red-900/50 hover:text-red-700"
        }`}
      >
        <span className="text-lg">🔥</span>
        <span className="text-[9px] uppercase tracking-wider">Intense</span>
      </button>

      <button
        onClick={() => handleRate("skip")}
        disabled={rated}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
          rated
            ? "opacity-40 cursor-not-allowed"
            : "border-zinc-800 hover:border-zinc-700 hover:text-zinc-400"
        }`}
      >
        <span className="text-lg">⏭️</span>
        <span className="text-[9px] uppercase tracking-wider">Meh</span>
      </button>

      <button
        onClick={toggleFavorite}
        className={`ml-4 p-2 rounded-full border transition-all ${
          isFavorite
            ? "border-red-900 bg-red-900/20 text-red-700"
            : "border-zinc-800 hover:border-red-900/50 hover:text-red-700"
        }`}
      >
        <Heart
          size={14}
          strokeWidth={1}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};

export default CardRating;
