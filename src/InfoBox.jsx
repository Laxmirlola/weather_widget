import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const hot_url =
    "https://plus.unsplash.com/premium_photo-1700124162812-1d5d29087b81?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const cold_url =
    "https://plus.unsplash.com/premium_photo-1670604649107-a0171e5f1bd0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const rain_url =
    "https://plus.unsplash.com/premium_photo-1671229652411-4468b946b787?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D-1567306226416-28f0efdc88ce";

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={
              info.humidity > 70
                ? rain_url
                : info.temp > 25
                ? hot_url
                : cold_url
            }
            title="Weather Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}{" "}
              {info.humidity > 70 ? (
                <ThunderstormIcon />
              ) : info.temp > 25 ? (
                <WbSunnyIcon />
              ) : (
                <AcUnitIcon />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <p>Temperature: {info.temp}°C</p>
              <p>Humidity: {info.humidity}%</p>
              <p>Min Temp: {info.tempMin}°C</p>
              <p>Max Temp: {info.tempMax}°C</p>
              <p>
                Feels like {info.feelsLike}°C and is{""}
                <i>{info.weather} weather</i>
              </p>
            </Typography>
          </CardContent>
        </Card>
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
