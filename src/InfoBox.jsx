import PropTypes from "prop-types";
import { useState } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./InfoBox.css";
import hot_url from "./assets/summer.jpeg";
import cold_url from "./assets/cold.jpeg";
import rain_url from "./assets/rain.jpeg";

// ...existing code...

function getDate() {
  const today = new Date();
  const date = today.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Add ordinal suffix to date
  const ordinalSuffix = (n) => {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  const formattedDate = ordinalSuffix(date);

  return `${formattedDate} ${month} ${year} ${formattedHours}:${formattedMinutes}${period}`;
}

console.log(getDate());

export default function InfoBox({ info }) {
  const [currentDate, setCurrentDate] = useState(getDate());

  const getBackgroundImage = () => {
    console.log(info);
    if (info.humidity > 70) {
      return rain_url;
    } else if (info.temp > 25) {
      return hot_url;
    } else {
      return cold_url;
    }
  };

  return (
    <div
      className="Info"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem",
        transition: "background-image 1s ",
      }}
    >
      <div className="InfoBox">
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "200" }}>
            {info.city}
            {info.humidity > 70 ? (
              <ThunderstormIcon />
            ) : info.temp > 25 ? (
              <WbSunnyIcon />
            ) : (
              <AcUnitIcon />
            )}
          </h1>{" "}
        </div>
        <p style={{ fontSize: "1.5rem", fontWeight: "100" }}>{currentDate}</p>
        <p className="temp">{info.temp}°C</p>
        <h4 style={{ marginBottom: "0" }}>{info.weather.toUpperCase()}</h4>
        <p style={{ marginTop: "2px" }}>Feels like {info.feelsLike}°C</p>
      </div>

      <div className="card-body">
        <div className="card-text one">
          <p>
            <h5
              style={{
                fontWeight: "100",
                margin: "0 0 0.2rem 0",
                fontSize: "1.2rem",
              }}
            >
              Humidity
            </h5>
            <div style={{ fontSize: "2.5rem" }}>{info.humidity}%</div>
          </p>
          <p>
            <h5
              style={{
                fontWeight: "100",
                margin: "0 0 0.2rem 0",
                fontSize: "1.2rem",
              }}
            >
              Min Temp
            </h5>
            <div style={{ fontSize: "2.5rem" }}>{info.tempMin}°C</div>
          </p>
        </div>
        <div className="card-text two">
          {" "}
          <p>
            <h5
              style={{
                fontWeight: "100",
                margin: "0 0 0.2rem 0",
                fontSize: "1.2rem",
              }}
            >
              Max Temp
            </h5>
            <div style={{ fontSize: "2.5rem" }}>{info.tempMax}°C</div>
          </p>
          <p>
            <h5
              style={{
                fontWeight: "100",
                margin: "0 0 0.2rem 0",
                fontSize: "1.2rem",
              }}
            >
              Temperature
            </h5>
            <div style={{ fontSize: "2.5rem" }}>{info.temp}°C</div>
          </p>
        </div>
      </div>
    </div>
  );
}

// Prop validation
InfoBox.propTypes = {
  info: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    feelsLike: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    weather: PropTypes.string.isRequired,
  }).isRequired,
};
