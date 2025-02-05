import { PayloadAction } from "@reduxjs/toolkit";

import { CitiesState } from "../store/citiesSlice/types";

export const updateCityWeather = (
  state: CitiesState,
  action: PayloadAction<any>,
) => {
  const cityIndex = state.cities.findIndex(
    (city) => city.id === action.payload.id,
  );
  if (cityIndex !== -1) {
    state.cities[cityIndex].weather = {
      main: action.payload.weather[0].main,
      temp: action.payload.main.temp,
      feels_like: action.payload.main.feels_like,
      temp_max: action.payload.main.temp_max,
      temp_min: action.payload.main.temp_min,
      pressure: action.payload.main.pressure,
      humidity: action.payload.main.humidity,
      wind_speed: action.payload.wind.speed,
      icon: action.payload.weather[0].icon,
    };
  }
};
