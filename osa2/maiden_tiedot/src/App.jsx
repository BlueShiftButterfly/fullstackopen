import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const CountryWeather = (props) => {
  return (
    <div>
      
    </div>
  )
}

const Country = (props) => {
  if (!props.country){
    return null
  } 
  return (
    <li>
      <h2>{props.country.name.common}</h2>
      <p>Official name: {props.country.name.official}</p>
      <img src={props.country.flags.png} alt={props.country.flags.alt}></img>
      <p>Capital: {props.country.capital[0]}</p>
      <p>Area: {props.country.area} km²</p>
      <p>Population: {props.country.population}</p>
      <p>Languages:</p>
      <ul>
        {Object.keys(props.country.languages).map( languageKey => 
          <li key={languageKey}>{props.country.languages[languageKey]}</li>
        )}
      </ul>
    </li>
  )
}

const CountryList = (props) => {
  if (props.countries === null || !Array.isArray(props.countries)){
    return null
  }
  if (props.countries.length >= 10){
    return <p>Too many matches ({props.countries.length})</p>
  }
  if (props.countries.length <= 0){
    return (
      <p>No matches found</p>
    )
  }
  if (props.countries.length === 1){
    return (
      <div>
        <Country country={props.countries[0]}></Country>
      </div>
    )
  }
  return (
    <div>
      <p>{props.countries.length} matches found</p>
      <ul>
        {props.countries.map( country => 
          <li key={country.ccn3}>
            {country.name.common}  <button type="button" onClick={() => props.showButtonClickFunction(country.name.common.toLowerCase())}>Show</button>
          </li> 
        )}
      </ul>
    </div>
  )
}

const CountrySearch = (props) => {
  return (
    <div>
      <h1>Country Search</h1>
      <form>
        <label>Search countries: </label>
        <input id="country_input" type="text" onChange={props.textChangeHandler}></input>
      </form>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState("")
  const countriesToDisplay = (searchText === "")
  ? countries
  : countries.filter(
    country => country.name.common.toLowerCase().includes(searchText.toLowerCase())
  )

  useEffect(() => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      console.log(`Fetched country data of ${response.data.length} countries`)
      setCountries(response.data)
    })
  }, [])
  console.log(countriesToDisplay)
  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleShowTextButton = (value) => {
    setSearchText(value)
  }

  return (
    <div>
      <CountrySearch textChangeHandler={handleSearchChange}></CountrySearch>
      <CountryList countries={countriesToDisplay} showButtonClickFunction={handleShowTextButton}></CountryList>
    </div>
  )
}

export default App
