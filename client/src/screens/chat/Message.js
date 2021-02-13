const Message = ({id, senderName, text, school}) => {
    var backgroundColor = "#E8E8E8";
    if(senderName === ""){
        backgroundColor = "#fcb940"
    }
    return (
        <div className="message-item" >
            <div className="px-3 my-2 py-1" style={{display:"inline-block", borderRadius: "15px", backgroundColor:backgroundColor}}>
                <div><b>{senderName} • <i>{school}</i></b></div>
                <span>{text}</span>
            </div>
‍       </div>
        
    )
}
export default Message;