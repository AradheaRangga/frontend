"use client";
import { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Dashboard() {
  const router = useRouter();
  const [patient, setPatient] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      router.push("/login");
    }
    setToken(accessToken);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, config)
      .then((response) => {
        setPatient(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response.status === 401) {
          router.push("/login");
        }
      });
  }, [router]);
  return (
    <>
      <div className="layout">
        <Layout></Layout>
      </div>

      <div className="content p-4 sm:ml-64 relative overflow-x-auto">
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
            {patient.length > 0 ? (
              patient.map((item, index) => (
                <tr key={patient.id} className="bg-gray-800 border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap"
                  >
                    {item.address}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap"
                  >
                    <button className="text-blue-500 hover:underline">
                      {" "}
                      View{" "}
                    </button>
                  </th>
                </tr>
              ))
            ) : (
              <h1>No Data</h1>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
