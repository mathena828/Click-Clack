import { useState, useEffect} from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import {Form, Button, Alert, Container} from 'react-bootstrap'

const server = "http://localhost:5000";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
      window.location.reload();
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        server + "/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCookie('user', data.user, { path: '/' });
      window.location.reload();
      history.push("/");
    } catch (error) {
      if (error.response.data || error.response) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container fluid className="p-5">
      <h1>Welcome Back
        <span>
            <img  
            width={50}
            height={50}
            className="ml-2 mb-2"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png" 
            alt="hello"/>
        </span> </h1>
      <h5 className="mb-4">Sign in with your email and password to keep the <b className="underline-black">conversation</b> going.</h5>
      {error && <Alert variant="danger">
          {error}
      </Alert> }
      <Form onSubmit={loginHandler}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
              value={email}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
              value={password}/>
          </Form.Group>
          <Button type="submit">
            Login
          </Button>
      </Form>
      <hr></hr>
      <span>
          Don't have an account? <Link to="/register">Sign Up</Link>
      </span>
    </Container>
  );
};

export default LoginScreen;