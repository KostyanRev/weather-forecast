import { Status } from "../citiesSlice/types";

export interface WeatherEntry {
  time: string;
  temp: number;
}

export interface WeatherState {
  data: WeatherEntry[];
  status: Status;
  error: string | null;
}

export interface FetchWeatherArgs {
  lat: number;
  lon: number;
}
