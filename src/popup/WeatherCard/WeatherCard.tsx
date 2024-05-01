import React, { useEffect, useState } from "react";
import { OpenWeatherData, fetchOpenWeatherData } from "../../utils/api";
import "./WeatherCard.css";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCardContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box my={1}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

const WeatheCard: React.FC<{ city: String }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log(err);
        setCardState("error");
      });
  }, [city]);

  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
          {cardState == "loading"
            ? "Loading..."
            : "Error: could not retrieve weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer>
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels Like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatheCard;
