import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './contexts/AuthContext'
import { MainProvider } from './contexts/MainContext'
import './index.sass'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MainProvider>
        <App/>
      </MainProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
