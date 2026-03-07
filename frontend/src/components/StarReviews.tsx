import { StarIcon } from "lucide-react";
import { Apartment } from "../types";

export const StarReviews = ({ apartment }: { apartment: Apartment }) => {
  const rating = apartment.rating;

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <span
            key={apartment.rating + index}
            style={{ position: "relative", display: "inline-block" }}
          >
            {/* Üres csillag (háttér) */}
            <StarIcon
              width={16}
              fill="none"
              stroke="darkgray"
              strokeWidth={1.5}
            />

            {/* Kitöltött rész */}
            {fillPercentage > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${fillPercentage}%`,
                  overflow: "hidden",
                }}
              >
                <StarIcon
                  width={16}
                  fill="gold"
                  stroke="darkgray"
                  strokeWidth={1.5}
                />
              </span>
            )}
          </span>
        );
      })}
    </>
  );
};
