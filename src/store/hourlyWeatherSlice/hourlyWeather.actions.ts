import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchHourlyForecast } from "../../api/weatherApi";
import { FetchWeatherArgs, WeatherEntry } from "./types";

export const fetchHourlyWeather = createAsyncThunk<
  WeatherEntry[],
  FetchWeatherArgs
>("weather/fetchWeather", async ({ lat, lon }) => {
  const data = await fetchHourlyForecast({ lat, lon });

  return data.list.map((entry: any) => ({
    time: entry.dt_txt,
    temp: entry.main.temp,
  }));
});
