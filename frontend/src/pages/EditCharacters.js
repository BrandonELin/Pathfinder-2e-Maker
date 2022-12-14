import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import characterService from '../services/characterService';
import Button from 'react-bootstrap/Button';

function EditCharacters ({ user,classes, background, ancestries, getClasses, getBackground, getAncestries, characters, setCharacters }) {

    const navigate = useNavigate()
    let nameRef = useRef()
    let ancestryRef = useRef()
    let backgroundRef = useRef()
    let classRef = useRef()
    let params = useParams()
    const [character, setCharacter] = useState([])

    const getCharacter = async () => {
        try {
            const response = await characterService.getCharacter(params.id)
            setCharacter(response.data.character)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacter()
    }, [])

    useEffect(() => {
        getClasses()
        getAncestries()
        getBackground()
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault()

        let newCharacter = {
            user,
            name: nameRef.current.value,
            class: classRef.current.value,
            ancestry: ancestryRef.current.value,
            background: backgroundRef.current.value
        }

        try {
            const response = await characterService.editCharacter(params.id, newCharacter)
            navigate('/characters')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        try {
            const response = await characterService.deleteCharacter(params.id)
            console.log(response)
            navigate('/characters')
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div>
            <h1>Edit Character</h1>

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" ref={nameRef} defaultValue={character.name}/><br />
                <label>Ancestry:</label>
                <select id="genre" name="genre" ref={ancestryRef}>
                    {ancestries.map((a) => {
                        return(
                            <option key={a._id} value={a.name} defaultValue={character.ancestry} >{a.name}</option>
                        )
                    })}
                </select> <br/>
                <label>Background:</label>
                <select id="genre" name="genre" ref={backgroundRef}>
                    {background.map((b) => {
                        return(
                            <option key={b._id} value={b.name} defaultValue={character.background}>{b.name}</option>
                        )
                    })}
                </select> <br/>
                <label>Class:</label>
                <select id="genre" name="genre" ref={classRef}>
                    {classes.map((c) => {
                        return(
                            <option key={c._id} value={c.name} defaultValue={character.class}>{c.name}</option>
                        )
                    })}
                </select> <br/>
                <button>Edit Character</button>
            </form>
            <Button onClick={handleDelete}>Delete Character</Button>
        </div>
    );
}

export default EditCharacters;