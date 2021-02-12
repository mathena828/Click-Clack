import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Form, Button, Alert, Container} from 'react-bootstrap'
import { UserContext } from "../App";

const server = "http://localhost:5000";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        server + "/api/users/register",
        {
          username,
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container fluid className="p-5">
       <h1>Get Started
        <span>
            <img  
            width={50}
            height={50}
            className="ml-2 mb-2"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/rocket_1f680.png" 
            alt="hello"/>
        </span> </h1>
      <h5 className="mb-4">Create an account to join the <b className="underline-black">dialogue</b> and shape the future one message at a time.</h5>
      {error && <Alert variant="danger">
          {error}
      </Alert> }
      <Form onSubmit={registerHandler}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}
            value={username}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
            value={email}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
            value={password}/>
        </Form.Group>
        <Button type="submit">
          Register
        </Button>
      </Form>
      <hr></hr>
      <span>
          Already have an account? <Link to="/login">Sign In</Link>
      </span>
    </Container>
  );
};

export default RegisterScreen;