const Message = ({id, senderName, text, school}) => {
    var backgroundColor = "#E8E8E8";
    var middot="•";
    var messageItem = <div></div>
    if(senderName === ""){
        backgroundColor = "#fcb940";
        middot = "";
        messageItem=<div className="px-3 my-2 py-1" style={{display:"inline-block", borderRadius: "15px", backgroundColor:backgroundColor}}>
            <div><b>{senderName} {middot} <i>{school}</i></b></div>
            <span>{text}</span>
        </div>
        
    }else{
        messageItem = 
        <div className="px-3 my-2 py-1" style={{display:"inline-block", borderRadius: "15px", backgroundColor:backgroundColor}}>
            <div><b>{senderName} {middot} <i>{school}</i></b></div>
            <span>{text}</span>
        </div>
    }
    if(senderName === "admin"){
        messageItem=<div style={{textAlign:"center"}}>
            <i>This is the start of the channel. </i>
        </div>
    }
    return (
        <div className="message-item" >
        {messageItem}
        </div>
        
    )
}
export default Message;