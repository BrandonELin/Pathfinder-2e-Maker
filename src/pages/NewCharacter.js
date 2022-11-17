import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import characterService from '../services/characterService'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Characters ({ user, characters, setCharacters }) {

    const getAllCharacters = async () => {
        try {
            const response = await characterService.index()
            setCharacters(response.data.characters)
        } catch (error) {
            console.log(error)
        }
    }

    const editCharacter = (id) => {
        navigate(`/${id}`)
    }

    const navigate = useNavigate()

    useEffect(() => {
        getAllCharacters()
    }, [])

    return ( 
        <div>
            <h1>Characters</h1>

            <ol style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                padding: '20px'
            }}>
                {characters.map((c) =>{
                    return(
                        <Card key={c._id} className="bg-dark text-white" style={{width: '30vw'}}>
                            <Card.Title >{c.name}</Card.Title>
                            Ancestry: {c.ancestry} <br/>
                            Background: {c.background} <br/>
                            Class: {c.class} <br/>
                            <Button href={`${c._id}`}>Edit</Button>
                        </Card>
                    )
                })}
            </ol>
            <Button href='/newCharacter'>New Character</Button>
        </div>
    );
}

export default Characters;