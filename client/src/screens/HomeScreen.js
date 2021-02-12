import {Container, Col, Row, Card} from 'react-bootstrap'
import Emoji from 'react-apple-emojis'

const HomeScreen = ({ history }) => {
  return (
    <div>
      <Container fluid className="home-top p-5">
        <Row>
          <Col className="px-5">
            <h1 className="slogan">Discover the <mark>world</mark>  
            <span>
                <img  
                width={50}
                height={50}
                className="ml-2 mb-2"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/globe-showing-americas_1f30e.png" 
                alt="world"/>
            </span> through dialogue.</h1> <hr></hr>
            <h5 className="subtext">Connect with an <b>international</b> <Emoji name="airplane" width={20} /> community of learners and educators. Explore new <b>perspectives</b> <Emoji name="eyes" width={20} />  and share your <b>ideas</b> <Emoji name="brain" width={20} />  with other students. Experience quality <b>education</b> <Emoji name="books" width={20} />  across borders.</h5>
          </Col>
        </Row>
      </Container>
      <Container fluid className="home-bottom p-5">
        <Row>
          <Col className="px-3">
            <h1 className="description-intro mb-5">Great <span className="underline-white">education</span> starts here. </h1> 
          </Col>
        </Row>
        <Row>
          <Col sm className="text-center">
            <Card body className="shadow mb-3">
                <img
                  width={80}
                  height={80}
                  className="mb-2"
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/writing-hand_270d-fe0f.png"
                  alt="student"
                />
                <h5 className="description">Empower students to become responsible <mark>global citizens</mark> and competent future leaders.</h5>
            </Card>
          </Col>
          <Col sm className="text-center">
              <Card body className="shadow mb-3">
                <img
                  width={80}
                  height={80}
                  className="mb-2"
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/school_1f3eb.png"
                  alt="chat"
                />
                <h5 className="description">Create virtual spaces for <mark>collaborative learning</mark> and cross-cultural public discourse between students.</h5>
              </Card>
          </Col>
          <Col sm className="text-center">
            <Card body className="shadow mb-3">
              <img
                width={80}
                height={80}
                className="mb-2"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/woman-teacher_1f469-200d-1f3eb.png"
                alt="teacher"
              />
              <h5 className="description">Teachers can assign their students to relevant channels and <mark>moderate</mark> the discussions therein.</h5>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;