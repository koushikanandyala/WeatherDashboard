import React, {useEffect, useState} from 'react'
import axios from 'axios'
const API_KEY = 'https://openweathermap.org/'

function Weather({city}) {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        )
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
        )

        setCurrentWeather(weatherResponse.data)
        setForecast(forecastResponse.data.list.slice(0, 5))
        setError('')
      } catch (err) {
        setError('City not found ,Please try again')
      }
    }

    fetchWeather()
  }, [city])

  if (error) {
    return <p>{error}</p>
  }

  if (!currentWeather) {
    return <p>Loading...</p>
  }
  return (
    <div className="weather">
      <h1>{currentWeather.name}</h1>
      <p>{currentWeather.Weather[0].description}</p>
      <p>Temp: {currentWeather.main.temp} C</p>
      <p>Humidity: {currentWeather.main.humidity} %</p>
      <p>Wind: {currentWeather.main.wind.speed} m/s</p>

      <h1>5-Day Forecast</h1>
      <div className="forecast">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt_txt).toDateString()}</p>
            <p>{day.Weather[0].description}</p>
            <p>Temp: {day.main.temp} C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Weather
