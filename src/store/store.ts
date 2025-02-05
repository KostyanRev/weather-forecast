import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import citiesReducer from "./citiesSlice/cities.slice";
import weatherReducer from "./hourlyWeatherSlice/hourlyWeather.slice";

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    data: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
