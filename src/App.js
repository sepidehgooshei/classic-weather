import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "./components/Input";
import Weather from "./components/Weather";
import convertToFlag from "./components/convertToFlag"
function App() {
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [displayLocation, setDisplayLocation] = useState("");
    const [weather, setWeather] = useState({});
    useEffect(() => {
        const savedLocation = localStorage.getItem("location");
        if (savedLocation) setLocation(savedLocation);
    }, []);

    useEffect(() => {
        if (location.length < 2) {
            setWeather({});
            return;
        }

        const fetchWeather = async () => {
            try {
                setIsLoading(true);
                const geoRes = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
                );
                const geoData = await geoRes.json();
                if (!geoData.results) throw new Error("Location not found");
                const { latitude, longitude, timezone, name, country_code } =
                    geoData.results.at(0);
                setDisplayLocation(`${name} ${convertToFlag(country_code)}`);
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
                );
                const weatherData = await weatherRes.json();
                setWeather(weatherData.daily);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
        localStorage.setItem("location", location);
    }, [location]);

    return (
      <div className="container mt-5">
            <h1 className="text-center mb-4">Classy Weather</h1>
            <Input location={location} onChangeLocation={(e) => setLocation(e.target.value)} />

            {isLoading && (
                <p className="loader text-center text-primary mt-3">Loading...</p>
            )}

            {weather.weathercode && (
                <Weather weather={weather} location={displayLocation} />
            )}
        </div>  
  );
}

export default App;
