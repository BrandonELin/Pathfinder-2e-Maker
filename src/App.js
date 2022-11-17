import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./components/Navigationbar";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Characters from "./pages/Characters";
import Classes from "./pages/Classes";
import userService from './services/userService'
import NewCharacter from "./pages/NewCharacter";

let initialRender = true

function App() {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [classes, setClasses] = useState([])
    const [ancestries, setAncestries] = useState([])
    const [background, setBackground] = useState([])
    const [characters, setCharacters] = useState([])

    const getClasses = async () => {
      try {
        const response = await fetch(
          `https://api.pathfinder2.fr/v1/pf2/class`,{
            headers: {
              Authorization: 'da468b89-2bf8-4e2b-a939-79c6e6ef25ce'
            }
          }
        );
        const data = await response.json();
        setClasses(data.results);
      } catch (err) {
        console.log("ERROR! OH NO!!");
        console.log(err);
      }
    };

    const getAncestries = async () => {
        try {
          const response = await fetch(
            `https://api.pathfinder2.fr/v1/pf2/ancestry`,{
              headers: {
                Authorization: 'da468b89-2bf8-4e2b-a939-79c6e6ef25ce'
              }
            }
          );
          const data = await response.json();
          setAncestries(data.results);
        } catch (err) {
          console.log("ERROR! OH NO!!");
          console.log(err);
        }
      };

      const getBackground = async () => {
        try {
          const response = await fetch(
            `https://api.pathfinder2.fr/v1/pf2/background`,{
              headers: {
                Authorization: 'da468b89-2bf8-4e2b-a939-79c6e6ef25ce'
              }
            }
          );
          const data = await response.json();
          setBackground(data.results);
        } catch (err) {
          console.log("ERROR! OH NO!!");
          console.log(err);
        }
      };

    const currentUserInfo = async () => {
        try {

            const info = await userService.info()

            const { username, email } = info.data
            setUser({ username, email })
            
        } catch (error) {

            let message = error.response.data.error

            if (message.includes('expire')) {
                localStorage.removeItem('token')
            }
            
            console.log(message)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {

        let token = localStorage.getItem('token')

        if (initialRender) {
            if (token) {
                currentUserInfo(token)
                initialRender = false
            } else {
                setIsLoading(false)
            }
        }

    }, []) 

    let routes;
    let loggedIn = user.username

    if (!isLoading) {
        if (loggedIn) {
            routes = (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                        path="/profile" 
                        element={
                            <Profile 
                                username={user.username} 
                                email={user.email} 
                            />
                        } 
                    />
                    <Route path='/newCharacter' element={<Characters user={user.username} ancestries={ancestries} background={background} classes={classes} getClasses={getClasses} getAncestries={getAncestries} getBackground={getBackground} characters={characters} setCharacters={setCharacters}/>} />
                    <Route path='Characters' element={<NewCharacter user={user.username} characters={characters} setCharacters={setCharacters} />}/>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )
        } else {
            routes = (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register setUser={setUser} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/classes" element={<Classes classes={classes} getClasses={getClasses} />} />
                    {/* <Route path="/ancestries" element={<Ancestries ancestries={ancestries} getAncestries={getAncestries} />} />
                    <Route path="/background" element={<Background background={background} getBackground={getBackground} />} /> */}
                </Routes> 
            )
        }
    }

    return ( 
        <div className="app">
            <Navigationbar user={user.username} setUser={setUser} />
            {routes}
        </div>
     );
}

export default App;