import React, { useEffect, useState } from "react";
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
} from "../../utils/api";
import "./WeatherCard.css";
import Card from "@mui/material/Card";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box my={1}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button onClick={onDelete} color="error" size="small">
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

const WeatherCard: React.FC<{
  city: String;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        console.log(err);
        setCardState("error");
      });
  }, [city, tempScale]);

  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState == "loading"
            ? "Loading..."
            : "Error: could not retrieve weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
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

export default WeatherCard;
