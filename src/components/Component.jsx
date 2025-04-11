import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar, Sidebar } from "flowbite-react";
import {
  HiArrowCircleLeft,
  HiBookOpen,
  HiChartPie,
  HiViewBoards,
} from "react-icons/hi";
import Image from "next/image";

export default function Component() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleLogout = async () => {
    console.log("Logout button clicked");

    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        setMessage("Token tidak ditemukan. Silakan login kembali.");
        return;
      }
      setToken(accessToken);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      console.log("BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);

      // Call logout API
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-out`,
        {},
        config
      );

      // Clear token from localStorage
      localStorage.removeItem("token");

      // Update message and redirect after a successful logout
      setMessage("Logout berhasil! Mengarahkan ke halaman login");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      setMessage(error.response?.data?.message || "Logout gagal");
    }
  };

  return (
    <>
      <Navbar fluid rounded className="bg-gray-800">
        <Navbar.Brand href="/">
          <img
            src="/assets/logo_iotense.png"
            className="mr-3 h-6 sm:h-9"
            alt="IoTense Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            IoTense
          </span>
        </Navbar.Brand>
      </Navbar>

      <Sidebar
        className="[&>div]:bg-gray-800 fixed top-13 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex align-content-between flex-col"
        aria-label="sidebar with multi-level dropdown"
      >
        <Sidebar.ItemGroup className="space-y-2 font-medium flex-1 px-2">
          <Sidebar.Item
            href="/dashboard"
            icon={HiBookOpen}
            className="text-white hover:bg-gray-700"
          >
            Dashboard
          </Sidebar.Item>

          <Sidebar.Collapse
            icon={HiViewBoards}
            label="Patient"
            className="text-white hover:bg-gray-700"
          >
            <Sidebar.Item
              href="/patient"
              className="text-white hover:bg-gray-700"
            >
              Patient
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            href="/sensorData/chart"
            icon={HiChartPie}
            className="text-white hover:bg-gray-700"
          >
            Chart
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        {/* Logout Section */}
        <Sidebar.ItemGroup className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-white hover:bg-gray-700 flex items-center gap-2 p-2 rounded-lg"
          >
            <HiArrowCircleLeft className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </Sidebar.ItemGroup>

        {/* Message display */}
        {message && <div className="text-green-400 text-sm p-2">{message}</div>}
      </Sidebar>
    </>
  );
}
