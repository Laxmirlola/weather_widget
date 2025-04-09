// ForecastBox.jsx
import PropTypes from "prop-types";
import "./ForecastBox.css";

export default function ForecastBox({ forecast }) {
  const getDate = (dt_txt) =>
    new Date(dt_txt).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  return (
    <div className="forecast-box">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast
          .filter((_, i) => i % 8 === 0)
          .slice(0, 5)
          .map((item, index) => (
            <div key={index} className="forecast-card">
              <p>{getDate(item.dt_txt)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{item.main.temp}°C</p>
              <p>{item.weather[0].main}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

ForecastBox.propTypes = {
  forecast: PropTypes.array.isRequired,
};
