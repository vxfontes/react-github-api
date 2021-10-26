import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./UserGit.css";
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

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
            <div className="pesquisa">
                <InputGroup>
                    <Input value={search} onChange={((e) => setSearch(e.target.value))} />
                    <InputGroupAddon addonType="prepend"><Button onClick={searchGit} outline color="info">Pesquisar</Button>{' '}</InputGroupAddon>
                </InputGroup>
            </div>


            {/* repositorios a direita e informações a esquerda 
                - necessários criar divs
                - cuidar do tamanho da imagem
                - utilização de container -> grid
            */}
            <div className="card">
                <img src={image} />
                <h3>Nome: {name}</h3>
                <h3>Bio: {bio}</h3>
                <h3>Localização: {location}</h3>

                <h3>Repositórios: </h3>
                <div>
                    {repo.map((element) => (
                        <ul key={element.id}>
                            <li>Nome: {element.name}</li>
                            <li>Descrição: {element.description}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    );
}