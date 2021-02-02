const MessagesPanel = (props) => {
    let list = <div>There are no messages shown</div>;
    console.log(props);
    return(
        <div className="messages-panel">
            <div className="messages-list">{list}</div>
            <div className="messages-input"></div>
            <input type="text"/>‍
            <button>Send</button>‍
        </div>
    )
}
export default MessagesPanel;