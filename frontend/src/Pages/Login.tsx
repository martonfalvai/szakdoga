import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowImage from "../components/ShowImage";

const Login: React.FC = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");

  // Axios interceptor beállítása az access token hozzáadásához
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  async function login() {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      // Mentsd el az access tokent
      const { access_token } = response.data;
      sessionStorage.setItem("access_token", access_token);

      // Állítsd be az axios default header-t
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function getUser() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/rents");
      console.log("User data:", response.data);
    } catch (error) {
      console.error("Get user error:", error);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-[#ffffffd9] to-[#ffffffd9] px-4 py-12 py-12 overflow-y-auto">
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
        <div className="text-center mb-10">
          <h2 className="mt-6 text-2xl font-bold text-[#5c4033]">
            Jelentkezz be!
          </h2>
          <p className="mt-2 text-sm text-[#5c4033]">
            Lépj be a fiókodba, és folytasd a kalandot!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#faf3ec] p-6 rounded-2xl shadow-md"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#5c4033] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Add meg az email címed"
              className="w-full px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#5c4033] mb-1"
              >
                Jelszó
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-semibold text-[#5c4033] hover:opacity-80"
              >
                Elfelejtetted a jelszót?
              </a>
            </div>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-2 rounded-md bg-[#d2a995] text-[#5c4033] placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#5c4033] text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
          >
            Bejelentkezés
          </button>
        </form>

        <button
          type="submit"
          onClick={getUser}
          className="w-full py-2 rounded-md bg-[#5c4033] text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5c4033]"
        >
          GETUSER
        </button>

        <p className="mt-6 text-center text-sm text-[#5c4033]">
          Még nem regisztráltál?{" "}
          <a
            href="/register"
            className="font-semibold text-[#5c4033] hover:opacity-80"
          >
            Próbáld ki 14 napig ingyen!
          </a>
        </p>

        <ShowImage />
      </div>
    </div>
  );
};

export default Login;
