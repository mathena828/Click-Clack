import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from 'react-bootstrap'
import { useCookies } from 'react-cookie';

const server = "http://localhost:5000";

const JoinScreen = () => {
  const [name, setName] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    const checkPrivate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/chat/channels", config);
        setChannels(data.channels)
      } catch (error) {
        console.log(error)
      }
    };
    checkPrivate();
  }, []);

  const joinHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.post(
        server + "/api/chat/channels",
        { name, userId:cookies.user._id },
        config
      ).then((res)=>{console.log(res)});
    } catch (error) {
      console.log(error)
    }
  };

  let isTeacher;
  if (cookies.user.isTeacher) {
    isTeacher = <Container>
      <h3>Create a new channel for your students</h3>
    <Form onSubmit={joinHandler}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>New Channel</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}
          value={name} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
    </Button>
    </Form>
    </Container>
  }else{
    isTeacher = <div></div>
  }
  return error ? (
    <Alert variant="danger">
      {error}
    </Alert>
  ) : (
    <div>
        {channels.map((channel) => (
          <tr key={channel._id}>
            <td>{channel.name}</td>
            <td>{channel.participants}</td>
          </tr>
        ))}

        {isTeacher}
        <Container style={{marginTop: '1em'}}>
          <h5>Join a Channel!</h5>
        </Container>
    </div>
  );
};

export default JoinScreen;