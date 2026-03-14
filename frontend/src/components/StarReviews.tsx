import { StarIcon } from "lucide-react";

export const StarReviews = ({ rating }: { rating: number }) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <span
            key={`star-${index}`}
            style={{ position: "relative", display: "inline-block" }}
          >
            <StarIcon width={16} fill="none" stroke="darkgray" strokeWidth={1.5} />
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
                <StarIcon width={16} fill="gold" stroke="darkgray" strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </>
  );
};
