import { ReviewType } from "./ReviewList";
import { StarReviews } from "./StarReviews";
import Badge from "./Badge";

const Bubble = ({ text, align }: { text: string; align: "left" | "right" }) => (
  <div
    className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[80%] text-sm px-4 py-2.5 rounded-2xl ${
        align === "right"
          ? "bg-[#d2a995] text-white rounded-tr-sm"
          : "bg-gray-100 text-gray-800 rounded-tl-sm"
      }`}
    >
      {text}
    </div>
  </div>
);

export default function Review({ review }: { review: ReviewType }) {
  return (
    <div className="border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{review.renter_name}</span>
          <Badge label="Bérlő" variant="renter" />
        </div>
        <div className="flex items-center gap-1">
          <StarReviews rating={review.rating} />
          <span className="text-xs text-gray-400 ml-1">
            {new Date(review.created_at).toLocaleDateString("hu-HU")}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Bubble text={review.renter_comment} align="left" />

        {review.owner_comment && (
          <>
            <div className="flex justify-end items-center gap-2">
              <span className="font-medium text-sm">{review.owner_name}</span>
              <Badge label="Tulajdonos" variant="owner" />
            </div>
            <Bubble text={review.owner_comment} align="right" />
          </>
        )}
      </div>
    </div>
  );
}
