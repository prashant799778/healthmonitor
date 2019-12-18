# from flask import Flask, render_template
# from flask_socketio import SocketIO

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
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
import os

# Define event callbacks
def on_connect(client, userdata, flags, rc):
    print("rc: " + str(rc))

def on_message(client, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

def on_publish(client, obj, mid):
    print("mid: " + str(mid))

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(client, obj, level, string):
    print(string)

mqttc = mqtt.Client()
# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

# Uncomment to enable debug messages
#mqttc.on_log = on_log

# Parse CLOUDMQTT_URL (or fallback to localhost)

topic = 'test'

# Connect
#mqttc.username_pw_set(url.username, url.password)
mqttc.connect("159.65.146.25",9001,60)

# Start subscribe, with QoS level 0
mqttc.subscribe(topic, 0)

# Publish a message
mqttc.publish(topic, "my message")
rc = 0
while rc == 0:
    rc = mqttc.loop()
print("rc: " + str(rc))
# Continue the network loop, exit when an error occurs
   
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5054, debug=True) 
    # socketio.run(app)