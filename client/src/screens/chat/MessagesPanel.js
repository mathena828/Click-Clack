import {useState} from "react";
import Message from './Message';
const MessagesPanel = ({onSendMessage, messages, channelId}) => {
    const [input,setInput] = useState('');
    let list = <div>There are no messages shown</div>;
    if (messages) {
        list = messages.map(m => <Message key={m._id} id={m._id} senderName={m.userName} text={m.content} />);
    }
    //console.log(props);
    const handleInput=(e)=>{
        setInput(e.target.value);
    }
    const send=()=>{
        console.log(input);
        if(input && input!=''){
            onSendMessage(channelId, input);
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