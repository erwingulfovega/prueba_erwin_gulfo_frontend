import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {format} from 'timeago.js';
import {url} from '../config.js';
import moment from "moment";

export default class CrearRecursos extends Component {

    state ={
        tipos: [],
        recursos: [],
        tipoSelected: '',
        _id: '',
        editing: false,
     
    }
    async componentDidMount(){
        const res = await axios.get(url+"tipos");
        this.setState({
            tipos: res.data.map(tipo=>tipo.tipo),
            tipoSelected: res.data[0].tipo
        });
        //console.log(this.state.editing);
        if(this.props.match.params.id){
            const res = await axios.get(url+"recursos/"+this.props.match.params.id)
            this.setState({
                titulo       : res.data.titulo,
                tipoSelected : res.data.tipo,
                claves       : res.data.claves,
                descripcion  : res.data.descripcion,
                fecha_inicial: res.data.cobertura.fecha_inicial,
                fecha_final  : res.data.cobertura.fecha_final,
                ciudad       : res.data.cobertura.ciudad,
                lat          : res.data.cobertura.geopoint.lat,
                long         : res.data.cobertura.geopoint.long,           
                editing      : true,
                _id          : this.props.match.params.id
                
            })
            console.log("Respuesta: "+res.data);
        }
        //console.log(this.state.users);
    }

    onSubmit = async (e) => {
        //console.log(this.state.content, this.state.title, this.state.userSelected); 
        e.preventDefault();
        const newNote = {
            titulo     : this.state.titulo,
            tipo       : this.state.tipoSelected,
            claves     : this.state.claves,
            descripcion: this.state.descripcion,
            cobertura  :{
                          fecha_inicial: this.state.fecha_inicial,
                          fecha_final  : this.state.fecha_final,
                          ciudad       : this.state.ciudad,
                          geopoint     :{
                                            lat : this.state.lat,
                                            long: this.state.long
                                        }
                
                        }
        }
        if(this.state.editing){
            await axios.put(url+"recursos/"+this.state._id, newNote);
        }else{
            await axios.post(url+"recursos/", newNote);    
        }
        window.location.href ="/";
        
    }

    onInputChange = (e) => {
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChangeDateI = date => {
        this.setState({ fecha_inicial: date })
    }

    onChangeDateF = date => {
        this.setState({ fecha_final: date })
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear Recursos</h4>
                    {/**SELECT PARA EL USUARIO */}
                    <div className="form-group">
                        <input type="text" 
                               className="form-control" 
                               placeholder="Título" 
                               name="titulo" required 
                               onChange={this.onInputChange}
                               value={this.state.titulo}
                               required
                               />
                    </div>
                    <div className="form-group">
                            <select 
                            className="form-control" 
                            name="tipoSelected" onChange={this.onInputChange}
                            value={this.state.tipoSelected}
                            required
                            >
                                <option value="">Seleccione..</option>
                                {
                                    this.state.tipos.map(tipo => 
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>)
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <textarea 
                               className="form-control" 
                               placeholder="claves" 
                               name="claves" 
                               required 
                               onChange={this.onInputChange}
                               value={this.state.claves}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <textarea 
                               className="form-control" 
                               placeholder="descripción" 
                               name="descripcion" 
                               required 
                               onChange={this.onInputChange}
                               value={this.state.descripcion}
                               required
                               />
                    </div>
                    <div className="form-group">
                       <label>Cobertura</label>
                    </div>
                    <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <DatePicker 
                                        name="fecha_inicial"
                                        className="form-control"
                                        onChange={this.onChangeDateI}
                                        selected={moment(this.state.fecha_inicial).toDate()}
                                        placeholder="Fecha Inicial"
                                        required
                                        placeholderText="Fecha Inicial"
                                        />
                                </div>
                                                     
                                <div className="col-6">
                                    <DatePicker 
                                    name="fecha_final"
                                    className="form-control"
                                    onChange={this.onChangeDateF}
                                    selected={moment(this.state.fecha_final).toDate()}
                                    placeholderText="Fecha Final"
                                    required
                                    />
                                </div>
                            </div>
                    </div>
                    <div className="form-group">
                        <input type="text" 
                               className="form-control" 
                               placeholder="Ciudad" 
                               name="ciudad" required 
                               onChange={this.onInputChange}
                               value={this.state.ciudad}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <div class="row">
                            <div class="col-6">
                            <input type="text" 
                               className="form-control" 
                               placeholder="Latitud" 
                               name="lat" required 
                               onChange={this.onInputChange}
                               value={this.state.lat}
                               required
                               />
                            </div>
                            <div class="col-6">
                            <input type="text" 
                               className="form-control" 
                               placeholder="Longitud" 
                               name="long" required 
                               onChange={this.onInputChange}
                               value={this.state.long}
                               required
                               />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
