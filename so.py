from flask import Flask, render_template
from flask_socketio import SocketIO
import socketio
#import flaskext.couchdb
#from flask.ext.socketio import SocketIO
from flask_cors import CORS
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
import logging 
  
#Create and configure logger 

  
#Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG)



@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    logging.basicConfig(filename="/var/www/HealthCare/Healthmonitor/newfile.log", 
                    format='%(message)s', 
                    filemode='w') 
    logger=logging.getLogger() 
  
    #Setting the threshold of logger to DEBUG 
    logger.setLevel(logging.DEBUG)
    #emit('my response', message, broadcast=True)

@socketio.on('new message')
def handle_json(json):
    print('received json: ' + str(json))
    socketio.emit(json)
    data=json  

    socketio.send(data) 
    socketio.emit(data)
    
@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))    
    
if __name__ == '__main__':
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0', port=5054, debug=True) 
    socketio.run(app)