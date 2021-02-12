import {useState} from "react";
import Message from './Message';
const MessagesPanel = ({onSendMessage, messages, channel}) => {
    const [input,setInput] = useState('');
    let list = <div>There are no messages shown</div>;
    if (messages) {
        list = messages.map(m => <Message key={m._id} id={m._id} senderName={m.userName} text={m.content} />);
    }
    if(!channel){
        channel = {id:0,name:'Select a channel to discuss!'}
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
            <h3>{channel.name}</h3>
            <div className="messages-list">{list}</div>
            <div className="messages-input"></div>
            <input type="text" onChange={handleInput} value={input}/>‍
            <button onClick={send}>Send</button>‍
        </div>
    )
}
export default MessagesPanel;