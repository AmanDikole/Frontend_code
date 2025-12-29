import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex text-yellow-400 text-sm">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < fullStars ? (
            <FaStar />
          ) : i === fullStars && hasHalfStar ? (
            <FaStarHalfAlt />
          ) : (
            <FaStar className="text-gray-300" />
          )}
        </span>
      ))}
    </div>
  );
}