import React from 'react'
import './header.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Header(){
    return(
        <div className="Header">
            <h1>Header</h1>
            <nav>
              <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
        </div>
    );
    
}

export default Header;