import { useEffect, useState } from "react";
import "./App.css";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.webp"; 
import humidityIcon from "./assets/humidity.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import rainIcon from "./assets/rain.png"; 
import { IoSearchCircleOutline } from 'react-icons/io5';


const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="weather-icon" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity-icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind-icon" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const api_key = "843f324bb5b4fdb2e70ce0d67bf07815";
  const [text, setText] = useState("Coimbatore");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Coimbatore");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    setCityNotFound(false);
    setError(null);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <div className="searchIcon" onClick={() => search()}>
            <IoSearchCircleOutline />
          </div>
          <input
            type='text'
            className='cityInput'
            placeholder='Search City'
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            lon={lon}
            humidity={humidity}
            wind={wind}
          />
        )}
        <p className="copyright">Designed by <span>Vasanth</span></p>
      </div>
    </>
  );
}

export default App;
