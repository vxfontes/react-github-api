import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import './UserGit.css';
import { Button } from 'react-bootstrap';

export default function User() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [search, setSearch] = useState("");
    const [repo, setRepo] = useState([]);

    function searchGit() {
        axios.get(`https://api.github.com/users/${search}`)

            .then((body) => {
                console.log(body);
                setName(body.data.name);
                setBio(body.data.bio);
                setLocation(body.data.location);
                setImage(body.data.avatar_url);
            })

            .catch((error) => {
                console.log(error);
                setName("nada");
                setBio("não existe");
                setLocation("nothing");
                setImage("nadinha");
            })
    }

    /*function handleChange(event) {
        setSearch(event.target.value);
    }*/

    useEffect(() => {

        axios.get(`https://api.github.com/users/${search}/repos`)

            .then((body) => {
                console.log(body)
                setRepo(body.data)
            })

            .catch((error) => {
                console.log(error)
                setRepo([])
            })


    }, [name])

    return (
        <>
            {/* Botão de pesquisa não estatico
            <div className="pesquisa">
                <input value={search} onChange={handleChange} />
                <button onClick={searchGit}>Pesquisar</button>
            </div>*/}

            {/* Botão de pesquisa não estatico usando aerofunction*/}
            <div className="pesquisa">
                <input value={search} onChange={((e) => setSearch(e.target.value))} />
                <button onClick={searchGit}>Pesquisar</button>
            </div>

            <img src={image} />
            <div className="card">
                <h3>Nome: {name}</h3>
                <h3>Bio: {bio}</h3>
                <h3>Localização: {location}</h3>
            </div>
            <h3>Repositórios: </h3>
            <div>
                {/* aerofunction utiliza () ao inves de {} dentro do html */}
                {repo.map((element) => (
                    <ul key={element.id}>
                        <li>Nome: {element.name}</li>
                        <li>Descrição: {element.description}</li>
                    </ul>
                ))}
            </div>
            <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

            <script
                src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                crossorigin></script>

            <script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossorigin></script>

            <script>var Alert = ReactBootstrap.Alert;</script>
        </>
    );
}