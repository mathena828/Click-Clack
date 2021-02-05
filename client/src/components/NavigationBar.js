import React, {useContext} from "react";
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { UserContext } from "../App";


const NavigationBar = () => {

  const [user, setUser] = useContext(UserContext);

  const logoutHandler = () => {
      setUser(null);
      localStorage.removeItem("authToken");
  };
    
  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
          <LinkContainer to="/">
            <Navbar.Brand>Hello World</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
          </Nav>
          {
            localStorage.getItem("authToken") != null ? (
              <Nav className="ml-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/chat">
                    <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/join">
                    <Nav.Link>Join</Nav.Link>
                </LinkContainer>
                <LinkContainer to="#logout">
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            )
          }    
      </Navbar>
    </React.Fragment>
  );
};

export default NavigationBar;