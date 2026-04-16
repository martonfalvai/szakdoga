import React, { useState } from "react";
import { useAuth } from "../hooks/authProvider";
import { Navigate } from "react-router-dom";
import { LayoutList, Users, CalendarCheck, Star } from "lucide-react";
import AdminRents from "../components/Admin/AdminRents";
import AdminUsers from "../components/Admin/AdminUsers";
import AdminRentings from "../components/Admin/AdminRentings";
import AdminReviews from "../components/Admin/AdminReviews";

type Section = "rents" | "users" | "rentings" | "reviews";

const sections: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: "rents", label: "Hirdetések", icon: <LayoutList size={18} /> },
  { key: "users", label: "Felhasználók", icon: <Users size={18} /> },
  { key: "rentings", label: "Bérlések", icon: <CalendarCheck size={18} /> },
  { key: "reviews", label: "Értékelések", icon: <Star size={18} /> },
];

const Admin: React.FC = () => {
  const { user, isAuthenticated, authLoading } = useAuth();
  const [active, setActive] = useState<Section>("rents");

  if (authLoading) return null;

  if (!isAuthenticated || user?.role !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col pt-8">
        <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Admin panel
        </p>
        <nav className="flex flex-col gap-1 px-3">
          {sections.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === key
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Tartalom */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {sections.find((s) => s.key === active)?.label}
        </h1>

        {active === "rents" && <AdminRents />}
        {active === "users" && <AdminUsers />}
        {active === "rentings" && <AdminRentings />}
        {active === "reviews" && <AdminReviews />}
      </main>
    </div>
  );
};

export default Admin;
