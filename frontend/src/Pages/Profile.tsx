import React, { useState } from "react";
import { useAuth } from "../hooks/authProvider";
import { Navigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import toast from "react-hot-toast";
import { User, Mail, Lock, Save } from "lucide-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, authLoading, updateUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [saving, setSaving] = useState(false);

  if (authLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password && password !== passwordConfirmation) {
      toast.error("A két jelszó nem egyezik.");
      return;
    }

    const payload: Record<string, string> = {};
    if (name !== user?.name) payload.name = name;
    if (password) {
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    if (Object.keys(payload).length === 0) {
      toast("Nincs változtatás.");
      return;
    }

    setSaving(true);
    try {
      const { data } = await axios.put("/api/user", payload);
      updateUser(data);
      toast.success("Profil mentve.");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]> } } };
      const errors = axiosErr.response?.data?.errors;
      if (errors) {
        Object.values(errors).flat().forEach((msg) => toast.error(msg));
      } else {
        toast.error("Mentés sikertelen.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf3ec] to-[#f0e0d0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#8b5e3c] text-white text-3xl font-bold flex items-center justify-center shadow-md">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#4a3425]">{user?.name}</h1>
          <p className="text-sm text-[#7c5a32]">{user?.email}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-[#e8d5c4] p-6 space-y-5"
        >
          <h2 className="text-base font-semibold text-[#4a3425] mb-1">Adatok szerkesztése</h2>

          {/* Név */}
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-[#5c4033] mb-1">Név</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b5e3c]" />
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#d2a995] bg-[#faf3ec] text-[#4a3425] text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>
          </div>

          {/* Email (disabled) */}
          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium text-[#5c4033] mb-1">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b5e3c]" />
              <input
                id="profile-email"
                type="email"
                value={user?.email ?? ""}
                disabled
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#d2a995] bg-[#e8d5c4] text-[#9e7a5a] text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <hr className="border-[#e8d5c4]" />

          {/* Jelszó */}
          <div>
            <label htmlFor="profile-password" className="block text-sm font-medium text-[#5c4033] mb-1">
              Új jelszó <span className="text-[#9e7a5a] font-normal">(opcionális)</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b5e3c]" />
              <input
                id="profile-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#d2a995] bg-[#faf3ec] text-[#4a3425] text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="profile-password-confirm" className="block text-sm font-medium text-[#5c4033] mb-1">Jelszó megerősítése</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b5e3c]" />
              <input
                id="profile-password-confirm"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#d2a995] bg-[#faf3ec] text-[#4a3425] text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#8b5e3c] text-white text-sm font-semibold hover:bg-[#6a3918] transition-colors disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Mentés..." : "Mentés"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
