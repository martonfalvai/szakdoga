import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { Trash2, Check, X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  created_at: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/api/admin/users")
      .then(({ data }) => setUsers(data))
      .catch(() => toast.error("Nem sikerült betölteni a felhasználókat."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("Felhasználó törölve.");
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
            <th className="px-4 py-3 text-left">Név</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Szerep</th>
            <th className="px-4 py-3 text-left">Regisztrálva</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-400">{user.id}</td>
              <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
              <td className="px-4 py-3 text-gray-600">{user.email}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 1
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {user.role === 1 ? "Admin" : "Felhasználó"}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(user.created_at).toLocaleDateString("hu-HU")}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 justify-end">
                  {pendingDelete === user.id ? (
                    <>
                      <span className="text-xs text-gray-500">Biztosan?</span>
                      <button
                        onClick={() => handleDelete(user.id)}
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
                      onClick={() => setPendingDelete(user.id)}
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
      {users.length === 0 && (
        <p className="text-center text-gray-400 py-10">Nincs megjeleníthető felhasználó.</p>
      )}
    </div>
  );
};

export default AdminUsers;
