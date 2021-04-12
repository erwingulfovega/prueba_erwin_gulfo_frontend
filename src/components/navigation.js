import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../comision.png'

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="220px"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-link" to="/">
                            Inicio
                            </Link>
                            <Link className="nav-link" to="/recurso">
                            Recursos
                            </Link>
                            <Link className="nav-link" to="/tipos">
                            Tipos de recursos
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
