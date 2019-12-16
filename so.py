from flask import Flask, render_template
from flask_socketio import SocketIO
import socketio
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
#socketio = SocketIO(app)

mgr = socketio.KafkaManager('kafka://')
socketio = socketio.Server(client_manager=mgr)


# @socketio.on('message')
# def handle_message(message):
    # print('received message: ' + message)


@socketio.on('new message')
def handle_json(json):
    print('received json: ' + str(json))
    
# @socketio.on('my event')
# def handle_my_custom_event(json):
    # print('received json: ' + str(json))    
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5054, debug=True) 
    socketio.run(app)