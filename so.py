from flask import Flask, render_template
from flask_socketio import SocketIO,emit,send
import socketio
#import flaskext.couchdb
#from flask.ext.socketio import SocketIO
from flask_cors import CORS
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
#socketio = SocketIO(app, cors_allowed_origins="*")




# @socketio.on('message')
# def handle_message(message):
    # print('received message: ' + message)
    # emit('message', message, broadcast=True)
    # print("ok")
    # emit('newmessage', message, broadcast=True)
    # print("newmessage")
  
# @socketio.on('my event')
# def handle_my_custom_event(json):
    # print('received json: ' + str(json))    
    
# if __name__ == '__main__':
    # CORS(app, support_credentials=True)
    # app.run(host='0.0.0.0', port=5054, debug=True) 
    # socketio.run(app)
@app.route('/allresponders', methods=['post'])
def on_message():
	try:
		data=str({'PatientId': '153','heartRate': {'upper': '100', 'lower': '60', 'status': 'true'}, 'spo2': {'upper': '99', 'lower': '66', 'status': 'true'}, 'pulseRate': {'upper': '100', 'lower': '70', 'status': 'true'}, 'highPressure': {'upper': '139', 'lower': '80', 'status': 'true'}, 'lowPressure': {'upper': '89', 'lower': '80', 'status': 'true'}, 'temperature': {'upper': '37', 'lower': '36', 'status': 'true'}})
        #data = msg.payload.decode('utf-8')#client.publish("outTopic1","data111111")
		t=time.time()
		print(t*1000)
		data= json.loads(data)
		print(data)
		print(type(data))


		if 'text' in data:
			query2  = " insert into preiscribeMedicine(patientId,doctorId,text)"
			query2 =query2 +" values("+'"'+str(data["PatientId"])+'"'+','+'"'+str(data["doctorId"])+'"'+','+'"'+str(data["text"])+'"'+");"
			conn=Connection()
			cursor = conn.cursor()
			cursor.execute(query2)
			conn.commit()
			cursor.close()


		
		else:
			PatientId=data["PatientId"]
			heartRate=str(data["heartRate"]).replace("'",'"')
			spo2=str(data["spo2"]).replace("'",'"')
			pulseRate=str(data["pulseRate"]) .replace("'",'"')
			highPressure=str(data["highPressure"]).replace("'",'"')
			lowPressure=str(data["lowPressure"]).replace("'",'"')
			temperature=str(data["temperature"]).replace("'",'"')
			query2  = " insert into Patient_Vital_master(Patient_Id,spo2,pulseRate,highPressure,lowPressure,heartRate,temperature)"
			query2 =query2 +" values('"+str(data["PatientId"])+"','"+str(data["spo2"])+"','"+str(data["pulseRate"])+"','"+str(data["highPressure"])+"','"+str(data["lowPressure"])+"','"+str(data["heartRate"])+"','"+str(data["temperature"])+"');"
			print(query2)
			conn=Connection()
			cursor = conn.cursor()
			cursor.execute(query2)
			conn.commit()
			cursor.close()
	except Exception as e :
		print("Exception---->" + str(e))    
		output = {"result":"something went wrong","status":"false"}
        
if __name__ == "__main__":
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0',port=5057,debug=True)
    