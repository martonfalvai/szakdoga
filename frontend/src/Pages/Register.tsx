import React, { useState } from "react";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Egyszerű validáció
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    if (!terms) {
      alert("El kell fogadnod a szabályzatot!");
      return;
    }

    console.log("Registration successful:", { firstName, lastName, email, phone });
    alert("Sikeres regisztráció!");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4 py-12 overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[600px] h-64 bg-[#edc59d]/30 rounded-[100%]" />
        <div className="absolute -top-20 left-40 w-[500px] h-56 bg-[#d2a995]/25 rounded-[100%]" />
        <div className="absolute -top-24 right-0 w-[400px] h-60 bg-[#c49080]/20 rounded-[100%]" />
        <div className="absolute -bottom-32 -left-20 w-[600px] h-64 bg-[#edc59d]/30 rounded-[100%]" />
        <div className="absolute -bottom-20 left-60 w-[500px] h-56 bg-[#d2a995]/25 rounded-[100%]" />
        <div className="absolute -bottom-24 -right-10 w-[450px] h-60 bg-[#c49080]/20 rounded-[100%]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#edc59d]/15 rounded-full blur-2xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#d2a995]/15 rounded-full blur-2xl" />
      </div>
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h2 className="mt-6 text-2xl font-bold text-[#5c4033]">
            Regisztrálj most!
          </h2>
          <p className="mt-2 text-sm text-[#5c4033]">
            Hozz létre egy fiókot, és kezd el használni az alkalmazást!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#f9f5f1] p-6 rounded-2xl shadow-md">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#5c4033] mb-1">
              Keresztnév
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Add meg a keresztneved"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#5c4033] mb-1">
              Vezetéknév
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Add meg a vezetékneved"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#5c4033] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Add meg az email címed"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#5c4033] mb-1">
              Telefonszám
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Add meg a telefonszámod"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5c4033] mb-1">
              Jelszó
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Adj meg egy jelszót"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5c4033] mb-1">
              Jelszó megerősítése
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Erősítsd meg a jelszavad"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="h-4 w-4 text-[#5c4033] border-gray-300 rounded focus:ring-[#5c4033]"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-[#5c4033]">
              Elfogadom a <a href="#" className="underline">Szabályzatot</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5c4033] text-white py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
          >
            Regisztráció
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;