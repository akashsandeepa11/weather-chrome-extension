import { fetchOpenWeatherData } from "../utils/api";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    hasOverlayActive: false,
    homeCity: "",
    tempScale: "metric",
  });

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  });

  chrome.alarms.create({
    periodInMinutes: 1 / 60,
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  getStoredOptions().then((options) => {
    if (options.homeCity === "") {
      return;
    }

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((res) => {
      chrome.action.setBadgeText({
        text: `${Math.round(res.main.temp)}${
          options.tempScale === "imperial" ? "\u2109" : "\u2103"
        }`,
      });
    });
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});
