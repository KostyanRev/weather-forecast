import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchWeatherByCityCoords } from "../../api/weatherApi";
import { RootState } from "../store";
import { Coord } from "./types";

export const fetchWeatherForCity = createAsyncThunk(
  "cities/fetchWeatherForCity",
  async (coord: Coord, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCityCoords(coord);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateWeatherForAllCities = createAsyncThunk(
  "cities/updateWeatherForAllCities",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const cities = state.cities.cities;

    const promises = cities.map((city) =>
      dispatch(fetchWeatherForCity(city.coord)).unwrap(),
    );

    await Promise.all(promises);
  },
);
