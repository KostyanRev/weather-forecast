import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { updateCityWeather } from "../../utils/updateCityWeather";
import { RootState } from "../store";
import { fetchWeatherForCity } from "./cities.actions";
import { CitiesState, Status, Weather } from "./types";

const initialState: CitiesState = {
  cities: JSON.parse(localStorage.getItem("cities") || "[]"),
  status: Status.IDLE,
  error: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
    updateCityWeather: (
      state,
      action: PayloadAction<{ id: number; weather: Weather }>,
    ) => {
      const cityIndex = state.cities.findIndex(
        (city) => city.id === action.payload.id,
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex].weather = action.payload.weather;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCity.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
        updateCityWeather(state, action);
        state.status = Status.SUCCESS;
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message || "Failed to load data";
      });
  },
});

export const { addCity, removeCity } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities.cities;

export default citiesSlice.reducer;
