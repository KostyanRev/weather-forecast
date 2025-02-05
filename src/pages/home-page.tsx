import React from "react";

import { AddCityForm, CitiesGroupList } from "../components/shared";

const HomePage: React.FC = () => {
  return (
    <>
      <AddCityForm />
      <CitiesGroupList />
    </>
  );
};

export default HomePage;
