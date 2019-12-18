import paho.mqtt.client as mqtt
message = 'ON'
def on_connect(mqttc, obj, rc):
    #mqttc.subscribe("f", 0)
    mqttc.subscribe("outTopic", 0)
    print("rc: " + str(rc))

def on_message(mqttc, obj, msg):
    global message
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
    message = msg.payload
    mqttc.publish("f2",msg.payload);

def on_publish(mqttc, obj, mid):
    print("mid: " + str(mid))

def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mqttc, obj, level, string):#mosq
    print(string)

mqttc = mqtt.Client()
# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
# Connect
mqttc.connect("localhost", 1883,60)


# Continue the network loop
mqttc.loop_forever()