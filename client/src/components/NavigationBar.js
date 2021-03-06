import React from "react";
import {Navbar, Nav, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const NavigationBar = () => {
  
  const logoutHandler = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      window.location.reload();
  };
    
  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
          <LinkContainer to="/">
            <Navbar.Brand>Click<span className="orange-text">Clack</span></Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
          </Nav>
          {
            localStorage.getItem("authToken") != null ?  (
              <Nav className="ml-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/chat">
                    <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
                <LinkContainer to="#logout">
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                 <LinkContainer to="/login">
                  <Button className="mr-2" variant="dark">Login</Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">Register</Button>
                </LinkContainer>
               
              </Nav>
            )
          }    
      </Navbar>
    </React.Fragment>
  );
};

export default NavigationBar;