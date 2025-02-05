import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Coord } from "../../../store/citiesSlice/types";
import { fetchHourlyWeather } from "../../../store/hourlyWeatherSlice/hourlyWeather.actions";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import style from "./weather-chart.module.scss";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
);

export const WeatherChart: React.FC<Coord> = ({ lat, lon }) => {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.data);

  useEffect(() => {
    if (lat && lon) {
      dispatch(fetchHourlyWeather({ lat, lon }));
    }
  }, [lat, lon, dispatch]);

  const chartData = {
    labels: weatherData.data.map((entry) => entry.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData.data.map((entry) => entry.temp),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={style.chartContainer}>
      <h3>Temperature forecast for 5 days</h3>
      <Line data={chartData} />
    </div>
  );
};
