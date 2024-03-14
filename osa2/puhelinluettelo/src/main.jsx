import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

promise.then(response => {
  console.log(response.data)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
