import React from 'react';

const Channel = ({id,name,description,onClick}) =>{
    const isClicked = () =>{
        onClick(id,name, description)
    }
    return(
        <div className="channel-item" onClick={isClicked}>
            <div>{name}</div>
        </div>
    );
}
export default Channel;
