import { OPEN_WEATHER_API_KEY } from "../../env";

export interface OpenWeatherData {
  name: String;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: String;
    icon: String;
    id: number;
    main: String;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export async function fetchOpenWeatherData(
  city: String
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  const data: OpenWeatherData = await res.json();

  return data;
}
