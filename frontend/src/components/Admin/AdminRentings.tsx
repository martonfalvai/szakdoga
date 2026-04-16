import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { Trash2, Check, X } from "lucide-react";

interface Renting {
  id: number;
  rents_id: number;
  renter: number;
  renter_name: string;
  owner: number;
  owner_name: string;
  price: number;
  rented_from: string;
  rented_until: string;
}

const AdminRentings: React.FC = () => {
  const [rentings, setRentings] = useState<Renting[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/api/admin/rentings")
      .then(({ data }) => setRentings(data))
      .catch(() => toast.error("Nem sikerült betölteni a bérléseket."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/admin/rentings/${id}`);
      setRentings((prev) => prev.filter((r) => r.id !== id));
      toast.success("Bérlés törölve.");
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
            <th className="px-4 py-3 text-left">Hirdetés ID</th>
            <th className="px-4 py-3 text-left">Bérlő</th>
            <th className="px-4 py-3 text-left">Tulajdonos</th>
            <th className="px-4 py-3 text-left">Ár</th>
            <th className="px-4 py-3 text-left">Időszak</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rentings.map((renting) => (
            <tr key={renting.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-400">{renting.id}</td>
              <td className="px-4 py-3 text-gray-600">#{renting.rents_id}</td>
              <td className="px-4 py-3 text-gray-600">{renting.renter_name} <span className="text-gray-400 text-xs">(#{renting.renter})</span></td>
              <td className="px-4 py-3 text-gray-600">{renting.owner_name} <span className="text-gray-400 text-xs">(#{renting.owner})</span></td>
              <td className="px-4 py-3 text-gray-600">
                {renting.price.toLocaleString()} Ft
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(renting.rented_from).toLocaleDateString("hu-HU")} –{" "}
                {new Date(renting.rented_until).toLocaleDateString("hu-HU")}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 justify-end">
                  {pendingDelete === renting.id ? (
                    <>
                      <span className="text-xs text-gray-500">Biztosan?</span>
                      <button
                        onClick={() => handleDelete(renting.id)}
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
                      onClick={() => setPendingDelete(renting.id)}
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
      {rentings.length === 0 && (
        <p className="text-center text-gray-400 py-10">Nincs megjeleníthető bérlés.</p>
      )}
    </div>
  );
};

export default AdminRentings;
