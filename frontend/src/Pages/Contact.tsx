import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../api/axiosConfig";

const MAX_MESSAGE = 500;
const PHONE_REGEX = /^(\+36|06)([ -]?\d){8,9}$/;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhone = (value: string) => {
    if (value && !PHONE_REGEX.test(value)) {
      setPhoneError("Érvénytelen telefonszám (pl. +36 30 123 4567)");
    } else {
      setPhoneError("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      validatePhone(value);
    }

    if (name === "message" && value.length > MAX_MESSAGE) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phoneError || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Töltsd ki az összes mezőt helyesen!");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      toast.success("Üzenet sikeresen elküldve!");
      setFormData({
        name: "",
        email: "",
        message: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Hiba az üzenet küldése során!");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = !formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !!phoneError || loading;
  const charCount = formData.message.length;
  const charCountColor =
    charCount >= MAX_MESSAGE
      ? "text-red-500"
      : charCount >= MAX_MESSAGE * 0.85
        ? "text-amber-500"
        : "text-gray-400";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f0] to-[#f5ede6] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Fejléc */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#6a3918] mb-3">Kapcsolat</h1>
          <p className="text-gray-600">Lépj velünk kapcsolatba bármilyen kérdésben vagy megjegyzésben!</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Név */}
            <div>
              <label className="block text-sm font-semibold text-[#6a3918] mb-2">
                Név *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Teljes neved"
                className="w-full border-2 border-[#e0d5cc] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8b5e3c] transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#6a3918] mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border-2 border-[#e0d5cc] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8b5e3c] transition"
                required
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-semibold text-[#6a3918] mb-2">
                Telefonszám <span className="font-normal text-gray-500">(opcionális)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+36 30 123 4567"
                className={`w-full border-2 rounded-lg px-4 py-3 text-sm focus:outline-none transition ${
                  phoneError
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#e0d5cc] focus:border-[#8b5e3c]"
                }`}
              />
              {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
            </div>

            {/* Üzenet */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-[#6a3918]">
                  Üzenet *
                </label>
                <span className={`text-xs ${charCountColor}`}>
                  {charCount}/{MAX_MESSAGE}
                </span>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Írd ide az üzeneted..."
                rows={6}
                className="w-full border-2 border-[#e0d5cc] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#8b5e3c] transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full py-3 bg-gradient-to-r from-[#8b5e3c] to-[#6a3918] text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Küldés..." : "Üzenet küldése"}
            </button>
          </form>
        </div>

        {/* Elérhetőségek */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#d2a995] to-[#8b5e3c] rounded-full flex items-center justify-center">
              <Mail className="text-white" width={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[#6a3918] mb-1">Email</h3>
              <a
                href="mailto:info@mapuma.hu"
                className="text-[#8b5e3c] hover:text-[#6a3918] transition"
              >
                info@mapuma.hu
              </a>
            </div>
          </div>

          {/* Telefon */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#d2a995] to-[#8b5e3c] rounded-full flex items-center justify-center">
              <Phone className="text-white" width={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[#6a3918] mb-1">Telefon</h3>
              <a
                href="tel:+36123237582"
                className="text-[#8b5e3c] hover:text-[#6a3918] transition"
              >
                +36 1 233 7582
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
