import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./options.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [saveState, setSaveState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((res) => {
      setOptions(res);
      setSaveState("ready");
    });
  }, []);

  function handleSaveHomeCity() {
    setSaveState("saving");
    setStoredOptions(options).then(() =>
      setTimeout(() => {
        setSaveState("ready");
      }, 1000)
    );
  }

  function handleSwichChange(isToggleActive: boolean) {
    setOptions({
      ...options,
      hasOverlayActive: isToggleActive,
    });
  }

  if (!options) {
    return null;
  }

  const isFormStateSaving = saveState === "saving";

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
                placeholder="Enter a Home city"
                variant="standard"
                value={options.homeCity}
                onChange={(event) =>
                  setOptions({ ...options, homeCity: event.target.value })
                }
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on webpage load:
              </Typography>
              <Switch
                checked={options.hasOverlayActive}
                onChange={(event, checked) => handleSwichChange(checked)}
                disabled={isFormStateSaving}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={isFormStateSaving}
                onClick={handleSaveHomeCity}
                variant="contained"
                color="primary"
              >
                {isFormStateSaving ? "Saving..." : "save"}
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
