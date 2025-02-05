import React from "react";

import { selectCities } from "../../../store/citiesSlice/cities.slice";
import { City, Coord } from "../../../store/citiesSlice/types";
import { useAppSelector } from "../../../store/store";
import { WeatherChart } from "../weather-chart/weather-chart";
import styles from "./city-weather-block.module.scss";

interface Props {
  cityCoords: Coord;
}

export const CityWeatherBlock: React.FC<Props> = ({ cityCoords }) => {
  const cities = useAppSelector((state) => selectCities(state));

  const city = cities.find(
    (city) =>
      city.coord.lat === cityCoords.lat && city.coord.lon === cityCoords.lon,
  ) as City;

  const temp = Math.round(city.weather.temp);
  const max_temp = Math.round(city.weather.temp_max);
  const min_temp = Math.round(city.weather.temp_min);
  const feelsLikeTemp = Math.round(city.weather.feels_like);

  return (
    <div className={styles.blockContainer}>
      <div className={styles.title}>
        <h1>
          {city.name}, {city.country}
        </h1>
        <img
          src={`http://openweathermap.org/img/w/${city.weather.icon}.png`}
          alt="Weather icon"
          loading="lazy"
        />
      </div>
      <h2 className={styles.main}>{city.weather.main}</h2>
      <div className={styles.weatherBlock}>
        <div>
          <p>Temperature: {temp} °С</p>
          <p>Maximum temperature at the moment: {max_temp} °С</p>
          <p>Minimum temperature at the moment: {min_temp} °С</p>
          <p>Temperature feels like: {feelsLikeTemp} °С</p>
        </div>
        <div>
          <p>Humidity: {city.weather.humidity} %</p>
          <p>Wind speed: {city.weather.wind_speed} metre/sec</p>
          <p>
            Atmospheric pressure on the sea level: {city.weather.pressure} hPa
          </p>
        </div>
      </div>
      <WeatherChart lat={city.coord.lat} lon={city.coord.lon} />
    </div>
  );
};
