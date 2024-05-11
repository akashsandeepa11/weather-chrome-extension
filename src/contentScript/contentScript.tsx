import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import WeatheCard from "../components/WeatherCard";
import "./contentScript.css";
import { Card } from "@mui/material";
import { LocalStorageOptions, getStoredOptions } from "../utils/storage";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredOptions().then((res) => {
      setOptions(res);
      setIsActive(res.hasOverlayActive);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    isActive && (
      <Card className="overlayCard">
        <WeatheCard
          city={options.homeCity}
          tempScale={options.tempScale}
          onDelete={() => setIsActive(false)}
        />
      </Card>
    )
  );
};

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
