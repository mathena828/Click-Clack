import React from 'react';
import Channel from './Channel';

const ChannelList = ({channels, onSelectChannel}) =>{
    const handleClick = (id,name, description) =>{
        console.log("clicked")
        onSelectChannel(id, name, description);
    }
    let list = "There are no channels";
    if(channels){
        list = channels.map(c=><Channel key={c._id} id={c._id} name={c.name} description={c.description} onClick={handleClick}/>);
    }
    return(
        <div>
            {list}
        </div>
    )
}
export default ChannelList;

