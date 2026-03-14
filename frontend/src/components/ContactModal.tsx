import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const MAX_MESSAGE = 255;
const PHONE_REGEX = /^(\+36|06)([ -]?\d){8,9}$/;

interface Props {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  apartmentTitle: string;
}

export default function ContactModal({
  open,
  onClose,
  name,
  email,
  apartmentTitle,
}: Props) {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  if (!open) return null;

  const validatePhone = (value: string) => {
    if (value && !PHONE_REGEX.test(value)) {
      setPhoneError("Érvénytelen telefonszám (pl. +36 30 123 4567)");
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    validatePhone(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_MESSAGE) setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneError) return;
    toast.success("Üzenet elküldve!");
    setMessage("");
    setPhone("");
    onClose();
  };

  const isSubmitDisabled = !message.trim() || !!phoneError;
  const charCount = message.length;
  const charCountColor =
    charCount >= MAX_MESSAGE
      ? "text-red-500"
      : charCount >= MAX_MESSAGE * 0.85
        ? "text-amber-500"
        : "text-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* fejléc */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Kapcsolatfelvétel</h2>
            <p className="text-sm text-gray-500">{apartmentTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X width={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* csak olvasható mezők */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Név</label>
              <input
                value={name}
                readOnly
                className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                value={email}
                readOnly
                className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* telefonszám */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Telefonszám <span className="text-gray-400">(opcionális)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+36 30 123 4567"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                phoneError
                  ? "border-red-400 focus:ring-red-300"
                  : "focus:ring-[#d2a995]"
              }`}
            />
            {phoneError && (
              <p className="text-xs text-red-500 mt-1">{phoneError}</p>
            )}
          </div>

          {/* üzenet */}
          <div>
            <div className="flex justify-between mb-1">
              <label
                htmlFor="contact-message"
                className="text-xs text-gray-500"
              >
                Üzenet
              </label>
              <span className={`text-xs ${charCountColor}`}>
                {charCount}/{MAX_MESSAGE}
              </span>
            </div>
            <textarea
              id="contact-message"
              value={message}
              onChange={handleMessageChange}
              required
              rows={4}
              placeholder="Írja ide üzenetét..."
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#d2a995]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full py-2.5 bg-[#d2a995] text-white rounded-lg hover:bg-[#c09a85] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Üzenet küldése
          </button>
        </form>
      </div>
    </div>
  );
}
