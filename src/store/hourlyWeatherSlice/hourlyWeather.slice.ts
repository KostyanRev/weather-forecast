import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Status } from "../citiesSlice/types";
import { fetchHourlyWeather } from "./hourlyWeather.actions";
import { WeatherEntry, WeatherState } from "./types";

const initialState: WeatherState = {
  data: [],
  status: Status.IDLE,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHourlyWeather.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchHourlyWeather.fulfilled,
        (state, action: PayloadAction<WeatherEntry[]>) => {
          state.status = Status.SUCCESS;
          state.data = action.payload;
        },
      )
      .addCase(fetchHourlyWeather.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message || "Failed to load data";
      });
  },
});

export default weatherSlice.reducer;
