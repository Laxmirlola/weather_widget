import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import WeatherTips from "./WeatherTips";
import ForecastBox from "./ForecastBox";

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

  const [searchHistory, setSearchHistory] = useState([]);

  const updateInfo = (newInfo) => {
    setInfo(newInfo);

    // Keep last 5 unique city searches
    setSearchHistory((prevHistory) => {
      const updated = [
        newInfo.city,
        ...prevHistory.filter((c) => c !== newInfo.city),
      ];
      return updated.slice(0, 5);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <SearchBox updateInfo={updateInfo} />
      <RecentSearches history={searchHistory} />
      <InfoBox info={weatherInfo} />
      {weatherInfo.forecast?.length > 0 && (
        <ForecastBox forecast={weatherInfo.forecast} />
      )}
      {weatherInfo && <WeatherTips weather={weatherInfo} />}
    </div>
  );
}

// ✅ Horizontal Recent Searches component
function RecentSearches({ history }) {
  if (history.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Recent Searches</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {history.map((city, index) => (
          <span
            key={index}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}
