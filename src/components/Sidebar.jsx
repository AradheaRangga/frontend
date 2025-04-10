"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-out`
      );
      setMessage("Logout berhasil! Mengarahkan...");
      router.push("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Logout gagal");
    }
  };
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex flex-col"
        aria-label="Sidebar"
      >
        <div className=" sidebar  h-full px-2 py-4 overflow-y-auto bg-gray-800 flex flex-col">
          <a href="#" className="flex items-center mt-5 mb-8">
            <Image
              className="me-1"
              src="/assets/logo_iotense.png"
              width={40}
              height={40}
              alt="IoTense Logo"
            />
            <span className="text-end text-4xl font-semibold whitespace-nowrap text-white">
              IoTense
            </span>
          </a>
          <ul className="space-y-2 font-medium flex-1 px-2">
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/patient"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Patient</span>
              </a>
            </li>
            {/* Tambahkan menu lain di sini */}
          </ul>
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1 1 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
              </svg>
              <form onSubmit={handleSubmit}>
                <button type="submit" className="flex-1 ms-3 whitespace-nowrap">
                  Sign out
                </button>
                {message && (
                  <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                  >
                    <span className="font-medium"> {message}</span>
                  </div>
                )}
              </form>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
