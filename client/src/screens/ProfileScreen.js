import { useEffect, useState } from 'react';
import {Container, Card, ListGroup} from 'react-bootstrap'
const ProfileScreen = ({ history }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUser(data);
    console.log(data)
  }, []);
    return (
      <Container fluid className="p-5">
        <h1 className="mb-3">Hello, <mark>{user.username}</mark> 
          <span>
              <img  
              width={50}
              height={50}
              className="ml-2 mb-2"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png" 
              alt="hello"/>
          </span> 
        </h1>
        <h5 className="mb-3">{user.bio}</h5>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>{user.email}</ListGroup.Item>
            <ListGroup.Item>{user.country}</ListGroup.Item>
            <ListGroup.Item>{user.school}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    );
  };
  
  export default ProfileScreen;