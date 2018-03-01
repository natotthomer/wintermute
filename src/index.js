import React from 'react'
import ReactDOM from 'react-dom'

import App from './scripts/app'

import './styles/main.css'

const initializeApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', initializeApp)
