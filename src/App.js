import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./components/Navigationbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Todos from "./pages/Todos";

import userService from './services/userService'

let initialRender = true

function App() {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([])

    const getCoffee = async (temp) => {
      try {
        const response = await fetch(
          `https://api.pathfinder2.fr/v1/pf2/class${temp}`
        );
        const data = await response.json();
        console.log(data);
        setList(data);
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
                    <Route path='/todos' element={<Todos user={user.username} />} />
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