import React from "react";
import { Link } from "react-router-dom";

import { RefreshCcw, Trash2 } from "lucide-react";

import { fetchWeatherForCity } from "../../../store/citiesSlice/cities.actions";
import { removeCity } from "../../../store/citiesSlice/cities.slice";
import { City } from "../../../store/citiesSlice/types";
import { useAppDispatch } from "../../../store/store";
import { CardButton } from "./card-button";
import styles from "./city-weather-card.module.scss";

interface Props {
  city: City;
}

export const CityWeatherCard: React.FC<Props> = ({ city }) => {
  const dispatch = useAppDispatch();

  const temp = Math.round(city.weather.temp);
  const feelsLikeTemp = Math.round(city.weather.feels_like);

  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    dispatch(removeCity(city.id));
  };

  const handleRefreshClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    dispatch(fetchWeatherForCity(city.coord));
  };

  return (
    <Link to={`${city.name}?lat=${city.coord.lat}&lon=${city.coord.lon}`}>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitle}>
          <h1>{city.name}</h1>
          <img
            src={`http://openweathermap.org/img/w/${city.weather.icon}.png`}
            alt="Weather icon"
            loading="lazy"
          />
        </div>
        <h2>{city.country}</h2>
        <h4>{city.weather.main}</h4>
        <h2>{temp} °С</h2>
        <h4>Feels like: {feelsLikeTemp} °С</h4>
        <div className={styles.btnsBlock}>
          <CardButton
            img={<RefreshCcw color="#ffffff" />}
            bgColor={""}
            onClick={handleRefreshClick}
          />
          <CardButton
            img={<Trash2 color="#ffffff" />}
            bgColor={"red"}
            onClick={handleRemoveClick}
          />
        </div>
      </div>
    </Link>
  );
};
