"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import Layout from "@/components/layout";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorChart = () => {
  const [sensorData, setSensorData] = useState({});

  // Data dummy jika data kosong
  const dummyData = {
    Dummy001: {
      spO2: 0,
      temperature: 0,
      bpm: 0,
      skinResponse: 0,
    },
    Dummy002: {
      spO2: 0,
      temperature: 0,
      bpm: 0,
      skinResponse: 0,
    },
  };

  // Ambil data dari API dengan Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/sensor-data"
        );
        const newData = response.data.sensorData.reduce((acc, item) => {
          acc[item.id] = item; // Gunakan ID sebagai kunci
          return acc;
        }, {});
        setSensorData((prevData) => ({ ...prevData, ...newData }));
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setSensorData(dummyData);
      }
    };

    // Update data setiap 5 detik
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fungsi untuk membuat data chart
  const generateChartData = (data) => ({
    pieData: {
      labels: ["SpO2", "Remaining"],
      datasets: [
        {
          data: [data.spO2 ?? 0, 100 - (data.spO2 ?? 0)],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    },
    barData: {
      labels: ["Temperature"],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [data.temperature ?? 0],
          backgroundColor: ["#FFCE56"],
        },
      ],
    },
    bpmData: {
      labels: ["BPM"],
      datasets: [
        {
          label: "Heart Rate (BPM)",
          data: [data.bpm ?? 0],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    },
    skinResponseData: {
      labels: ["Skin Response"],
      datasets: [
        {
          label: "Skin Response",
          data: [data.skinResponse ?? 0],
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    },
  });

  return (
    <>
      <div>
        <Layout />
      </div>
      <div className="content p-4 sm:ml-64 relative overflow-x-auto">
        <h1>Sensor Data</h1>
        {Object.keys(sensorData).length === 0 ? (
          <p>Loading data...</p>
        ) : (
          Object.entries(sensorData).map(([id, data]) => {
            const chartData = generateChartData(data);
            return (
              <div
                key={id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                {/* Informasi ID */}
                <div
                  style={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>ID Sensor: {id}</p>
                </div>

                {/* Chart disusun secara kolom */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Chart untuk SpO2 */}
                  <div style={{ width: "200px", marginBottom: "20px" }}>
                    <h3 style={{ textAlign: "center" }}>SpO2</h3>
                    <Pie data={chartData.pieData} />
                  </div>

                  {/* Chart untuk Temperature */}
                  <div style={{ width: "200px", marginBottom: "20px" }}>
                    <h3 style={{ textAlign: "center" }}>Temperature</h3>
                    <Bar data={chartData.barData} />
                  </div>

                  {/* Chart untuk BPM */}
                  <div style={{ width: "200px", marginBottom: "20px" }}>
                    <h3 style={{ textAlign: "center" }}>BPM (Heart Rate)</h3>
                    <Line data={chartData.bpmData} />
                  </div>

                  {/* Chart untuk Skin Response */}
                  <div style={{ width: "200px", marginBottom: "20px" }}>
                    <h3 style={{ textAlign: "center" }}>Skin Response</h3>
                    <Line data={chartData.skinResponseData} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default SensorChart;
