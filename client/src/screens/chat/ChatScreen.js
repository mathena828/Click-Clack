
import { useEffect, useState } from "react";
import ChannelList from './ChannelList'
import MessagesPanel from "./MessagesPanel";
import './chat.scss';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:5000";
var socket = socketClient(SERVER);

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
        socket.on('channel', channel => {
            //console.log("channel",channel);

            let channelsList =  [...channels];
            //console.log("channels",channels);
            //console.log("channelsList",channels)
            channelsList.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            setChannels(channelsList);
        });
    }
    const handleChannelSelect = (id) =>{
        console.log(channels);
        let channel = channels.find(c=>{
            return c.id === id
        });
        
        socket.emit('channel-join', id, ack=>{
        })
        setChannel(channel);
        console.log(channel)
    }
    useEffect(()=>{
        loadChannels();
        configureSocket();
    },[])
    
    return (
        <div className="chat-app">
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect}/>
            <MessagesPanel/>
        </div>
    )
}

export default ChatScreen;