"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorChart = () => {
  const [sensorData, setSensorData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/sensor-data"
        );
        const data = response.data.sensorData;
        console.log(data);

        // Misalkan data berasal dari backend dengan struktur:
        // { heartRate, spO2, temperature, humidity }

        // Menyusun dataset berdasarkan data yang diterima
        setSensorData((prevData) => [
          ...prevData,
          {
            heartRate: data.heartRate || 0,
            spO2: data.spO2 || 0,
            temperature: data.temperature || 0,
            humidity: data.humidity || 0,
          },
        ]);

        // Label waktu (bisa gunakan timestamp jika data real-time)
        setLabels((prevLabels) => [
          ...prevLabels,
          new Date().toLocaleTimeString(),
        ]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    // Ambil data pertama kali
    fetchData();

    // Atur interval untuk update data setiap 5 detik
    const interval = setInterval(() => {
      fetchData(); // Panggil fungsi untuk mendapatkan data baru
    }, 5000); // Update setiap 5 detik

    // Bersihkan interval saat komponen dibersihkan
    return () => clearInterval(interval);
  }, []); // Array kosong artinya efek hanya dijalankan sekali setelah mount

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Heart Rate",
        data: sensorData.map((data) => data.heartRate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
      {
        label: "SpO2",
        data: sensorData.map((data) => data.spO2),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Temperature",
        data: sensorData.map((data) => data.temperature),
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Humidity",
        data: sensorData.map((data) => data.humidity),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Sensor",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
};

export default SensorChart;
