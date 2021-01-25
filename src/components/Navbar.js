import React from "react"
import { Link } from "react-router-dom"
export default class Navbar extends React.Component{
    render(){
        return (
            <div className="navbar navbar-expand-lg navbar-dark bg-primary">
                {/* brand */}
                <a className="navbar-brand">Telkom Schools</a>

                {/* button collapse */}
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/*  main menu */}
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}