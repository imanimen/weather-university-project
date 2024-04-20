import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WeatherApp.css';


const WeatherApp = () => {
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState([]);

    const getWeather = () => {
        if (!cityInput.trim()) {
            // Display toast if input is empty
            toast.error("Please enter a city name.", {
                position: "top-right"
              });
            return;
        }

        fetch(`http://127.0.0.1:8000/weather/${cityInput}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => console.error("Error:", error));
    };

    const getWeatherIcon = (temperature) => {
        if (temperature > 25) {
          // Sunny icon
          return {
            emoji: "🌞",
            image: "./weathericons/sunny.svg"
          }
        } else if (temperature > 15) {
          // Partly cloudy icon
            return {
              emoji: "⛅️",
              image: "./weathericons/cloudsunny.svg"
            }
        } else {
          // Rainy icon
          return {
            emoji: "🌧",
            image: "./weathericons/rainy.svg"
          }
        }
    };

    // return (
    //     // <div className="container">
    //     //     <h2>Weather Application</h2>
    //     //     <input
    //     //         type="text"
    //     //         value={cityInput}
    //     //         onChange={(e) => setCityInput(e.target.value)}
    //     //         placeholder="Enter city names separated by commas"
    //     //         className="centeredInput"
    //     //     />
    //     //     <button onClick={getWeather}>Get Weather</button>
    //     //     <div className="resultsBox">
    //     //         {weatherData.map(cityData => (
    //     //             <div key={cityData.city} className="cityBox">
    //     //                 <h3>{cityData.city.toUpperCase()}</h3>
    //     //                 <p>Weather Description: {cityData.weather_description}</p>
    //     //                 <p>Temperature: {cityData.temperature}°C {getWeatherIcon(cityData.temperature)}</p>
    //     //                 <p>Humidity: {cityData.humidity}%</p>
    //     //             </div>
    //     //         ))}
    //     //     </div>
    //     //     <ToastContainer /> {/* Toast container for displaying toast messages */}
    //     // </div>
    // );
    return (
        <div className="container sky">
            <div className="stars"></div>
            <h2>Weather App</h2>
            {/* <input
                type="text"
                value={cityInput}
                placeholder="city names separated by commas"
                className="centeredInput searchInput"
            /> */}
            <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city names separated by commas"
                className="centeredInput searchInput"
            />
    
            {/* Function to evaluate the current input (has three cities with (, separated)..) if falsy => add "disabled"-class to it and also add disabled as attribute button */}
            <button className="{`btn-getweather ${buttonDisabled ? 'disabled' : ''}`}"  onClick={getWeather}>Get Weather</button>
    
            <div className="resultsBox">
                {/* Loop through an array of cities and generate JSX for each city */}
                {weatherData.map((city, index) => (
                    <div className={`cityData ${index === 0 ? 'firstCity' : index === 1 ? 'secondCity' : 'thirdCity'}`} key={index}>
                        <img className="weather-icon" src={getWeatherIcon(city.temperature).image} alt="" />
                        <div className="_content">
                            <h3 className="_location">{city.city.toUpperCase()}</h3>
                            <p className="_description">{city.weather_description}</p>
                            <p className="_temperature">{city.temperature}</p>
                            <p className="_humidity">Humidity ~ {city.humidity}</p>
                        </div>
                    </div>
                ))}
                {/* Loop through an array of cities and generate JSX for each city */}
            </div>
        <ToastContainer /> {/* Toast container for displaying toast messages */}

        </div>
    );
    
}
export default WeatherApp;
