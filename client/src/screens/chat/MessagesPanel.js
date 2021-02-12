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
        list = messages.map(m => <Message key={m._id} id={m._id} senderName={m.userName} text={m.content} />);
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
        <div className="messages-panel">
            <Container style={{marginTop:'1em'}}>
                <Row>
                    <Col><h3>{channel.name}</h3></Col>
                    <Col>{getInvite}</Col>
                </Row>
            </Container>
            <div className="messages-list">{list}</div>
            <div className="messages-input"></div>
            <input type="text" onChange={handleInput} value={input}/>‍
            <button onClick={send}>Send</button>‍
        </div>
    )
}
export default MessagesPanel;