import React from "react";
import { Table } from "reactstrap";

const GitRepo = ({ getRepo }) => {

    let nRepos = getRepo.slice(0,6);
    return (
        nRepos.map((element) => (
            <ul key={element.id}>
                <li>Nome: {element.name}</li>
                <li>Descrição: {element.description}</li>
            </ul>
        ))
    );
}

export default GitRepo;