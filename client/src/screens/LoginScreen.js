import { useState, useEffect, useContext} from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import {Form, Button, Alert} from 'react-bootstrap'
import { UserContext } from "../App";

const server = "http://localhost:5000";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(['user']);

  const [, setUser] = useContext(UserContext);

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
        server + "/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      setCookie('user', data.user, { path: '/' });
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