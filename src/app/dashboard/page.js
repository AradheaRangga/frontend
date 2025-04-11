"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";

export default function Dashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      router.push("/login");
      return;
    }

    setToken(accessToken);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/get-all-patient`,
        config
      )
      .then((response) => {
        setPatients(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          router.push("/login");
        }
      });
  }, [router]);

  return (
    <>
      <div className="layout">
        <Layout />
      </div>

      <div className="content p-4 sm:ml-64 relative overflow-x-auto">
        {/* Tombol Add Patient */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/patient/add")}
            className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-4 rounded-lg"
          >
            + Add Patient
          </button>
        </div>

        <table className="w-full text-sm text-center rtl:text-right text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((item, index) => (
                <tr key={item.id} className="bg-gray-800 border-gray-700">
                  <th className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-white">{item.name}</td>
                  <td className="px-6 py-4 text-white">{item.address}</td>
                  <td className="px-6 py-4 text-white">
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-white py-4 text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
