"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddPatient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    bodyWeight: "",
    bodyHeight: "",
    bloodType: "",
    allergies: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/add-patient`,
        formData,
        config
      );

      setMessage("Patient added successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to add patient");
    }
  };

  return (
    <section className="min-h-screen p-8 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-6">Add New Patient</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          placeholder="Nama"
          onChange={handleChange}
          required
          className="p-2 rounded text-black"
        />
        <input
          name="age"
          placeholder="Umur"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <select
          name="gender"
          onChange={handleChange}
          className="p-2 rounded text-black"
        >
          <option value="">Pilih Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <input
          name="address"
          placeholder="Alamat"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <input
          name="bodyWeight"
          placeholder="Berat Badan"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <input
          name="bodyHeight"
          placeholder="Tinggi Badan"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <input
          name="bloodType"
          placeholder="Golongan Darah"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
        <input
          name="allergies"
          placeholder="Alergi"
          onChange={handleChange}
          className="p-2 rounded text-black"
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white col-span-1 md:col-span-2"
        >
          Submit
        </button>
        {message && <p className="text-sm col-span-2 text-center">{message}</p>}
      </form>
    </section>
  );
}
