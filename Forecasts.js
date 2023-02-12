import React, { useState, useEffect } from "react";
import axios from "axios";

const REACT_APP_WEATHER_API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;
// const REACT_APP_API_KEY = `${process.env.REACT_APP_API_KEY}`;
const locations = [
  "Saint Thomas",
  "Saint Lucia",
  "Basseterre",
  "Antigua",
  "Bahamas",
];

const Forecasts = () => {
  const [forecasts, setForecasts] = React.useState([]);

  useEffect(() => {
    const getForecasts = async () => {
      const promises = locations.map(async (location) => {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${REACT_APP_WEATHER_API_KEY}&units=imperial`
        ); //&cnt=40
        const data = await res.json();
        console.log(data);
        return data;
      });
  // useEffect(() => {
  //   const getForecasts = async () => {
  //     const promises = city.map(async (location) => {
  //       const res = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?city=&${city}&key=${REACT_APP_API_KEY}`);
  //       const data = await res.json();
  //       console.log(data);
  //       return res.data;
  //     });
      const allForecasts = await Promise.all(promises);
      setForecasts(allForecasts);
    };
    getForecasts();
  }, []);

  return (
    <div>
      {forecasts.map((forecast, index) => {
        const locationDate = forecast.list.find((date) =>
          date.dt_txt.includes("15:00:00")
        );
        return (
          <div key={index}>
            <h2>{locations[index]}</h2>
            <p>Temperature: {locationDate ? Math.floor(locationDate.main.temp) : "N/A"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecasts;
