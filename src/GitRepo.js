import React from "react";
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import './GitRepo.css'

const GitRepo = ({ getRepo, n1, n2 }) => {

    let nRepos = getRepo.slice(Number(n1), Number(n2));


    return (
        nRepos.map((element) => (
            <ul key={element.id}>
                <Toast className='cartao'>
                    <ToastHeader>
                        {element.name}
                    </ToastHeader>
                    <ToastBody>
                        Descrição: {element.description} <br></br>
                        Estrelas: {element.stargazers_count}
                    </ToastBody>
                </Toast>
            </ul>
        ))
    );
}

export default GitRepo;