import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { Trash2, Star, Check, X } from "lucide-react";

interface Rent {
  id: number;
  title: string;
  city: string;
  price: number;
  currency: string;
  status: string;
  highlighted: string | null;
}

const AdminRents: React.FC = () => {
  const [rents, setRents] = useState<Rent[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  const fetchRents = async () => {
    try {
      const { data } = await axios.get("/api/admin/rents");
      setRents(data);
    } catch {
      toast.error("Nem sikerült betölteni a hirdetéseket.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/admin/rents/${id}`);
      setRents((prev) => prev.filter((r) => r.id !== id));
      toast.success("Hirdetés törölve.");
    } catch {
      toast.error("Törlés sikertelen.");
    } finally {
      setPendingDelete(null);
    }
  };

  const handleHighlight = async (id: number, isHighlighted: boolean) => {
    try {
      await axios.patch(`/api/admin/rents/${id}/highlight`);
      setRents((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                highlighted: isHighlighted ? null : new Date().toISOString(),
              }
            : r,
        ),
      );
      toast.success(
        isHighlighted ? "Kiemelés eltávolítva." : "Hirdetés kiemelve.",
      );
    } catch {
      toast.error("Művelet sikertelen.");
    }
  };

  if (loading) return <p className="text-gray-500">Betöltés...</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Cím</th>
            <th className="px-4 py-3 text-left">Város</th>
            <th className="px-4 py-3 text-left">Ár</th>
            <th className="px-4 py-3 text-left">Státusz</th>
            <th className="px-4 py-3 text-left">Kiemelve</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rents.map((rent) => (
            <tr key={rent.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-400">{rent.id}</td>
              <td className="px-4 py-3 font-medium text-gray-800">
                {rent.title}
              </td>
              <td className="px-4 py-3 text-gray-600">{rent.city}</td>
              <td className="px-4 py-3 text-gray-600">
                {rent.price.toLocaleString()} {rent.currency}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    rent.status === "available"
                      ? "bg-green-100 text-green-700"
                      : rent.status === "rented"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {rent.status == "available" ? "Elérhető" : "Bérelt"}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {rent.highlighted
                  ? new Date(rent.highlighted).toLocaleDateString("hu-HU")
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 justify-end">
                  {pendingDelete === rent.id ? (
                    <>
                      <span className="text-xs text-gray-500">Biztosan?</span>
                      <button
                        onClick={() => handleDelete(rent.id)}
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
                    <>
                      <button
                        onClick={() =>
                          handleHighlight(rent.id, !!rent.highlighted)
                        }
                        className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-colors"
                        title={
                          rent.highlighted
                            ? "Kiemelés eltávolítása"
                            : "Kiemelés"
                        }
                      >
                        {rent.highlighted ? (
                          <Star size={16} fill="gold" />
                        ) : (
                          <Star size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => setPendingDelete(rent.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Törlés"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rents.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          Nincs megjeleníthető hirdetés.
        </p>
      )}
    </div>
  );
};

export default AdminRents;
