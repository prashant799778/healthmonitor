from flask import Flask, render_template
# from flask_socketio import SocketIO

#app = Flask(__name__)

# socketio = SocketIO(app)




# @socketio.on('message')
# def handle_message(message):
    # print('received message: ' + message)


# @socketio.on('json')
# def handle_json(json):
    # print('received json: ' + str(json))

# @socketio.on('my event')
# def handle_my_custom_event(json):
    # print('received json: ' + str(json))    
import paho.mqtt.client as mqtt


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
client = mqtt.Client()                       

#Called on connection to server/broker
def on_connect(client, userdata, rc):                                               
    print("connected with result code"+str(rc))                                 

#Called when new message published to subscribed topic
def on_message(client, userdata, msg):          
    print("NEW PUBLISH: "+msg.topic+" "+str(msg.payload))

#configure connection to the broker
def setup():                                    
    client.on_connect = on_connect
    client.on_message = on_message

#Subscribe
def subscribe(topic):
    print("subscribing to topic: " +topic)
    client.subscribe(topic)

#Connect to broker
def connect():
    client.connect("127.0.0.1", 1883, 60)

def publish(topic, msg):
    client.publish(topic, msg)
   
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5054, debug=True) 
    # socketio.run(app)