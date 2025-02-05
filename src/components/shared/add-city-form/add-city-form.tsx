import React, { useState } from "react";
import { useDebounce } from "react-use";

import clsx from "clsx";
import { Search } from "lucide-react";

import { fetchWeatherByCityName } from "../../../api/weatherApi";
import { addCity, selectCities } from "../../../store/citiesSlice/cities.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { ButtonPrimary } from "../../ui";
import styles from "./add-city-form.module.scss";

export const AddCityForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => selectCities(state));

  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>({});

  useDebounce(
    async () => {
      if (inputValue.length >= 3) {
        try {
          const data = await fetchWeatherByCityName(inputValue);
          setSuggestions(data.list);
        } catch (error) {
          console.error("Error while getting cities", error);
        }
      } else {
        setSuggestions([]);
      }
    },
    250,
    [inputValue],
  );

  const handleSuggestionClick = (
    cityName: string,
    country: string,
    id: number,
  ) => {
    setInputValue(`${cityName}, ${country}`);
    setSelectedCity(suggestions.find((city) => city.id === id));
    setFocused(false);
    setSuggestions([]);
  };

  const handleAddCity = () => {
    if (selectedCity && !cities.some((city) => city.id === selectedCity.id)) {
      dispatch(
        addCity({
          id: selectedCity.id,
          name: selectedCity.name,
          country: selectedCity.sys.country,
          coord: selectedCity.coord,
          weather: {
            main: selectedCity.weather[0].main,
            temp: selectedCity.main.temp,
            feels_like: selectedCity.main.feels_like,
            temp_max: selectedCity.main.temp_max,
            temp_min: selectedCity.main.temp_min,
            pressure: selectedCity.main.pressure,
            humidity: selectedCity.main.humidity,
            wind_speed: selectedCity.wind.speed,
            icon: selectedCity.weather[0].icon,
          },
        }),
      );

      setInputValue("");
      setSelectedCity({});
    } else {
      alert("You have alredy added this city");
      setInputValue("");
      setSelectedCity({});
    }
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setSelectedCity({});
    }
  };

  return (
    <>
      {focused && (
        <div className={styles.overlay} onClick={() => setFocused(false)} />
      )}

      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputValue}
            placeholder="Find the city"
            onFocus={() => setFocused(true)}
          />
          {
            <div
              className={clsx(
                styles.dropdown,
                suggestions.length > 0 && focused && styles.active,
              )}
            >
              {suggestions.map((city) => (
                <span
                  className={styles.dropdownItem}
                  key={city.id}
                  onClick={() =>
                    handleSuggestionClick(city.name, city.sys.country, city.id)
                  }
                >
                  {city.name}, {city.sys.country}
                </span>
              ))}
            </div>
          }
        </div>

        <ButtonPrimary
          width={100}
          height={40}
          label={"Add city"}
          onClick={handleAddCity}
          disabled={!selectedCity.id}
        />
      </div>
    </>
  );
};
