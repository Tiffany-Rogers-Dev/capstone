import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const REACT_APP_WEATHER_API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;
// const LOCATION_API_KEY = process.env.REACT_APP_LOCATION_API_KEY;
// const REACT_APP_WEATHER_API_KEY = "abfc55a8e9996be950f0cf77eac9f611";

// export default function Weather() {
//   const [longitude, setLongitude] = useState("");
//   const [latitude, setLatitude] = useState("");
//   // const [locationName, setLocationName] = useState("");
//   const [locationWeather, setLocationWeather] = useState("");
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(savePosition);
//       setTimeout(() => {
//         getWeather();
//       }, 1000);
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };
//   const savePosition = (position) => {
//   setLatitude(position.coords.latitude);
//   setLongitude(position.coords.longitude);
//   };
export default function Weather() {
  const savePosition = (position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  };
  const getWeather = (latitude, longitude) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}&units=imperial`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.main.temp);
        // setLocationName(res.data.main.name);
        const new_temp = Math.floor(res.data.main.temp);
        setLocationWeather(new_temp);
      });
  };

  // const [longitude, setLongitude] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [locationName, setLocationName] = useState("");
  const [locationWeather, setLocationWeather] = useState(0);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <button onClick={getLocation}>Get Weather at Current Position</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          gap: "5px",
        }}
      >
        <h2>Current Weather</h2>
        <h1>{locationWeather}°F</h1>
      </div>
    </>
  );
}
