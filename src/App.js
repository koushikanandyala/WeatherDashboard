import React, {useState} from 'react'
import axios from 'axios'

import Weather from './Weather'

import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [submittedCity, setSubmittedCity] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setSubmittedCity(city)
  }

  return (
    <div className="app">
      <h1> Weather Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {submittedCity && <Weather city={submittedCity} />}
    </div>
  )
}

export default App
