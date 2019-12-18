import paho.mqtt.client as mqtt
import json


def on_connect(client, userdata, flags, rc):
  print("-------Connected-------")
  client.subscribe("outTopic")
  client.publish("outTopic", "Hello world!");

def on_message(client, userdata, msg):    
  data = msg.payload.decode('utf-8')
#   data = json.loads(data)  
  print(data)
    
client = mqtt.Client()
client.connect("159.65.146.25",1883,60)

client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()