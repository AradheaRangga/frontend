"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const SensorData = () => {
  const [data, setData] = useState({
    heartRate: 0,
    spO2: 0,
    temperature: 0,
    humidity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/sensor-data"
        );
        setData(response.data.sensorData);
        console.log(response.data.sensorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 2000); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <>
      <div>
        <h1>Sensor Data</h1>
        <p>Heart Rate: {data.heartRate} BPM</p>
        <p>Avg BPM: {data.avgBPM} BPM</p>
        <p>SpO2: {data.spO2} %</p>
        <p>Temperature: {data.temperature} °C</p>
        <p>Humidity: {data.humidity} %</p>
      </div>
    </>
  );
};

export default SensorData;
