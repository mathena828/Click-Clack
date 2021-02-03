import React from 'react';
import Channel from './Channel';

const ChannelList = ({channels, onSelectChannel}) =>{
    const handleClick = id =>{
        console.log("clicked")
        onSelectChannel(id);
    }
    let list = "There are no channels";
    if(channels){
        list = channels.map(c=><Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={handleClick}/>);
    }
    return(
        <div>
            {list}
        </div>
    )
}
export default ChannelList;

