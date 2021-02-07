
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import ChannelList from './ChannelList'
import MessagesPanel from "./MessagesPanel";
import './chat.scss';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:5000";
const socket = socketClient(SERVER);

const ChatScreen = ()=> {
    const [channels, setChannels] = useState([])
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const user = useContext(UserContext);
    const loadChannels = async() =>{
        fetch(SERVER+'/api/chat/channels').then(async response=>{
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
        socket.on('channels', channels => {
            setChannels(channels);
        });
        socket.on('message',message=>{
            /* let channelsList =  [...channels];
            channelsList.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            setChannels(channelsList); */
        })
    }
    const handleSendMessage = (channel_id, text) => {
        console.log(channel_id,text);
        console.log("user",user);
        var body = {
            userName: user[0].username,
            content: text,
            channelId: channel_id,
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
    const handleChannelSelect = (id) =>{
        console.log("Joined channel", id);
        fetch(SERVER+'/api/chat/channels/'+id).then(async response=>{
            let data = await response.json();
            setMessages(data.messages);
            console.log(data.messages);
            setChannel(id)
            //setChannels(data.channels)
        });
        
    }
    useEffect(()=>{
        loadChannels();
        configureSocket();
    },[])
    
    return (
        <div className="chat-app">
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect}/>
            <MessagesPanel onSendMessage={handleSendMessage} messages={messages} channelId={channel}/>
        </div>
    )
}

export default ChatScreen;