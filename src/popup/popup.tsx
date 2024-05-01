import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { Box, Grid, IconButton, InputBase, SvgIcon } from "@mui/material";
import Paper from "@mui/material/Paper";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<String[]>([
    "Colombo",
    "Monaragala",
    "Error",
  ]);

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase placeholder="Add city Name" />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </SvgIcon>
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((cityName, index) => (
        <WeatherCard city={cityName} key={index} />
      ))}
    </Box>
  );
};

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
