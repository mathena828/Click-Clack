
import { useEffect, useState } from "react";
import ChannelList from './ChannelList'
import MessagesPanel from "./MessagesPanel";
import './chat.scss';
const SERVER = "http://localhost:5000/";
const ChatScreen = ()=> {
    
    useEffect(()=>{
        loadChannels();
    },[])
    const [channels,setChannels] = useState([{
        id:1,
        name: 'first',
        participants:10
    }])
    const loadChannels = async() =>{
        fetch(SERVER+'getChannels').then(async response=>{
            let data = await response.json();
            setChannels({channels: data.channels})
        })
    }
    const handleChannelSelect = id =>{
        this.socket.emit('channel-join', id, ack=>{
            
        })
    }
    return (
        <div className="chat-app">
            <ChannelList channels={channels}/>
            <MessagesPanel/>
        </div>
    )
}

export default ChatScreen;