import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./UserGit.css";
import {
    Button, Input, InputGroup, InputGroupAddon,
    Container, Row, Col, Card, CardBody,
    CardTitle, CardSubtitle, Fade, Table
} from 'reactstrap';
import GitRepo from "./GitRepo";


export default function User() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [search, setSearch] = useState("");
    const [repo, setRepo] = useState([]);

    // mostrar repositorios ao clicar
    const [fadeIn, setFadeIn] = useState(false);
    const toggle = () => setFadeIn(!fadeIn);

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
                setName("Usuário GitHub");
                setBio("Usuário GitHub");
                setLocation("Usuário GitHub");
                setImage();
                window.alert("Usuário não encontrado");
            })
    }


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

            <div>
                <Container>
                    <Row>
                        {/* coluna da esquerda com as informações do usuario */}
                        <Col>
                            <Card>
                                <div className="minhaImagem"><img width="100%" src={image} /></div>
                                <CardBody>
                                    <CardTitle tag="h5">Nome: {name}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Biografia: {bio}</CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Localização: {location}</CardSubtitle>
                                    <Button style={{ marginTop: '10px' }} onClick={toggle} color="info">Mostrar repositórios</Button>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* coluna da direita que mostra os Repositórios */}
                        <Col>
                            <Card>
                                <CardTitle className="titlee" tag="h5">Repositórios: </CardTitle>
                                <Fade in={fadeIn}>

                                    {/* Apenas os 6 primeiros repositórios devem ser exibidos, dispostos
                                        numa tabela de cartões de 3 linhas e 2 colunas.
                                    Os repositórios deverão exibir as seguintes informações: Título,
                                        descrição e quantidade de estrelas. */}
                                    <Table className="tabela">
                                        <tbody>
                                            <tr>
                                                <td><GitRepo getRepo={repo} n1={0} n2={1} /></td>
                                                <td><GitRepo getRepo={repo} n1={1} n2={2} /></td>
                                            </tr>
                                            <tr>
                                                <td><GitRepo getRepo={repo} n1={2} n2={3} /></td>
                                                <td><GitRepo getRepo={repo} n1={3} n2={4} /></td>
                                            </tr>
                                            <tr>
                                                <td><GitRepo getRepo={repo} n1={4} n2={5} /></td>
                                                <td><GitRepo getRepo={repo} n1={5} n2={6} /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Fade>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}