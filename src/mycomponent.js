import React from 'react';
import { Event } from 'react-socket-io';
 
export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onMessage = this.onMessage.bind(this);
    }
 
    onMessage(message) {
        console.log(message);
    }
 
    render() {
        return (
            <div>
                <h1>My React SocketIO Demo.</h1>
                <Event event='eventName' handler={this.onMessage} />
            </div>
        );
    }
}
 