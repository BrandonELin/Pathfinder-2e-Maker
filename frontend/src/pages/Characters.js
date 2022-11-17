import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import characterService from '../services/characterService'

function Characters ({ user,classes, background, ancestries, getClasses, getBackground, getAncestries, characters, setCharacters }) {

    const navigate = useNavigate()
    let nameRef = useRef()
    let ancestryRef = useRef()
    let backgroundRef = useRef()
    let classRef = useRef()

    const getAllCharacters = async () => {
        try {
            const response = await characterService.index()
            setCharacters(response.data.characters)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCharacters()
        console.log(user)
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
            const response = await characterService.add(newCharacter)
            setCharacters([...characters, response.data.character])
            navigate('/characters')
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div>
            <h1>New Character</h1>

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" ref={nameRef} /><br />
                <label>Ancestry:</label>
                <select id="genre" name="genre" ref={ancestryRef}>
                    {ancestries.map((a) => {
                        return(
                            <option key={a._id} value={a.name}>{a.name}</option>
                        )
                    })}
                </select> <br/>
                <label>Background:</label>
                <select id="genre" name="genre" ref={backgroundRef}>
                    {background.map((b) => {
                        return(
                            <option key={b._id} value={b.name}>{b.name}</option>
                        )
                    })}
                </select> <br/>
                <label>Class:</label>
                <select id="genre" name="genre" ref={classRef}>
                    {classes.map((c) => {
                        return(
                            <option key={c._id} value={c.name}>{c.name}</option>
                        )
                    })}
                </select> <br/>
                <button>Add Character</button>
            </form>
        </div>
    );
}

export default Characters;