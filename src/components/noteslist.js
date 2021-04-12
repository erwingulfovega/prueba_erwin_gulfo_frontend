import React, { Component } from 'react'
import axios from 'axios';
import {format} from 'timeago.js';
import {Link, link} from 'react-router-dom';

export default class NotesList extends Component {

    state ={
       notes: []
    }

    componentDidMount(){
        this.getNotes();
    }

    async getNotes(){

        const res = await axios.get("http://localhost:4000/api/notes");
        this.setState({ notes: res.data });

    }

    deleteNote = async (id) => {
        console.log(id);
        await axios.delete("http://localhost:4000/api/notes/"+id);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(
                        note => (
                            <div className="col-md-4 p-2" key={note._id}>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                     Titulo: {note.title}
                                    <Link className="btn btn-secondary" to={"/edit/"+note._id}>
                                        Editar
                                    </Link>
                                    </div>
                                    <div className="card-body">
                                        <p>Autor: {note.author}</p>
                                        <p>Contenido: {note.content}</p>
                                        <p>Fecha: {format(note.date)}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
        )
    }
}
