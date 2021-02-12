import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap'
import { useCookies } from 'react-cookie';

const server = "http://localhost:5000";

const JoinScreen = () => {
  const [name, setName] = useState('');
  const [formChannel, setFormChannel] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
        { name, userId: cookies.user._id },
        config
      ).then((res) => { console.log(res) });

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
  const newParticipantHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios.put(
        server + "/api/chat/channels/join",
        { channelId: formChannel, userId: cookies.user._id },
        config
      ).then((res) => { 
        console.log(res);
        if(res.data.success){
          setSuccess("Joined channel, check your chats now to see it");
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        } 
      });

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
  } else {
    isTeacher = <div></div>
  }
  return (
      <Container>
        {/* {channels.map((channel) => (
          <tr key={channel._id}>
            <td>{channel.name}</td>
            <td>{channel.participants}</td>
          </tr>
        ))} */}
        {error && <Alert variant="danger">
          {error}
      </Alert> }
      {success && <Alert variant="success">
          {success}
      </Alert> }
        <Row>
          <Col sm={12} md={6} style={{ backgroundColor: "#29b7ca" }} className="py-4">
            <Container >
              <h3 className="text-light">Join a Channel!</h3>
              <Form onSubmit={newParticipantHandler}>
                <Form.Group>
                  <Form.Label><span className="text-light">Channel Code</span></Form.Label>
                  <Form.Control type="text" placeholder="Enter channel code" onChange={(e) => setFormChannel(e.target.value)}
                    value={formChannel} />
                </Form.Group>
                <Button type="submit" variant="light">Join Channel</Button>
              </Form>
            </Container></Col>
          <Col sm={12} md={6} className="py-4">{isTeacher}</Col>
        </Row>
      </Container>
  );
};

export default JoinScreen;