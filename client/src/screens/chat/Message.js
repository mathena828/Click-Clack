import { Popover, OverlayTrigger} from "react-bootstrap";
import Emoji from 'react-apple-emojis';
import moment from "moment";
const Message = ({id, senderName, text, school, country, createdAt}) => {
    var date = (
        moment({createdAt}).fromNow()
    )
    var popover = (
        <Popover>
            <Popover.Title as="h3">{senderName}</Popover.Title>
            <Popover.Content>
                <Emoji name="books" width={20} className="mr-2 mb-1" />{school}<br/>
                <Emoji name="airplane" width={20} className="mr-2 mb-1" />{country}
            </Popover.Content>
        </Popover>
    );
    var backgroundColor = "#e8e8e8";
    var messageItem = <div></div>
    if(senderName === "") {
        backgroundColor = "#fcb940";
        messageItem=
        <div className="px-3 my-2 py-1" style={{display:"inline-block", borderRadius: "15px", backgroundColor:backgroundColor}}>
            <div><OverlayTrigger delay={{ show: 250, hide: 400 }} placement="top" overlay={popover}><b>{senderName}</b></OverlayTrigger></div>
            <span>{text}</span>
            <div className="message-date">{date}</div>
        </div>
        
    } else {
        messageItem = 
        <div className="px-3 my-2 py-1" style={{display:"inline-block", borderRadius: "15px", backgroundColor:backgroundColor}}>
            <div><OverlayTrigger delay={{ show: 250, hide: 200 }} placement="top" overlay={popover}><b>{senderName}</b></OverlayTrigger></div>
            <span>{text}</span>
            <div className="message-date">{date}</div>
        </div>
    }
    if (senderName === "admin") {
        messageItem=""
    }
    return (
        <div className="message-item">
            {messageItem}
        </div>
        
    )
}
export default Message;