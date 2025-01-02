import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import WeatherTips from "./WeatherTips";

export default function WeatherApp() {
  const [weatherInfo, setInfo] = useState({
    city: "--",
    feelsLike: null,
    temp: null,
    tempMin: null,
    tempMax: null,
    humidity: null,
    weather: "None",
  });

  let updateInfo = (newInfo) => {
    setInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
      {weatherInfo && <WeatherTips weather={weatherInfo} />}
    </div>
  );
}
