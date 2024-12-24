import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";

export default function WeatherApp() {
  const [weatherInfo, setInfo] = useState({
    city: "Delhi",
    feelsLike: 21.12,
    temp: 27.3,
    tempMin: 25.05,
    tempMax: 30.33,
    humidity: 47,
    weather: "haze",
  });

  let updateInfo = (newInfo) => {
    setInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Weather App</h1>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
