import React from 'react';
import Channel from './Channel';
import { Alert } from "react-bootstrap";
import Emoji from 'react-apple-emojis';

const ChannelList = ({channels, onSelectChannel}) =>{
    const handleClick = (id,name, description) =>{
        onSelectChannel(id, name, description);
    }
    let list = "";
    if (channels.length > 0) {
        list = channels.map(c=><Channel key={c._id} id={c._id} name={c.name} description={c.description} onClick={handleClick}/>);
    } else {
        list = <Alert variant="danger" className="mt-2">You have no active channels.<Emoji name="crying-face" width={20} className="ml-2 mb-1" /></Alert>
    }
    return(
        <div>
            {list}
        </div>
    )
}
export default ChannelList;

