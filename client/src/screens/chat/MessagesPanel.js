import { useState } from "react";
import Message from './Message';
import { useCookies } from 'react-cookie';
import { Button, Container, Row, Col } from "react-bootstrap";

const MessagesPanel = ({onSendMessage, messages, channel}) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [copy, setCopy] = useState('Get invite code');
    const [input,setInput] = useState('');
    function copyToClipboard(){
        navigator.clipboard.writeText(channel.id);
        setCopy('Copied!');
        setTimeout(function(){
            setCopy('Get invite code');
        }, 2000); 
    }
    let list = <div>There are no messages shown</div>;
    if (messages) {
        list = messages.map(m => {
            if(m.userName != cookies.user.username){
                return <Message key={m._id} id={m._id} senderName={m.userName} text={m.content} />
            }else{
                return <Message key={m._id} id={m._id} senderName={""} text={m.content} />
            }
            
        });
    }
    let getInvite = '';
    if(!channel){
        channel = {id:0,name:'Select a channel to discuss!'}
    }else{
        if(cookies.user.isTeacher){
            getInvite = <Button onClick={copyToClipboard}>{copy}</Button>
        }
    }
    //console.log(props);
    const handleInput=(e)=>{
        setInput(e.target.value);
    }
    const send=()=>{
        console.log(input);
        if(input && input!=''){
            onSendMessage(channel.id, input);
            setInput('');
        }
    }
    return(
        <Container className="messages-panel" style={{width:"100%"}}>
             <Container style={{marginTop:'1em'}} className="py-2">
                <Row>
                    <Col><h3>{channel.name}</h3></Col>
                    <Col><h5>{channel.description}</h5></Col>
                    <Col>{getInvite}</Col>
                </Row>
            </Container>
            <div className="messages-list my-1" >{list}</div>
            <hr/>
            <Row style={{width:"100%"}}>
                <Col sm={10}>
                    <input class="form-control" type="text" onChange={handleInput} value={input}/>
                </Col>
                <Col sm={2}>
                <Button onClick={send}>Send</Button>
                </Col>
            </Row>‍
        </Container>
    )
}
export default MessagesPanel;