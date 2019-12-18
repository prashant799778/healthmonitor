import paho.mqtt.client as mqtt
import json


def on_connect(client, userdata, flags, rc):
    print("-------Connected-------")
    client.subscribe("outTopic")
    

def on_message(client, userdata, msg):    
  data = msg.payload.decode('utf-8')
#   data = json.loads(data) 
  client.publish("outTopic1", "Hello worldddddd!")  
  print(data)
    
client = mqtt.Client()
client.connect("159.65.146.25",1883,60)
# while True:
    # client.publish("outTopic1", "Hello worldddddd!")
client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()