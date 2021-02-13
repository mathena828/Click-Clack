import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Container, Row, Col } from "react-bootstrap";
import ChannelList from './ChannelList'
import MessagesPanel from "./MessagesPanel";
import '../../stylesheets/chat.scss';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:5000";
const socket = socketClient(SERVER);

const ChatScreen = ()=> {
    const [channels, setChannels] = useState([])
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [cookies, ] = useCookies(['user']);
    
    const loadChannels = async() =>{
        fetch(SERVER+'/api/chat/channels/users/'+cookies.user._id).then(async response=>{
            let data = await response.json();
            console.log(data);
            setChannels(data.channels)
        })
    }
    const configureSocket = () =>{
        
        console.log("socket configs running");
        socket.on('connection',()=>{
            console.log("connected id",socket.id);
        });
        /* socket.on('channels', channels => {
            setChannels(channels);
        }); */
        socket.on('newMessage',async data=>{
            let message = await data;
            setMessages(oldMessages => [...oldMessages, message]);
            //setChannels(data.channels); 
        })
    }
    const handleSendMessage = (channel_id, text) => {
        console.log(channel_id,text);
        var body = {
            userName: cookies.user.username,
            content: text,
            channelId: channel_id,
            school: cookies.user.school
        } 
        //socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
        fetch(SERVER+'/api/chat/channels/'+channel_id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
    const handleChannelSelect = (id, name, description) => {
        console.log("Joined channel", id);
        fetch(SERVER+'/api/chat/channels/'+id).then(async response=>{
            let data = await response.json();
            setMessages(data.messages);
            console.log(data.messages);
            setChannel({id,name, description})
            socket.emit('getChannel',{channelId:id})
            //setChannels(data.channels)
        });     
    }
    useEffect(()=>{
        loadChannels();
        configureSocket();
        console.log(JSON.stringify(cookies));
    },[])
    
    return (
        <Container fluid className="chat-app" style={{width:"100vw"}}>
            <Row style={{width:"100%"}}>
                <Col md={3} sm={12}>
                    <ChannelList channels={channels} onSelectChannel={handleChannelSelect}/>
                </Col>
                <Col md={9} sm={12}>
                    <MessagesPanel onSendMessage={handleSendMessage} messages={messages} channel={channel}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ChatScreen;