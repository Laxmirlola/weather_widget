import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./SearchBox.css";
import { useState } from "react";
import PropTypes from "prop-types";
export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  let API_URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = "36f21abfb7b19ff7c2842837019408d7";

  let getWeather = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        city: jsonResponse.name,
        weather: jsonResponse.weather[0].main,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (e) => {
    setCity(e.target.value);
  };

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(city);
      setCity("");
      let info = await getWeather();
      updateInfo(info);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        {" "}
        <TextField
          required
          id="outlined-basic "
          label="City Name "
          variant="outlined"
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="Submit" endIcon={<SendIcon />}>
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place exists!!</p>}
      </form>
    </div>
  );
}

SearchBox.propTypes = {
  updateInfo: PropTypes.func.isRequired,
};
