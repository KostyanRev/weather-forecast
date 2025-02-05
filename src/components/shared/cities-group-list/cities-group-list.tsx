import React, { useEffect } from "react";

import { updateWeatherForAllCities } from "../../../store/citiesSlice/cities.actions";
import { selectCities } from "../../../store/citiesSlice/cities.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { CityWeatherCard } from "../city-weather-card/city-weather-card";
import styles from "./cities-group-list.module.scss";

export const CitiesGroupList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => selectCities(state));

  useEffect(() => {
    if (cities.length > 0) {
      dispatch(updateWeatherForAllCities());
    }
  }, []);

  if (cities.length === 0) {
    return (
      <div className={styles.emptyList}>
        <h2>The city list is empty</h2>
        <p>Firstly add the city</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {cities.map((city) => (
        <CityWeatherCard key={city.id} city={city} />
      ))}
    </div>
  );
};
