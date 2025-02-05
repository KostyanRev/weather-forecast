import React from "react";
import { useSearchParams } from "react-router-dom";

import { CityWeatherBlock } from "../components/shared";

const CityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const coord = {
    lat: Number(searchParams.get("lat")),
    lon: Number(searchParams.get("lon")),
  };

  return <CityWeatherBlock cityCoords={coord} />;
};

export default CityPage;
