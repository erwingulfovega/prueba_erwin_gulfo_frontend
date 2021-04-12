import React, { Component } from 'react'
import axios from 'axios';
import {Link, link} from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {url} from '../config.js';

export default class CrearTipos extends Component {

    state = {
        tipos: [],
        tipo: '',
        nombre: '',
        editing: false
    }

    async componentDidMount(){
        this.getTipos();
        console.log(this.state.tipo);
    }

    getTipos= async () => {
        const res = await axios.get(url+"tipos");
        this.setState({ tipos: res.data});
    }

    onInputChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        const newTipos = {
            tipo: this.state.tipo,
            nombre: this.state.nombre,
        }
        if(this.state.editing){
            await axios.put(url+"tipos/"+this.state._id, newTipos);
        }else{
            await axios.post(url+"tipos/", newTipos);    
        }
        this.getTipos();
    }

    deleteTipo = async (id) => {
        console.log(id);
        await axios.delete(url+"tipos/"+id);
        this.getTipos();
    }

    editTipo = async (id) => {
        console.log(id);
        const res = await axios.get(url+"tipos/"+id);
        this.setState({ 
            _id     : res.data._id,
            tipo    : res.data.tipo,
            nombre  : res.data.nombre,
            editing : true
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Nuevo tipo de Recurso</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" name="tipo" 
                                    className="form-control" 
                                    placeholder="Código para el tipo de contenido"
                                    onChange={this.onInputChange}
                                    value={this.state.tipo}
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" name="nombre" 
                                    className="form-control" 
                                    onChange={this.onInputChange} 
                                    placeholder="Nombre del Tipo de contenido"
                                    value={this.state.nombre}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.tipos.map(
                                tipo => (
                                <tr>
                                <th scope="row">{tipo.tipo}</th>
                                <td>{tipo.nombre}</td>
                                <td>
                                    <div className="btn-group">
                                            <Link className="btn btn-secondary" onClick={() => this.editTipo(tipo._id)}>
                                                <FaEdit/>
                                            </Link>
                                            <button type="submit" className="btn btn-danger" onClick={() => this.deleteTipo(tipo._id)}>
                                                <FaTrashAlt/>
                                            </button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        }  
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
