import { StarIcon } from "lucide-react";
import Review from "./Review";

export interface ReviewType {
  rating: number;
  renter_comment: string;
  owner_comment: string;
  created_at: string;
  renter_name: string;
  owner_name: string;
}

export interface Props {
  reviews: ReviewType[];
  averageRating: number;
}

const ReviewList = ({ reviews, averageRating }: Props) => {
  if (reviews.length === 0)
    return (
      <div className="border rounded-xl p-6 text-gray-500 text-sm">
        Még nincsenek értékelések.
      </div>
    );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Értékelések</h2>
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <StarIcon
            width={14}
            fill="gold"
            stroke="darkgray"
            strokeWidth={1.5}
          />
          {averageRating} · {reviews.length} értékelés
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <Review review={review} key={review.renter_name} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
