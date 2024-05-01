import React, { useEffect } from "react";
import { fetchOpenWeatherData } from "../../utils/api";

const WeatheCard: React.FC<{ city: String }> = ({ city }) => {
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => console.log(data.main.temp_max))
      .catch((err) => console.log(err));
  }, [city]);

  return (
    <div>
      <h1>{city}</h1>
    </div>
  );
};

export default WeatheCard;
