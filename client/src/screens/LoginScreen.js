import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Form, Button, Alert} from 'react-bootstrap'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
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
        "/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">
          {error}
      </Alert> }
      <Form onSubmit={loginHandler}>
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
          <Button variant="primary" type="submit">
            Login
          </Button>
      </Form>
      <span>
          Don't have an account? <Link to="/register">Register</Link>
      </span>
    </div>
  );
};

export default LoginScreen;