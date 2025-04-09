import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./SearchBox.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Alert from "@mui/material/Alert"; // Import Alert component
import PropTypes from "prop-types";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "36f21abfb7b19ff7c2842837019408d7";

  let getWeather = async () => {
    try {
      let currentRes = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let currentData = await currentRes.json();

      if (!currentRes.ok) throw new Error("City not found");

      let forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      let forecastData = await forecastRes.json();

      let result = {
        temp: currentData.main.temp,
        tempMin: currentData.main.temp_min,
        tempMax: currentData.main.temp_max,
        humidity: currentData.main.humidity,
        feelsLike: currentData.main.feels_like,
        city: currentData.name,
        weather: currentData.weather[0].main,
        forecast: forecastData.list, // Add forecast array here
      };

      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false); // Reset error state before fetching

    try {
      const info = await getWeather();
      if (info) {
        updateInfo(info);
      }
    } catch {
      // Error handling already done in getWeather
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static" sx={{ background: "transparent" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <div className="logo">&#x26C5;</div>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className="SearchBox">
                <form onSubmit={handleSubmit}>
                  <TextField
                    required
                    id="outlined-basic"
                    label="City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    type="Submit"
                    endIcon={<SendIcon />}
                    style={{
                      marginLeft: "10px",
                      marginTop: "10px",
                      color: "white",
                    }}
                  ></Button>
                  {error && (
                    <Alert severity="error">
                      No place found with that name.
                    </Alert>
                  )}
                </form>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

SearchBox.propTypes = {
  updateInfo: PropTypes.func.isRequired,
};
