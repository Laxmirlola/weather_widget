import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "./WeatherTips.css";

export default function WeatherTips({ weather }) {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (weather) {
      // Show the tip after a short delay (e.g., 2 seconds)
      timeoutId = setTimeout(() => {
        setShowTip(true);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [weather]);

  const getTip = () => {
    if (weather.humidity > 70)
      return `Remember to carry an umbrella! ☔ Enjoy the weather!😊`;
    else if (weather.temp > 25)
      return "Don't forget to apply sunscreen!☼ Enjoy the weather!😊";
    else
      return "It might be cloudy, consider taking a light jacket⛄.Enjoy the weather!😊";
  };

  return (
    <div className="weather-tip-container">
      {showTip && (
        <div className="weather-tip">
          <p>{getTip()}</p>
        </div>
      )}
    </div>
  );
}

WeatherTips.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    feelsLike: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    weather: PropTypes.string.isRequired,
  }).isRequired,
};
