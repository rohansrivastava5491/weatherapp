import { useState } from "react";
import axios from "axios";
import "./style.css";

const WeatherApp = () => {
  // State variables for city input and weather data
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");

  // Function to fetch weather data from the OpenWeatherMap API
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1318ca383ebfd9cff2af975b0015657`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
      {/* Weather App Container */}
      <div className="weather-page row white-text">
        {/* Title */}
        <h3 className="center heading title col s12 m12">Weather App</h3>

        {/* Weather Card */}
        <div className="container col s12 m9 weather-card">
          {/* Form for City Input */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12 m12">
                <input
                  type="text"
                  placeholder="Enter location"
                  id="text"
                  className="validate"
                  value={city}
                  style={{ fontSize: "30px", color: "white" }}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              {/* Submit Button */}
              <div className="submit-button col 12 m12 center">
                <button className="waves-effect waves-light btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>

          {/* Display Weather Data */}
          {weatherData && (
            <div className="container">
              <h4>
                {weatherData.name}, {weatherData.sys.country}
                <br />
                <span
                  className="weather-description"
                  style={{ fontSize: "20px" }}
                >
                  {weatherData.weather[0].description}
                </span>
              </h4>
              {/* Temperature */}
              <p
                className="center"
                style={{
                  padding: "0px",
                  fontSize: "60px",
                }}
              >
                {(weatherData.main.temp - 273.15).toFixed(1)}°C
              </p>
              <p style={{ fontSize: "30px" }}></p>
            </div>
          )}

          {/* Additional Weather Information */}
          {weatherData && (
            <div className="row center">
              {/* High Temperature */}
              <div className="col s4 m4" style={{ fontSize: "20px" }}>
                <i className="material-icons ">wb_sunny</i>
                <br />
                {(weatherData.main.temp_max - 273.15).toFixed(1)}°C High
              </div>

              {/* Wind Speed */}
              <div className="col s4 m4" style={{ fontSize: "20px" }}>
                <i className="material-icons ">toys</i>
                <br />
                {weatherData.wind.speed}km/h Wind
              </div>

              {/* Sunrise */}
              <div className="col s4 m4" style={{ fontSize: "20px" }}>
                <i className="material-icons">brightness_5</i>
                <br />
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                Sunrise
              </div>

              {/* Low Temperature */}
              <div className="col s4 m4" style={{ fontSize: "20px" }}>
                <i className="material-icons ">brightness_3</i>
                <br />
                {(weatherData.main.temp_min - 273.15).toFixed(1)}°C Low
              </div>

              {/* Humidity */}
              <div className="col s4 m4" style={{ fontSize: "20px" }}>
                <i className="material-icons">opacity</i>
                <br />
                {weatherData.main.humidity}% Humidity
              </div>

              {/* Sunset */}
              <div className="col s4 m4" style={{ fontSize: "20px" }}>
                <i className="material-icons ">brightness_2</i>
                <br />
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                Sunset
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
