import axios from "axios";

import { Coord } from "../store/citiesSlice/types";

export const fetchWeatherByCityCoords = async (coord: Coord) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`,
  );
  return response.data;
};

export const fetchWeatherByCityName = async (name: string) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/find?units=metric&q=${name}&type=like&sort=population&cnt=5&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
  );
  return response.data;
};

export const fetchHourlyForecast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
  );
  return response.data;
};
