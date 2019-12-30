import paho.mqtt.client as mqtt
import json
from config import Connection
import time


def on_connect(client, userdata, flags, rc):
    print("-------Connected-------")
    client.subscribe("#")
    

def on_message(client, userdata, msg):    
  data = msg.payload.decode('utf-8')
  print(time.time()*1000)
  #   data = json.loads(data) 
  #client.publish("outTopic1","data111111")  
  print(data)
def on_message(client, userdata, msg):
	try:
		data = msg.payload.decode('utf-8')#client.publish("outTopic1","data111111")
		t=time.time()
		print(t*1000)
		data= json.loads(data)
		print(data)
                
		# query2  = " insert into Patient_Vital_master(Patient_Id,RESP,ECG,SPO2,NIBP,TEMP,usercreate)"
		# query2 =query2 +" values("+'"'+str(data["PatientId"])+'"'+','+'"'+str(data["RESP"])+'"'+','+'"'+str(data["ECG"])+'"'+','+'"'+str(data["SPO2"])+'"'+','+'"'+str(data["NIBP"])+'"'+','+'"'+str(data["TEMP"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
		# print(query2)
		# conn=Connection()
		# cursor = conn.cursor()
		# cursor.execute(query2)
		# conn.commit()
		# cursor.close()
	except Exception as e :
		print("Exception---->" + str(e))    
		output = {"result":"something went wrong","status":"false"}
     
  
    
client = mqtt.Client()
client.connect("159.65.146.25",9001,60)
# while True:
    # client.publish("outTopic1", "Hello worldddddd!")
client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()
