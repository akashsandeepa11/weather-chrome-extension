import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./options.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { getStoredOptions } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [homeCity, setHomeCity] = useState<String>("");
  const cityRef = useRef<String>();

  useEffect(() => {
    getStoredOptions().then((res) => {
      setHomeCity(res.homeCity);
    });
  }, []);

  return (
    <Box mx={10} my={2}>
      <Card>
        <CardContent>
          <Grid container spacing={2} direction={"column"}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name:</Typography>
              <TextField
                inputRef={cityRef}
                placeholder="Enter a Home city"
                variant="standard"
                value={homeCity}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
