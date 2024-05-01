import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { fetchOpenWeatherData } from "../utils/api";
import WeatheCard from "./WeatherCard";
import * as dotenv from "dotenv";

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatheCard city={"Colombo"} />
    </div>
  );
};

dotenv.config();
const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
