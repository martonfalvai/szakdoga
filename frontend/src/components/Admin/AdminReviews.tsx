import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { Trash2, Star, Check, X } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  renter_comment: string;
  owner_comment: string;
  created_at: string;
}

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/api/admin/reviews")
      .then(({ data }) => setReviews(data))
      .catch(() => toast.error("Nem sikerült betölteni az értékeléseket."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/admin/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Értékelés törölve.");
    } catch {
      toast.error("Törlés sikertelen.");
    } finally {
      setPendingDelete(null);
    }
  };

  if (loading) return <p className="text-gray-500">Betöltés...</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Értékelés</th>
            <th className="px-4 py-3 text-left">Bérlő megjegyzése</th>
            <th className="px-4 py-3 text-left">Tulajdonos megjegyzése</th>
            <th className="px-4 py-3 text-left">Dátum</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {reviews.map((review) => (
            <tr key={review.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-400">{review.id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-700 font-medium">{review.rating}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                {review.renter_comment}
              </td>
              <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                {review.owner_comment}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(review.created_at).toLocaleDateString("hu-HU")}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 justify-end">
                  {pendingDelete === review.id ? (
                    <>
                      <span className="text-xs text-gray-500">Biztosan?</span>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                        title="Igen, törlés"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setPendingDelete(null)}
                        className="p-1.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Mégsem"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setPendingDelete(review.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Törlés"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reviews.length === 0 && (
        <p className="text-center text-gray-400 py-10">Nincs megjeleníthető értékelés.</p>
      )}
    </div>
  );
};

export default AdminReviews;
