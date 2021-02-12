import React from 'react';

const Channel = ({id,name,participants,onClick}) =>{
    const isClicked = () =>{
        onClick(id,name)
    }
    return(
        <div className="channel-item" onClick={isClicked}>
            <div>{name}</div>
        </div>
    );
}
export default Channel;
