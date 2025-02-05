export interface Weather {
  main: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  icon: string;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  name: string;
  country: string;
  coord: Coord;
  weather: Weather;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  IDLE = "idle",
}

export interface CitiesState {
  cities: City[];
  status: Status;
  error: string | null;
}
