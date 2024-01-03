import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [error, setError] = useState('');
    const [buttonColor, setButtonColor] = useState('');

    const fetchWeather = async () => {
        try {
            setButtonColor('green');
            const response = await axios.get(`https://ahmed-hesham-weatherpp.onrender.com/weather/${city}`);
            const weatherInfo = response.data.result;
            setWeatherData(weatherInfo);
            setError('');

            setTimeout(() => {
                setCity('');
                setButtonColor('');
            }, 2000);
        } catch (err) {
            console.log(err);
            const errorMessage = 'Invalid Ciry';
            toast.error(errorMessage)
            setWeatherData('');
            setButtonColor('');
        }
    };

    useEffect(() => {
        setError('');
    }, [city]);



    return (
        <div className='App mx-auto'>
            <h1>W E A T H E R  A P P</h1>
            <input type='text' placeholder='Enter a city' value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={fetchWeather} style={{ backgroundColor: buttonColor }}>
                Get Weather
            </button>
            {error && <p className='error'>{error}</p>}
            {weatherData ? (
                <div className='results mx-auto'>
                    <div className='name '>
                        <h2>{weatherData.name}</h2>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <p className='single_result'>
                                <h5 className=''>Temperature : {(weatherData.main.temp - 273).toFixed(0)}°C</h5>                                
                                <span class="material-symbols-outlined ">
                                    thermostat
                                </span>
                            </p>
                            <p >
                                <h5>
                                    Description : {weatherData.weather[0].description}
                                </h5>
                                <span class="material-symbols-outlined blue">
                                    partly_cloudy_day
                                </span>
                            </p>
                        </div>
                        <div className='col-md-6'>
                            <p className='single_result'>
                                <h5>
                                    Feels like : {(weatherData.main.feels_like - 273).toFixed(0)}°C
                                </h5>
                                <span class="material-symbols-outlined blue">
                                    device_thermostat
                                </span>
                            </p>
                            <p >
                                <h5>
                                    Humidity : {weatherData.main.humidity}%
                                </h5>
                                <span class="material-symbols-outlined blue">
                                    humidity_percentage
                                </span>
                            </p>
                        </div>
                        <div className='col-md-12'>
                            <p>
                                <h5>
                                    Pressure : {weatherData.main.pressure}
                                </h5>
                                <span class="material-symbols-outlined red">
                                    compare_arrows
                                </span>
                            </p>
                            <p>
                                <h5>
                                    Wind Speed : {weatherData.wind.speed}m/s
                                </h5>
                                <span class="material-symbols-outlined blue">
                                    air
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className='text-center mt-4'></p>
            )}
            <ToastContainer />
        </div>
    );
}

export default App;
