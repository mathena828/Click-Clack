import React from 'react';
import Channel from './Channel';

const ChannelList = (props) =>{
    let list = "There are no channels";
    if(props.channels){
        console.log(props)
        //list = props.channels.map(c=><Channel key={c.id} id={c.id} name={c.name} participants={c.participants}/>);
    }
    return(
        <div>
            {list}
        </div>
    )
}
export default ChannelList;

