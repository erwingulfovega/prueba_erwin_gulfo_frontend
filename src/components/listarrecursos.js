import React, { Component } from 'react'
import axios from 'axios';
import {Link, link} from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {url} from '../config.js';


export default class ListarRecursos extends Component {

    state ={
       recursos: [],
       recursosBackup: [],
       textBuscar: '',
    }

    componentDidMount(){
        this.getRecursos();
    }
    
    async getRecursos(){
        
        try{
            const res = await axios.get(url+"recursos/");
            this.setState({ 
                recursos: res.data,
                recursosBackup: res.data
            });
        }catch{
            toast.error("Error al consultar los recursos bibliográficos");
        }
     
    }

    deleteRecurso = async (id) => {
        console.log(id);
        await axios.delete(url+"recursos/"+id);
        this.getRecursos();
    }

    filter(event){
        var text = event.target.value
        const data = this.state.recursosBackup
        const newData = data.filter(function(item){
        const itemData = item.titulo.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
        })
        this.setState({
            recursos: newData,
            text: text,
        })
    }
        
    render() {
        return (
            
            <div className="row">
                <input className="form-control col-md-4"
                type="text" 
                id="myInput" 
                name="search"   
                placeholder="Buscar por título"
                title="Ingresa un título"
                value={this.state.text}
                onChange={(text) => this.filter(text)}     
                />
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Claves</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Cobertura</th>
                        <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.recursos.map(
                                recurso => (
                                <tr>
                                <th scope="row">{recurso.titulo}</th>
                                <td>{recurso.tipo}</td>
                                <td>{recurso.claves}</td>
                                <td>{recurso.descripcion}</td>
                                <td>Fecha Inicial: {recurso.cobertura.fecha_inicial} <br/>
                                    Fecha Final:   {recurso.cobertura.fecha_final}   <br/>
                                    Ciudad     :   {recurso.cobertura.ciudad}        <br/>
                                    GeoPoint   :                                     <br/>  
                                                Lat:{recurso.cobertura.geopoint.lat} <br/>
                                                Long:{recurso.cobertura.geopoint.long}
                                </td>
                                <td>
                                    <div className="btn-group">
                                            <Link className="btn btn-secondary" to={"/edit/"+recurso._id}>
                                                <FaEdit/>
                                            </Link>
                                            <button type="submit" className="btn btn-danger" onClick={() => this.deleteRecurso(recurso._id)}>
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
        )
    }
}
