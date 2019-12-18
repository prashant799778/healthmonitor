import paho.mqtt.client as mqtt
from flask import Flask, render_template



app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
client = mqtt.Client()
client.connect("159.65.146.25",1883,60)
client.publish("outTopic", "Hello world!")
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5054, debug=True) 