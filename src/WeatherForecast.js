import React, { useState } from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props){
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] =useState(null);

    function handleResponse(response){
        setForecast(response.data.daily)
        setLoaded(true);
    }
    console.log(props);

    

    if (loaded) {
        return (
          <div className="WeatherForecast">
            <div className="row">
{forecast.map(function(dailyForecast, index) {
  if (index < 5) {
    return (
      <div className="col" key={index}>
        <WeatherForecastDay data={dailyForecast} />
      </div>
    );
  }
}
)}  
            </div>
          </div>
        );
    } else {
        let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
        let longitude = props.coordinates.lon;
        let latitude = props.coordinates.lat;
        let apiUrl = `https://ap.penweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl).then(handleResponse);

        return null;
    }
}
