import { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap'
import axios from "axios";
import { useCookies } from 'react-cookie';

const server = "http://localhost:5000";

const JoinScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formChannel, setFormChannel] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cookies,] = useCookies(['user']);

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
        { name, description, userId: cookies.user._id },
        config
      ).then((res) => { 
        if (res.data.success) {
          setSuccess("You successfully created a channel. Check it out under the Chat tab.");
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        }console.log(res) });
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
        if (res.data.success) {
          setSuccess("You successfully joined a channel. Check it out under the Chat tab.");
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
    isTeacher = 
      <Card body bg="dark" text="light" className="shadow">
        <h3>Create a <b className="underline-white-2">new channel</b> for your students.</h3>
        <Form onSubmit={joinHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control className="new-channel-input" type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}
              value={name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control className="new-channel-input" as="textarea" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}
              value={description} />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Create Channel
          </Button>
        </Form>
      </Card>
  } else {
    isTeacher = <div></div>
  }
  return (
    <Container fluid>
      {error && <Alert variant="danger">
        {error}
      </Alert>}
      {success && <Alert variant="success">
        {success}
      </Alert>}
      <Row>
        <Col sm={12} md={6} className="py-4">
            <Card border="primary" className="shadow">
              <Card.Header className="pb-0 join-card-header">
              <h3><b>Join Channel</b><span>
                <img
                  width={40}
                  height={40}
                  className="ml-2 mb-2"
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/speech-balloon_1f4ac.png"
                  alt="hello" />
              </span></h3>
              </Card.Header>
              <Card.Body className="join-card-body">
                <Form onSubmit={newParticipantHandler}>
                  <Form.Group>
                    <Form.Label>Invite Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter invite code" onChange={(e) => setFormChannel(e.target.value)}
                      value={formChannel} />
                  </Form.Group>
                  <Button type="submit" variant="primary">Join Channel</Button>
                </Form>
              </Card.Body>
            </Card>
        </Col>
        <Col sm={12} md={6} className="py-4">{isTeacher}</Col>
      </Row>
    </Container>
  )
}


export default JoinScreen;