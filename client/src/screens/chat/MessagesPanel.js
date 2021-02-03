import {useState} from "react";
import Message from './Message';
const MessagesPanel = ({onSendMessage, channel}) => {
    const [input,setInput] = useState('');
    let list = <div>There are no messages shown</div>;
    if (channel && channel.messages) {
        list = channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
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
            <div className="messages-list">{list}</div>
            <div className="messages-input"></div>
            <input type="text" onChange={handleInput} value={input}/>‍
            <button onClick={send}>Send</button>‍
        </div>
    )
}
export default MessagesPanel;