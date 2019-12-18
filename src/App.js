import React, { Component } from 'react'
// import io from 'socket.io/node_modules/socket.io-client'
import io from 'socket.io-client';



var socketIOClient = io('http://159.65.146.25:5054');


 class App extends Component {
  constructor(){
    super()
    this.state = {
msg:""
    }
  }
handleMessageChange=(e)=>{
this.setState({msg:e.target.value},()=>{
  console.log(this.state.msg)
})
}

 

sendMessageClicked=(e) =>{
    e.preventDefault();
    let message = this.state.msg;
    console.log("222",message)
    var data = {
        message:message,
        time: Date.now()
    }
   console.log(JSON.stringify(data))
   
    socketIOClient.send(JSON.stringify(data));
    console.log(JSON.stringify(data),socketIOClient.emit("message",JSON.stringify(data)))
}

componentDidMount() {
    socketIOClient.on('new message',function(result){
        let messageHtml = 'new message';
        let messageBox = document.getElementById('messageBox');

        if (messageBox ) {
            messageBox.appendChild(messageHtml);
        }
    })
}

render(){
  console.log(this.state.msg,"222")
    return(
        <div>
            <form >
                <textarea onChange={this.handleMessageChange} name="originalMessage" value={this.state.msg}></textarea>
                <input type="button" value="Submit"  onClick={this.sendMessageClicked}/>
            </form>
        </div>
    );
}
}

export default App;
