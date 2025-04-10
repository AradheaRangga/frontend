"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.data.accessToken);
      setMessage("Login berhasil! Mengarahkan...");
      router.push("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <>
      <section className="bg-gray-800 min-h-screen flex flex-col items-center ">
        <Image
          className="mt-28"
          src="/assets/logo_iotense.png"
          width={100}
          height={100}
          alt="IoTense Logo"
        ></Image>
        <span
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white "
        >
          IoTense
        </span>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow  border sm:max-w-md xl:p-0  bg-gray-700  border-gray-600">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-50 md:text-2xl">
                Sign in to your Medical care
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-50"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  placeholder-gray-400"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-50"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  placeholder-gray-400"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-primary-600  hover:bg-primary-700 mt-8"
                >
                  Sign in
                </button>
                {message && (
                  <p className="text-sm text-red-500 mt-2">{message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
