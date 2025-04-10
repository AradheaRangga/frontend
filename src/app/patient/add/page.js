"use client";
import React from "react";
import { TextInput, Radio, Label } from "flowbite-react";
import Layout from "@/components/layout";

export default function AddPatient() {
  const handleSubmit = async (e) => {
    const accessToken = localStorage.getItem("token");
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/add-patient`,
        {
          name,
          age,
          gender,
          address,
          phone,
          email,
        },
        {
          headers: {
            Authorization: `Beare ${accessToken}`,
          },
        }
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "penambahan pasien gagal");
    }
  };
  return (
    <>
      <div>
        <Layout></Layout>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="p-4 sm:ml-64 relative overflow-x-auto w-full rounded-lg shadow  border sm:max-w-md xl:p-0  bg-gray-700  border-gray-600">
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nama" className="text-white" />
              </div>
              <TextInput id="name" type="text" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="age" value="Umur" className="text-white" />
              </div>
              <TextInput id="age" type="text" sizing="md" />
            </div>
            <div>
              <legend className="mb-2">Pilih Jenis Kelamin Pasien</legend>

              <div className="flex flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="laki-laki" name="gender" value="laki-laki" />
                  <Label htmlFor="laki-laki" className="text-white">
                    Laki-laki
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="perempuan" name="gender" value="perempuan" />
                  <Label htmlFor="perempuan" className="text-white">
                    Perempuan
                  </Label>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="address"
                  value="Alamat pasien"
                  className="text-white"
                />
              </div>
              <TextInput id="adress" type="text" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" className="text-white" />
              </div>
              <TextInput id="email" type="text" sizing="md" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
