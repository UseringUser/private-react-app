import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainMenu from './components/main/main'
import Header from './components/header/header'
import Login from './components/auth/login/login'
import Register from './components/auth/register/register'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { AppContext, AppProvider } from './AppContext'

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

function AppContent() {
  const { user, logout } = useContext(AppContext);

  return (
    <div>
      <div className="Header">
        <h1 className="title">React App</h1>
        <div className="links">
          {user ? (
            <>
              <span>Welcome, {user.username} </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App
