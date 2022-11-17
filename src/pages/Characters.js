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
            classRef.current.value = ''
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div>
            <h1>Characters</h1>

            <ol style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                padding: '20px'
            }}>
            </ol>

            <form onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} /><br /><br />
                <label htmlFor="genre">Genre:</label>
                <select id="genre" name="genre" ref={ancestryRef}>
                    {ancestries.map((a) => {
                        return(
                            <option value={a.name}>{a.name}</option>
                        )
                    })}
                </select>
                <select id="genre" name="genre" ref={backgroundRef}>
                    {background.map((b) => {
                        return(
                            <option value={b.name}>{b.name}</option>
                        )
                    })}
                </select>
                <select id="genre" name="genre" ref={classRef}>
                    {classes.map((c) => {
                        return(
                            <option value={c.name}>{c.name}</option>
                        )
                    })}
                </select>
                <button>Add Character</button>
            </form>
        </div>
    );
}

export default Characters;