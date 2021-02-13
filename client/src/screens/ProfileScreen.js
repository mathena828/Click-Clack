import {Container} from 'react-bootstrap'
import { useCookies } from 'react-cookie';
const SERVER = "http://localhost:5000";
const ProfileScreen = ({ history }) => {
  const [cookies, ] = useCookies(['user']);
    return (
      <Container fluid className="p-5">
        <h1 className="mb-3">Hello, <mark>{cookies.user.username}</mark> 
          <span>
              <img  
              width={50}
              height={50}
              className="ml-2 mb-2"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png" 
              alt="hello"/>
          </span> 
        </h1>
        <h5 className="mb-3">{cookies.user.bio}</h5>
        {cookies.user.email}
        {cookies.user.school}
        {cookies.user.country}
      </Container>
    );
  };
  
  export default ProfileScreen;