import React from 'react';
import Channel from './Channel';
import { Alert } from "react-bootstrap";

const ChannelList = ({channels, onSelectChannel}) =>{
    const handleClick = (id,name, description) =>{
        onSelectChannel(id, name, description);
    }
    let list = "";
    if (channels.length > 0) {
        list = channels.map(c=><Channel key={c._id} id={c._id} name={c.name} description={c.description} onClick={handleClick}/>);
    } else {
        list = <Alert variant="danger" className="mt-2">You have no active channels.</Alert>
    }
    return(
        <div>
            {list}
        </div>
    )
}
export default ChannelList;

