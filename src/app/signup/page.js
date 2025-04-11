"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`,
        {
          email,
          password,
          name,
          phone,
        }
      );
      console.log(response.data);
      setMessage("Akun berhasil dibuat! Mengarahkan ke login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registrasi gagal");
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
          <h1 className="text-xl font-bold text-white md:text-2xl">
            Buat Akun Medical Care
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-white"
              >
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="08xxxxxxxxxx"
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
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-purple-600 hover:bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
            >
              Daftar
            </button>

            {message && (
              <p className="text-sm text-center text-red-500 mt-2">{message}</p>
            )}
          </form>

          {/* Link ke login */}
          <p className="text-sm font-light text-gray-300 text-center mt-4">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-400 hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
