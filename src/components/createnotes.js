import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {format} from 'timeago.js';

export default class CreateNotes extends Component {

    state ={
        users: [],
        notes: [],
        userSelected: '',
        _id: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false
    }
    async componentDidMount(){
        const res = await axios.get("http://localhost:4000/api/users");
        this.setState({
            users: res.data.map(user =>user.username),
            userSelected: res.data[0].username
        });

        if(this.props.match.params.id){
            const res = await axios.get("http://localhost:4000/api/notes/"+this.props.match.params.id)
            console.log(res.data);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
                
            })
            console.log("Fecha: "+res.data.date);
        }
        //console.log(this.state.users);
    }

    onSubmit = async (e) => {
        //console.log(this.state.content, this.state.title, this.state.userSelected); 
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.userSelected,
            date: new Date(this.state.date)
        }
        if(this.state.editing){
            await axios.put("http://localhost:4000/api/notes/"+this.state._id, newNote);
        }else{
            await axios.post("http://localhost:4000/api/notes", newNote);    
        }
        window.location.href ="/";
        
    }

    onInputChange = (e) => {
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date })
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear Notas</h4>
                    {/**SELECT PARA EL USUARIO */}
                    <div className="form-group">
                            <select 
                            className="form-control" 
                            name="userSelected" onChange={this.onInputChange}
                            value={this.state.userSelected}
                            required
                            >
                                {
                                    this.state.users.map(user => 
                                    <option key={user} value={user}>
                                        {user}
                                    </option>)
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <input type="text" 
                               className="form-control" 
                               placeholder="Título" 
                               name="title" required 
                               onChange={this.onInputChange}
                               value={this.state.title}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <textarea 
                               className="form-control" 
                               placeholder="Contenido" 
                               name="content" 
                               required 
                               onChange={this.onInputChange}
                               value={this.state.content}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <DatePicker 
                                 className="form-control"
                                 selected={this.state.date}
                                 onChange={this.onChangeDate}
                                 value={ this.state.date}
                                 required
                                 />
                        
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
