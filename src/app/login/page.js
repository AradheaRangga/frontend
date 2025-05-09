"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`,
        {
          email,
          password,
        }
      );

      const token = response.data.data.accessToken;
      if (!token) {
        setMessage("Token tidak ditemukan. Silakan login kembali.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      setMessage("Login berhasil! Mengarahkan...");
      router.push("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-800 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo IoTense */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/assets/logo_iotense.png"
          width={80}
          height={80}
          alt="IoTense Logo"
        />
        <span className="text-white text-2xl font-semibold mt-2">IoTense</span>
      </div>

      <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-gray-700 border-gray-600">
        <div className="p-6 sm:p-8 space-y-4">
          <h1 className="text-xl font-bold text-white md:text-2xl text-center">
            Masuk ke akun Medical Care
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 placeholder-gray-400"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white bg-purple-600 hover:bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Memproses..." : "Sign In"}
            </button>

            {/* Pesan error/sukses */}
            {message && (
              <p className="text-sm text-red-500 mt-2 text-center">{message}</p>
            )}
          </form>

          {/* Link ke halaman Sign Up */}
          <p className="text-sm font-light text-gray-300 text-center mt-4">
            Belum punya akun?{" "}
            <Link
              href="/signup"
              className="font-medium text-purple-400 hover:underline"
            >
              Daftar di sini
            </Link>
          </p>

          {/* Tombol menuju halaman Add Patient */}
          <div className="text-center mt-4">
            <Link href="/add-patient">
              <button className="bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg text-sm px-4 py-2">
                ➕ Tambah Pasien
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
