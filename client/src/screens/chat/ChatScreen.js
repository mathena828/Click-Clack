
import { useEffect, useState } from "react";
import ChannelList from './ChannelList'
import MessagesPanel from "./MessagesPanel";
import './chat.scss';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:5000";
const socket = socketClient(SERVER);

const ChatScreen = ()=> {

    const [channels,setChannels] = useState([{
        id:1,
        name: 'test',
        participants:10
    }])
    const [channel, setChannel] = useState(null);
    const loadChannels = async() =>{
        fetch(SERVER+'/getChannels').then(async response=>{
            let data = await response.json();
            setChannels(data.channels)
        })
    }
    const configureSocket = () =>{
        
        console.log("socket configs running");
        socket.on('connection',()=>{
            console.log("id",socket.id);
            if (channel){
                handleChannelSelect(channel.id);
            }
        });
        socket.on('channels', channels => {

           /*  const channelsList =  [...channels];
            console.log("channels",channels);
            console.log("channelsList",channelsList)
            channelsList.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            }); */
            setChannels(channels);
        });
        socket.on('message',message=>{
            let channelsList =  [...channels];
            channelsList.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            setChannels(channelsList);
        })
    }
    const handleSendMessage = (channel_id, text) => {
        console.log(channel_id,text);
        socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
    }
    const handleChannelSelect = (id) =>{
        console.log("Joined channel", id);
        let channel = channels.find(c=>{
            return c.id === id
        });
        setChannel(channel);
        socket.emit('channel-join', id, ack=>{
        })
        
    }
    useEffect(()=>{
        loadChannels();
        configureSocket();
    },[])
    
    return (
        <div className="chat-app">
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect}/>
            <MessagesPanel onSendMessage={handleSendMessage} channel={channel}/>
        </div>
    )
}

export default ChatScreen;