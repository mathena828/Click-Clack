import { useState, useEffect } from "react";
import axios from "axios";
import {Form, Button, Alert} from 'react-bootstrap'

const server = "http://localhost:5000";

const JoinScreen = () => {
  const [name, setName] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");

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
      const { data } = await axios.post(
        server + "/api/chat/channels",
        { name },
        config
      );
    } catch (error) {
      console.log(error)
    }
  };

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
      <Form onSubmit={joinHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>New Channel</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}
              value={name}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
      </Form>
    </div>
  );
};

export default JoinScreen;