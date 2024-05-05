import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import {
  Box,
  Grid,
  IconButton,
  InputBase,
  SvgIcon,
  Typography,
  useAutocomplete,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";
import { OpenWeatherTempScale } from "../utils/api";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<String[]>([]);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((data) => setCities(data));
    getStoredOptions().then((data) => setOptions(data));
  }, []);

  const cityRef = useRef<HTMLInputElement>(null);

  function handleAddCityName() {
    const trimmedValue = cityRef.current?.value.trim();

    if (
      trimmedValue &&
      /^[a-zA-Z\s]+$/.test(trimmedValue) &&
      trimmedValue.length > 1
    ) {
      const updatedCities = [...cities, trimmedValue];

      setStoredCities(updatedCities).then(() => {
        setCities(updatedCities);
        cityRef.current.value = "";
      });
    }
  }

  function handleDeleteCityName(index: number) {
    const updatedCities: String[] = [...cities];
    updatedCities.splice(index, 1);

    setStoredCities(updatedCities).then(() => setCities(updatedCities));
  }

  if (!options) {
    return null;
  }

  function handleTempScaleChange() {
    const updatedTempScale: OpenWeatherTempScale =
      options.tempScale === "imperial" ? "matric" : "imperial";

    setStoredOptions({ tempScale: updatedTempScale }).then(() => {
      setOptions({ tempScale: updatedTempScale });
    });
  }

  return (
    <Box mx="8px" my="16px">
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add city Name"
                inputRef={cityRef}
                onChange={(event) => event.target.value}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleAddCityName}
              >
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </SvgIcon>
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Grid item>
              <IconButton>
                {options.tempScale === "matric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((cityName, index) => (
        <WeatherCard
          city={cityName}
          key={index}
          onDelete={() => handleDeleteCityName(index)}
        />
      ))}
      <Box height="8px" />
    </Box>
  );
};

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
