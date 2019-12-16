# from flask import Flask, render_template
# from flask_socketio import SocketIO

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app)




# @socketio.on('message')
# def handle_message(message):
    # print('received message: ' + message)


# @socketio.on('new message')
# def handle_json(json):
    # print('received json: ' + str(json))
    # return  "{'hello': 'connected successfully'}"

# @socketio.on('my event')
# def handle_my_custom_event(json):
    # print('received json: ' + str(json))    
    
# if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5054, debug=True) 
    # socketio.run(app)
from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit

import os

import eventlet
#eventlet.monkey_patch()

root_dir = os.path.dirname(os.getcwd())
static_path = os.path.join(root_dir, 'web-server', 'static')

app = Flask(__name__)
socketio = SocketIO(app, async_mode="eventlet")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(static_path, 'index.html')


@socketio.on('my event', namespace='/client-socket')
def test_message(message):
    emit('my response', {'data': message['data']})

socketio.on('new message', namespace='/client-socket')
def test_message(message):
    emit('my response', str(json))

@socketio.on('my broadcast event', namespace='/client-socket')
def test_message(message):
    emit('my response', {'data': message['data']}, broadcast=True)


@socketio.on('connect', namespace='/client-socket')
def test_connect():
    emit('my response', {'data': 'Connected'})


@socketio.on('disconnect', namespace='/client-socket')
def test_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5054, debug=True) 
    socketio.run(app)