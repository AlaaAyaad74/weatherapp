import React, { useState, useEffect } from "react";
import "./Weather.css";
import clear_icon from "../assets/clear.png";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Cairo");

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=979e237b0f5e09e3c71616ac4781af58&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      search(city);
    }
  };
  console.log(weatherData);
  return (
    <div className="main-wrapper">
      <div className="app-description">Weather App</div>
      <div className="weather">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Here"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img
            src={search_icon}
            alt="search"
            className=""
            onClick={() => search(city)}
          />
        </div>
      </div>
      {weatherData &&
        weatherData.sys &&
        weatherData.main &&
        weatherData.weather && (
          <div className="weather-info-card">
            <img src={clear_icon} alt="clear" className="weather-icon" />
            <p>{weatherData.name}</p>
            <p>
              <span>{weatherData.sys.country}</span> {weatherData.main.temp}°C
            </p>
            <h5>{new Date(weatherData.dt * 1000).toLocaleString()}</h5>
            <h5>{weatherData.weather[0].description}</h5>
          </div>
        )}
    </div>
  );
};

export default Weather;
