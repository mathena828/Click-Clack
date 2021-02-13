import { useState } from "react";
import Message from './Message';
import { useCookies } from 'react-cookie';
import { Button, Container, Row, Col, Card, Alert} from "react-bootstrap";
import Emoji from 'react-apple-emojis'

const MessagesPanel = ({onSendMessage, messages, channel}) => {
    const [cookies, ] = useCookies(['user']);
    const [copy, setCopy] = useState('Generate Invite Code');
    const [input,setInput] = useState('');
    function copyToClipboard(){
        navigator.clipboard.writeText(channel.id);
        setCopy('Copied to Clipboard');
        setTimeout(function(){
            setCopy('Generate Invite Code');
        }, 2000); 
    }
    let list = "";
    if (messages) {
        list = messages.map(m => {
            if (m.userName !== cookies.user.username) {
                return <Message key={m._id} id={m._id} senderName={m.userName} text={m.content} school={m.school} createdAt={m.createdAt}/>
            } else {
                return <Message key={m._id} id={m._id} senderName={""} text={m.content} createdAt={m.createdAt}/>
            }    
        });
    }
    let getInvite = '';
    if(!channel){
        channel = {id:0, name:'Select a channel to start chatting.'}
    }else{
        if (cookies.user.isTeacher) {
            getInvite = <Button className="my-2 px-3 channel-generate" onClick={copyToClipboard}>{copy}</Button>
        }
    }

    const handleInput=(e)=>{
        setInput(e.target.value);
    }
    const send=()=>{
        console.log(input);
        if(input && input!==''){
            onSendMessage(channel.id, input);
            setInput('');
        }
    }
    return(
        <Container className="messages-panel" style={{width:"100%"}}>
            {channel.id !== 0 ? (
                <div>
                    <Card bg="dark" text="light" className="p-3 mb-3">
                        <Row>
                            <Col lg={8}><h2 className="channel-title my-2">{channel.name}</h2></Col>
                            <Col lg={4}>{getInvite}</Col>
                        </Row>
                        <Row>
                            <Col><p className="my-2">{channel.description}</p></Col>
                        </Row>
                    </Card>
                    <Container fluid className="p-0"> 
                        <Card className="messages-list p-3" >{list}</Card>
                        <Row style={{width:"100%"}}>
                            <Col md={10} className="pr-0">
                                <input placeholder="Enter message" className="form-control mt-3" type="text" onChange={handleInput} value={input}/>
                            </Col>
                            <Col md={2} className="pr-0">
                                <Button size="md" block className="mt-3 px-1" onClick={send}>Send</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ): (
                <div>
                    <Alert variant="success">Select a channel to start chatting. <Emoji name="victory-hand" width={20} className="mb-1" /> </Alert>
                </div>
            )}‍
        </Container>
    );
}
export default MessagesPanel;