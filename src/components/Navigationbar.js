import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigationbar({ user, setUser }) {

    const logout = () => {
        setUser({})
        localStorage.removeItem("token")
    }

    if (user) {
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            Wayfinder
                        </Navbar.Brand>
                        <Navbar.Text>
                            Welcome {user}!
                        </Navbar.Text>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/characters">
                                Characters
                            </Nav.Link>
                            <Nav.Link as={Link} to="/Profile">
                                Profile
                            </Nav.Link>
                            <Nav.Link as={Link} to="/classes">
                                Classes
                            </Nav.Link>
                            <Nav.Link as={Link} to="/background">
                                Background
                            </Nav.Link>
                            <Nav.Link as={Link} to="/ancestries">
                                Ancestries
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    } else {
        return (

            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            Wayfinder
                        </Navbar.Brand>
                        <Navbar.Text>
                            Welcome {user}!
                        </Navbar.Text>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                            <Nav.Link as={Link} to="/classes">
                                Classes
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default Navigationbar;