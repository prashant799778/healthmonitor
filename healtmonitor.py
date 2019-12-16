from flask import Flask,request, abort
from flask_socketio import SocketIO,emit


#import socketio


import json
import numpy as np
import pymysql
import requests
import json
import pymysql
from flask_cors import CORS
from datetime import datetime
import pytz 
import pytz
from config import Connection


from flask import Flask, render_template
from flask_socketio import SocketIO

import socketio

# standard Python
sio = socketio.Client()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
# sio = socketio.Client()

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


# mysqlcon = pymysql.connect(host='localhost',
#                             user='root',                            
#                             db='healthmonitor',
#                             charset='utf8mb4',
#                             cursorclass=pymysql.cursors.DictCursor)



# cursor = mysqlcon.cursor()

@app.route('/Login', methods=['GET'])
def login():
    try:
        # userid = request.args['userid']
        password = request.args['password']
        name = request.args['name']
        
               
        #query="select userid,usertype from usermaster where userid = '" + userid + "' and password='" + password + "';"      
        query ="select si.mobile as mobile,si.name as name,si.password as password,si.Usertype_Id as Usertype_Id,si.Hospital_Id as Hospital_Id,us.Usertype,hm.hospital_name from signup as si INNER JOIN Usertype_master as us on us.ID=si.Usertype_Id  INNER JOIN Hospital_master AS hm on hm.ID=si.Hospital_Id where name = '" + name + "' and password='" + password + "';"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        loginuser = cursor.fetchone()
        cursor.close()
        if loginuser:   
            data={"status":"true","result":loginuser}                      
            return data
        else:
            data={"status":"false","result":"Login Failed"}
            return data

    except KeyError as e:
        print("Exception---->" +str(e))        
        output = {"result":"Input Keys are not Found","status":"false"}
        return output 
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output 
@app.route('/signup', methods=['POST'])
def signup():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
           
       

        query1 = "select Usertype_Id,Hospital_Id,mobile from signup where name = "+'"'+str(data["name"])+'"'+" ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data= cursor.fetchone()
        conn.commit()
        cursor.close()
       
        if data != None:
            output={"output": "Name already registered ,Please enter the other Name","status":"false"}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))  
            print("77787878")
            query2  = " insert into signup (name,mobile,password,Usertype_Id,Hospital_Id,usercreate)"
            query2 = query2 +" values("+'"'+str(data["name"])+'"'+','+'"'+str(data["mobile"])+'"'+','+'"'+str(data["password"])+'"'+','+'"'+str(data["Usertype_Id"])+'"'+','+'"'+str(data["Hospital_Id"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()
            output={"output": "User Signup succesfully","status":"true"}
        
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output
   
@app.route('/Signuplist', methods=['GET'])
def Signuplist():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select * from signup "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        if data:           
            Data = {"result":data,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/update_Signup', methods=['POST'])
def updateSignup():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update signup  set  name= '" + str(data["name"]) + "',  password ='" + str(data["password"]) + "'  ,  mobile ='" + str(data["mobile"]) + "'  ,  Usertype_Id ='" + str(data["Usertype_Id"]) + "' ,  Hospital_Id ='" + str(data["Hospital_Id"]) + "' ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1' where ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Updated Successfully","status":"true"}
        return output  

    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output

@app.route('/Usertype_master', methods=['POST'])
def Usertype_master():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
        query1 = "select ID,Usertype from Usertype_master where Usertype = "+'"'+str(data["Usertype"])+'"'+" ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data= cursor.fetchone()
        conn.commit()
        cursor.close()
        if data != None:
            output={"output": "Usertype already registered ,Please enter the other Usertype ","status":"false"}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))  
            print("77787878")
            query2  = " insert into Usertype_master (Usertype,usercreate)"
            query2 = query2 +" values("+'"'+str(data["Usertype"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()
            output={"output": "Usertype Added succesfully","status":"true"}
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output
 
@app.route('/Usertypelist', methods=['GET'])
def Usertypelist():
    try:
        query = "select * from Usertype_master "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        if data:           
            Data = json.dumps(data, default=str)
            return str(Data)
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/update_Usertype', methods=['POST'])
def update_Usertype():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Usertype_master set  Usertype='" + str(data["Usertype"]) + "' ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1'  where ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Updated Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output
@app.route('/Hospital_master', methods=['POST'])
def Hospital_master():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
        query1 = "select ID,hospital_name,City,State from Hospital_master where hospital_name = "+'"'+str(data["hospital_name"])+'"'+" ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data= cursor.fetchone()
        conn.commit()
        cursor.close()
        if data != None:
            output={"output": "Hospital name already registered ,Please enter the other Hospital name ","status":"false"}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))  
            print("77787878")
            query2  = " insert into Hospital_master (hospital_name,City,State,usercreate)"
            query2 = query2 +" values("+'"'+str(data["hospital_name"])+'"'+','+'"'+str(data["City"])+'"'+','+'"'+str(data["State"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output={"output": "Hospital Name Added succesfully","status":"true"}
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output


@app.route('/hospital_master_list', methods=['GET'])
def hospital_master_list():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select * from Hospital_master  "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        if data:           
            Data = {"result":data,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/update_hospital_master', methods=['POST'])
def update_hospital_master():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Hospital_master set  hospital_name='" + str(data["hospital_name"]) + "' , City='" + str(data["City"]) + "' , State = '" + str(data["State"]) + "'  ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1'  where ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Updated Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output
@app.route('/Device_master', methods=['POST'])
def Device_master():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
        query1 = "select * from Device_master where DeviceMac = "+'"'+str(data["DeviceMac"])+'"'+" ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data= cursor.fetchone()
        conn.commit()
        cursor.close()
        if data != None:
            output={"output": " DeviceMac name already registered ,Please enter the other DeviceMac ","status":"false"}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))  
            print("77787878")
            query2  = " insert into Device_master (DeviceMac,Bed_Number,Vard_Name,Hospital_Id,usercreate)"
            query2 = query2 +" values("+'"'+str(data["DeviceMac"])+'"'+','+'"'+str(data["Bed_Number"])+'"'+','+'"'+str(data["Vard_Name"])+'"'+','+'"'+str(data["Hospital_Id"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output={"output": "DeviceMac Added succesfully","status":"true"}
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output



@app.route('/Device_master_select', methods=['GET'])
def Device_master_select():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select  de.DeviceMac,de.Bed_Number,de.Vard_Name,de.Hospital_Id,hm.hospital_name as hospital_Name from Device_master as de INNER JOIN Hospital_master as hm on hm.ID= de.Hospital_Id "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        if data:           
            Data = {"result":data,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/update_Device_master', methods=['POST'])
def update_device_type():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Device_master set  DeviceMac ='" + str(data["DeviceMac"]) + "' , Bed_Number ='" + str(data["Bed_Number"]) + "' , Vard_Name = '" + str(data["Vard_Name"]) + "' , Hospital_Id ='" + str(data["Hospital_Id"]) + "'  ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1'  where ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Updated Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output



@app.route('/Patient_master', methods=['POST'])
def Patient_master():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
           
       

        query = "select     * from Patient_master where PatientName = "+'"'+str(data["PatientName"])+'"'+" ;"
        
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchone()
        conn.commit()
        cursor.close()
        if data != None:
            output={"output": "PatientName already registered ,Please enter other PatientName "}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))
            

           
            query2  = " insert into Patient_master(PatientName,DeviceMac,Bed_Number,hospital_Name,startdate,enddate,usercreate)"
            query2 =query2 +" values("+'"'+str(data["PatientName"])+'"'+','+'"'+str(data["DeviceMac"])+'"'+','+'"'+str(data["Bed_Number"])+'"'+','+'"'+str(data["hospital_name"])+'"'+','+'"'+str(data["startdate"])+'"'+','+'"'+str(data["enddate"])+'"'+','+'"'+str(data["usercreate"])+'"'+''+");"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()
            output={"output": "Patient Added succesfully","status":"true"}
        
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output

@app.route('/Patient_master_select', methods=['GET'])
def Patient_master_select():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select * from Patient_master  "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        if data:           
            Data = {"result":data,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/update_Patient_master', methods=['POST'])
def update_Patient_type():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Patient_master set  PatientName ='" + str(data["PatientName"]) + "' , DeviceMac ='" + str(data["DeviceMac"]) + "' , Bed_Number = '" + str(data["Bed_Number"]) + "' , hospital_Name ='" + str(data["hospital_Name"]) + "' , startdate='" + str(data["startdate"]) + "', enddate = '" + str(data["enddate"]) + "'  ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1'  where PatientId = '" + str(data["PatientId"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Updated Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output
        
@socketio.on('new message')
def handle_json(json):
    try:
        print('received json: ' + str(json))
        socketio.emit(json)
        print(type(json))
        data=json  
        @sio.on("connect")
        def on_connect():
          print("connected")

        @sio.on("disconnect")
        def on_disconnect():
          print("disconnected")

        #io.connect("http://localhost:8000")

        
        sio.connect('http://159.65.146.25:3015')

        sio.emit("RealTimeData", json)
        sio.send("hello")
        try:
          # sio.wait() # doesn't raise it, so have to implement it manually ;-)
          while True:
            time.sleep(1)
        except KeyboardInterrupt:
          print("handling interrupt...")
          sio.disconnect()

        print("done")
        # socketio.send(data) 
        # socketio.emit(data) 
        print(data)
        
        query2  = " insert into Patient_Vital_master(Patient_Id,RESP,ECG,SPO2,NIBP,TEMP,usercreate)"
        query2 =query2 +" values("+'"'+str(data["PatientId"])+'"'+','+'"'+str(data["RESP"])+'"'+','+'"'+str(data["ECG"])+'"'+','+'"'+str(data["SPO2"])+'"'+','+'"'+str(data["NIBP"])+'"'+','+'"'+str(data["TEMP"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
        print(query2)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        conn.commit()
        cursor.close()
        output={"output": "Patient Vital Details Added succesfully","status":"true"}
        
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output
    

@app.route('/Patient_Vital_master_select', methods=['GET'])
def Patient_Vital_master_select():
    try:
        PatientName,DeviceMac,PatientId, y,y2,y3= "","","","","",""
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
        if 'DeviceMac' in request.args:
            DeviceMac=request.args["DeviceMac"]
        if 'PatientName' in request.args:
            PatientName=request.args["PatientName"]
        WhereCondition=""
        
        if PatientId != "":
            WhereCondition1 =  " where  PatientId    = '" + PatientId + "'  "
            y = y +  WhereCondition1
        
        if DeviceMac != "":
            WhereCondition1 =  " where  DeviceMac   = '" + DeviceMac + "'  "
            y = y +  WhereCondition1
        
        if  PatientName != "":
            WhereCondition1 =  " where  PatientName   = '" + PatientName + "'  "
            y = y +  WhereCondition1

        
        query = "select  PVM.Patient_Id as PatientId,Pm.PatientName as PatientName,PVM.RESP,PVM.ECG,PVM.SPO2,PVM.NIBP,PVM.TEMP,Pm.DeviceMac AS DeviceMac from Patient_Vital_master as PVM INNER JOIN Patient_master as Pm ON Pm.PatientId= PVM.Patient_Id  " +y
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        
               
        if data:
            Data = {"result":data,"status":"true"}
            return  Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/update_Patient_Vital_master', methods=['POST'])
def update_Patient_Vital_master():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Patient_Vital_master set  PatientId ='" + str(data["PatientId"]) + "' , RESP ='" + str(data["RESP"]) + "' , ECG ='" + str(data["ECG"]) + "' , SPO2 = '" + str(data["SPO2"]) + "' , NIBP = '" + str(data["NIBP"]) + "', TEMP ='" + str(data["TEMP"]) + "'  ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1'  where Id = '" + str(data["Id"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Updated Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output






if __name__ == "__main__":
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0',port=5053,debug=True)
    socketio.run(app)
