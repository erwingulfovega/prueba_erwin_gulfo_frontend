import logo from './logo.svg';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'react-global-configuration'

import Navigation from './components/navigation';
import CreateNotes from './components/createnotes';
import CreateUsers from './components/createusers';
import ListarRecursos from './components/listarrecursos';
import NotesList from './components/noteslist';
import CrearRecursos from './components/crearrecursos';
import CrearTipos from './components/creartipos';

const App = () => {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Route path="/" exact component={ListarRecursos} />
        <Route path="/edit/:id" component={CrearRecursos} />
        <Route path="/create" component={CreateNotes} />
        <Route path="/recurso" component={CrearRecursos} />
        <Route path="/user" component={CreateUsers} />
        <Route path="/tipos" component={CrearTipos} />
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
