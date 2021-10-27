import React from "react";
import { Table } from "reactstrap";

const GitRepo = ({ getRepo, n1,n2 }) => {

    let nRepos = getRepo.slice(Number(n1), Number(n2));
        

    return (
        nRepos.map((element) => (
            <ul key={element.id}>
                <li>Nome: {element.name}</li>
                <li>Descrição: {element.description}</li>
                <li>Estrelas: {element.stargazers_count}</li>
            </ul>
        ))
    );
}

export default GitRepo;