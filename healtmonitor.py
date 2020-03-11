from flask import Flask,request,abort
# from flask_mail import Mail, Message
import os
# from flask_socketio import SocketIO,emit
import uuid
import os
import json
import numpy as np
import pymysql
import requests
import json
import pymysql
from flask_cors import CORS
from datetime import datetime
import pytz 
from config import Connection
from flask import Flask, render_template
from flask import Flask, send_from_directory, abort
# import socketio

# standard Python
# sio = socketio.Client()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app, cors_allowed_origins="*")
# sio = socketio.Client()

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

def getDiagReportPath(filename):

    path = "/var/www/HealthCare/Healthmonitor/DiagnosticReport"+filename
    return path

def getPacsReportPath(filename):

    path = "/var/www/HealthCare/Healthmonitor/PacsReport"+filename
    return path

def getDicomReportPath(filename):

    path = "/var/www/HealthCare/Healthmonitor/DicomReport"+filename
    return path

def getLabReportPath(filename):

    path = "/var/www/HealthCare/Healthmonitor/LabReport"+filename
    return path

@app.route('/login', methods=['GET'])
def login1():
    try:
        # userid = request.args['userid']
        password = request.args['password']
        name = request.args['name']
        Name=name

        query ="select  um.Email,um.ID,um.name as name,us.Usertype as Usertype,um.Usertype_Id as Usertype_Id from userMaster  as um,Usertype_master as us  where um.Usertype_Id=us.ID and  um.Email = '" + name + "' and password='" + password + "' and um.Status<>'2' ;"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        loginuser = cursor.fetchall()
        print("11111111111",loginuser)

        if loginuser==():
            query="select  counter from userMaster  where Email='" + name + "' ; "
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            data=cursor.fetchone()
            if data != ():
                print(1)
                p=data["counter"]
               
                if (int(p)<3):

                    data["counter"]=int(p)+1
                    print(data["counter"])
                    query="update  userMaster set counter='" + str(data["counter"]) + "' where Email='" + name + "' ;"
                    cursor.execute(query)
                    conn.commit()
                    query="select  counter from userMaster  where Email='" + name + "' ; "
                    cursor.execute(query)
                    data=cursor.fetchone()

                    p=data["counter"]
                    print(p)
                    if (int(p) >= 3):

                        query="update  userMaster set Status='2' where Email='" + name + "' and counter='3' ;"
                        cursor.execute(query)
                        conn.commit()
                        data={"status":"false","result":"Acess Denied,Please Contact Admin"}
                        return data
                    else: 
                        print("1111111111")
                        data={"status":"false","result":"Login Failed"}
                        return data
                else:
                    data={"status":"false","result":"Acess Denied,Please Contact Admin"}
                    return data
            else:
                data={"status":"false","result":"Login Failed"}
                return data

        else:
            query="update userMaster set counter='0' where Email='" + name + "' and password='" + password + "';"
            cursor.execute(query)
            conn.commit()
            for d in loginuser:
                y9=d["ID"]
                y=  d["Usertype"]
                y3= d["Usertype_Id"]
                Nurse=""

                if d["Usertype"]== 'Nurse':                    
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where Usertype_Id=3 and  userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchone()
                    y2=Nur["Hospital_Id"]
                    query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName,um.ID as DoctorID,um.name as DoctorName,um.Email as Email,um.Gender,um.mobile from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2  and hm.ID = '" + str(y2) + "';"
                    print(query2)
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    Nurse = cursor.fetchall()
                
                if d["Usertype"]== 'Doctor':
                    Nurse=[]
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where  Usertype_Id=2 and userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchall()
                    print(Nur)
                    for i in Nur:
                        query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName,um.ID as DoctorID,um.name as DoctorName,um.Email as Email,um.Gender,um.mobile from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2 and  um.Email='"+name +"'    and hm.ID = '" + str(i["Hospital_Id"]) + "';"
                        print(query2)
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        Nurs = cursor.fetchone()
                        Nurse.append(Nurs)

                if d["Usertype"]== 'Operation':
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where  Usertype_Id=4 and userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchone()
                    print(Nur)
                    y2=Nur["Hospital_Id"]
                    query2= "select hm.ID as hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName from HubMaster as Hbs,Hospital_master as hm where hm.HubId=Hbs.ID and hm.ID= '" + str(y2) + "';"
                    print(query2)
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    Nurse=cursor.fetchone()
                    print("Operation",Nurse)

                if d["Usertype"]== 'HubDoctor':
                    Nurse=[]
                    query= "select hubId as HubId from userHubMapping where   userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nurse = cursor.fetchall()
                    
                    for i in Nurse:
                        query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName  from userMaster as um, userHubMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hubId=Hbs.ID and  hm.HubId=Hbs.ID     and hm.HubId = '" + str(i["HubId"]) + "';"
                        print(query2)
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        Nurse1 = cursor.fetchall()
                        i["Hospital"]=Nurse1

            DeviceMac,y9 = "", ""
            if 'DeviceMac' in request.args:
                DeviceMac=request.args["DeviceMac"]

            if DeviceMac !="":
                query3 ="select  PM.PatientId as PatientId,PM.PatientName,PM.heartRate,PM.highPressure,PM.lowPressure,PM.pulseRate,PM.spo2,PM.temperature,um.name as Doctorname,PM.PhoneNo,PM.Address,PM.hospitalId as Hospital_Id,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name  as hospital_Name,"
                query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.DoctorID as DoctorID "
                query3= query3+ " from userMaster as um,Patient_master as PM,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs  where pdm.doctorId=um.ID and  PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2'  and PM.Usertype_Id='" + str(y3) + "' and PM.DeviceMac='"+str(DeviceMac)+"'   ;"
                print(query3)
                cursor = conn.cursor()
                cursor.execute(query3)
                PatientData= cursor.fetchone()
                print("PatientData==============================",PatientData)
                print(PatientData)
            else:
                query2 = " select   * from Patient_master where Status<>'2'  and Usertype_Id ='" + str(y3) + "';" 
                cursor = conn.cursor()
                cursor.execute(query2)
                PatientData= cursor.fetchone()
            
            if PatientData !=None:
                Count= 1
                PatientData["heartRate"]=json.loads(PatientData["heartRate"].replace("'",'"'))
                PatientData["highPressure"]=json.loads(PatientData["highPressure"].replace("'",'"'))
                PatientData["lowPressure"]=json.loads(PatientData["lowPressure"].replace("'",'"'))
                PatientData["pulseRate"]=json.loads(PatientData["pulseRate"].replace("'",'"'))
                PatientData["spo2"]=json.loads(PatientData["spo2"].replace("'",'"'))
                PatientData["temperature"]=json.loads(PatientData["temperature"].replace("'",'"'))            
            else:
                Count=0

            cursor.close()
            data={"status":"true","result":loginuser[0],"Nurse Details":Nurse,"Patient Details":PatientData,"Count":Count}                      
            return data
    
    except KeyError as e:
        print("Exception---->" +str(e))        
        output = {"result":"Input Keys are not Found","status":"false"}
        return output 
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/login1', methods=['GET'])
def login1q():
    try:
        # userid = request.args['userid']
        password = request.args['password']
        name = request.args['name']
        browserId=request.args['browserId']
        Name=name

        query ="select  um.Email,um.ID,um.name as name,us.Usertype as Usertype,um.Usertype_Id as Usertype_Id from userMaster  as um,Usertype_master as us  where um.Usertype_Id=us.ID and  um.Email = '" + name + "' and password='" + password + "' and um.Status<>'2' ;"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        loginuser = cursor.fetchall()
        print("11111111111",loginuser)
       
        if loginuser==():
            query="select  counter from userMaster  where Email='" + name + "' ; "
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            data=cursor.fetchone()
            if data != ():
                print(1)
                p=data["counter"]               
                if (int(p)<3):
                    data["counter"]=int(p)+1
                    print(data["counter"])
                    query="update  userMaster set counter='" + str(data["counter"]) + "' where Email='" + name + "' ;"
                    cursor.execute(query)
                    conn.commit()
                    query="select  counter from userMaster  where Email='" + name + "' ; "
                    cursor.execute(query)
                    data=cursor.fetchone()

                    p=data["counter"]
                    print(p)
                    if (int(p) >= 3):
                        query="update  userMaster set Status='2' where Email='" + name + "' and counter='3' ;"
                        cursor.execute(query)
                        conn.commit()
                        data={"status":"false","result":"Acess Denied,Please Contact Admin"}
                        return data
                    else: 
                        print("1111111111")
                        data={"status":"false","result":"Please Fill Your Correct Credentials"}
                        return data                                                
                else:
                    data={"status":"false","result":"Acess Denied,Please Contact Admin"}
                    return data
            else:
                data={"status":"false","result":"Please Fill Your Correct Credentials"}
                return data

        else:
            query="update userMaster set counter='0' where Email='" + name + "' and password='" + password + "';"
            cursor.execute(query)
            conn.commit()
            for d in loginuser:
                y9=d["ID"]
                y=  d["Usertype"]
                y3= d["Usertype_Id"]
                Nurse=""
                if d["Usertype"]== 'Nurse':                    
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where Usertype_Id=3 and  userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchone()
                    y2=Nur["Hospital_Id"]
                    query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName,um.ID as DoctorID,um.name as DoctorName,um.Email as Email,um.Gender,um.mobile from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2  and hm.ID = '" + str(y2) + "';"
                    print(query2)
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    Nurse = cursor.fetchall()
                
                if d["Usertype"]== 'Doctor':
                    query= "select browserId,browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =2; "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    loginmultiple = cursor.fetchone()
                    query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()       
                    print(loginmultiple)                   
                    print(type(browserId))
                   
                    if (loginmultiple["browserId"]== browserId) :
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                                             
                        if (loginmultiple["browserStatus"]!= 1):                           
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        else:                           
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()

                    else:
                        query="select browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =2 "
                        print("sss")
                        cursor = conn.cursor()
                        cursor.execute(query)
                        data=cursor.fetchone()
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                           
                        if (data["browserStatus"] !=1):
                            data={"result":"true","status":"You Already login through another Device"}
                            return data                       
                        else:
                            query="update userMaster set browserId= '" + str(browserId) + "',browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            print(query)
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                    
                    Nurse=[]
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where  Usertype_Id=2 and userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchall()
                    print(Nur)
                    for i in Nur:
                        query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName,um.ID as DoctorID,um.name as DoctorName,um.Email as Email,um.Gender,um.mobile from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2 and  um.Email='"+name +"'    and hm.ID = '" + str(i["Hospital_Id"]) + "';"
                        print(query2)
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        Nurs = cursor.fetchone()
                        Nurse.append(Nurs)
                         
                if  d["Usertype"]== 'Operation':
                    query= "select browserId,browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =4; "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    loginmultiple = cursor.fetchone()       
                    print(loginmultiple)
                    query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()
                                       
                    print(type(browserId))
                   
                    if (loginmultiple["browserId"]== browserId) :
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                                             
                        if (loginmultiple["browserStatus"]!= 1):                           
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        else:                           
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()

                    else:                        
                        query="select browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =4 "
                        print("sss")
                        cursor = conn.cursor()
                        cursor.execute(query)
                        data=cursor.fetchone()
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                        
                        if (data["browserStatus"] !=1):
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                                
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        
                        else:                            
                            query="update userMaster set browserId= '" + str(browserId) + "',browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            print(query)
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                    
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where  Usertype_Id=4 and userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchone()
                    print(Nur)
                    y2=Nur["Hospital_Id"]
                    query2= "select hm.ID as hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName from HubMaster as Hbs,Hospital_master as hm where hm.HubId=Hbs.ID and hm.ID= '" + str(y2) + "';"
                    print(query2)
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    Nurse=cursor.fetchone()
                    print("Operation",Nurse)

                if  d["Usertype"]== 'HubAdmin':
                    
                    query= "select browserId,browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =6; "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    loginmultiple = cursor.fetchone()
                    query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()       
                    print(loginmultiple)
                   
                    print(type(browserId))
                   

                    if (loginmultiple["browserId"]== browserId) :
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()                       
                      
                        if (loginmultiple["browserStatus"]!= 1):                           
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        else:
                           
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()                    
                    else:
                        query="select browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =6 "
                        print("sss")
                        cursor = conn.cursor()
                        cursor.execute(query)
                        data=cursor.fetchone()
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                        if (data["browserStatus"] !=1):
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                           
                            data={"result":"true","status":"You Already login through another Device"}
                            return data                        
                        else:
                            query="update userMaster set browserId= '" + str(browserId) + "',browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            print(query)
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                    Nurse=[]
                    query= "select hubId as HubId from userHubMapping where   userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nurse = cursor.fetchall()
                    
                    for i in Nurse:
                        query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName  from userMaster as um, userHubMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hubId=Hbs.ID and  hm.HubId=Hbs.ID     and hm.HubId = '" + str(i["HubId"]) + "';"
                        print(query2)
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        Nurse1 = cursor.fetchall()
                        i["Hospital"]=Nurse1

                if  d["Usertype"]== 'HubDoctor':
                    
                    query= "select browserId,browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =5; "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    loginmultiple = cursor.fetchone()       
                    print(loginmultiple)
                   
                    print(type(browserId))
                   

                    if (loginmultiple["browserId"]== browserId) :
                       
                      
                        if  (loginmultiple["browserStatus"]!= 1):
                           
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        else:
                           
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                           
                            



                    
                    else:
                        query="select browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =5 "
                        print("sss")
                        cursor = conn.cursor()
                        cursor.execute(query)
                        data=cursor.fetchone()
                        if (data["browserStatus"] !=1):
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        
                        else:
                            query="update userMaster set browserId= '" + str(browserId) + "',browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            print(query)
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                    Nurse=[]
                    query= "select hubId as HubId from userHubMapping where   userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nurse = cursor.fetchall()
                    
                    for i in Nurse:
                        query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName  from userMaster as um, userHubMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hubId=Hbs.ID and  hm.HubId=Hbs.ID     and hm.HubId = '" + str(i["HubId"]) + "';"
                        print(query2)
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        Nurse1 = cursor.fetchall()
                        i["Hospital"]=Nurse1
                
                if  d["Usertype"]== 'admin':
                    query= "select browserId,browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =1; "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    loginmultiple = cursor.fetchone()       
                    print(loginmultiple)
                    query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()
                   

                    
                    print(type(browserId))
                   

                    if (loginmultiple["browserId"]== browserId) :
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                       
                      
                        if  (loginmultiple["browserStatus"]!= 1):
                           
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        else:
                           
                            query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()
                           
                            



                    
                    else:
                        
                        query="select browserStatus from userMaster where Email= '" + name + "' and password='" + password + "'and Usertype_Id =1 "
                        print("sss")
                        cursor = conn.cursor()
                        cursor.execute(query)
                        data=cursor.fetchone()
                        query="update userMaster set browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                        cursor = conn.cursor()
                        cursor.execute(query)
                        conn.commit()
                        
                        if (data["browserStatus"] !=1):
                            
                            data={"result":"true","status":"You Already login through another Device"}
                            return data
                        
                        else:
                            
                            query="update userMaster set browserId= '" + str(browserId) + "',browserStatus=1  where Email= '" + name + "' and password='" + password + "' "
                            print(query)
                            cursor = conn.cursor()
                            cursor.execute(query)
                            conn.commit()       
            
            DeviceMac,y9 = "", ""
            if 'DeviceMac' in request.args:
                DeviceMac=request.args["DeviceMac"]

            if DeviceMac !="":
                query3 ="select  PM.PatientId as PatientId,PM.PatientName,PM.heartRate,PM.highPressure,PM.lowPressure,PM.pulseRate,PM.spo2,PM.temperature,um.name as Doctorname,PM.PhoneNo,PM.Address,PM.hospitalId as Hospital_Id,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name  as hospital_Name,"
                query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.DoctorID as DoctorID "
                query3= query3+ " from userMaster as um,Patient_master as PM,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs  where pdm.doctorId=um.ID and  PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2'  and PM.Usertype_Id='" + str(y3) + "' and PM.DeviceMac='"+str(DeviceMac)+"'   ;"
                print(query3)
                cursor = conn.cursor()
                cursor.execute(query3)
                PatientData= cursor.fetchone()
                print("PatientData==============================",PatientData)
                print(PatientData)

               
            else:
                query2 = " select   * from Patient_master where Status<>'2'  and Usertype_Id ='" + str(y3) + "';" 
                cursor = conn.cursor()
                cursor.execute(query2)
                PatientData= cursor.fetchone()

           
            
            if PatientData !=None:

                Count= 1
                PatientData["heartRate"]=json.loads(PatientData["heartRate"].replace("'",'"'))
                PatientData["highPressure"]=json.loads(PatientData["highPressure"].replace("'",'"'))
                PatientData["lowPressure"]=json.loads(PatientData["lowPressure"].replace("'",'"'))
                PatientData["pulseRate"]=json.loads(PatientData["pulseRate"].replace("'",'"'))
                PatientData["spo2"]=json.loads(PatientData["spo2"].replace("'",'"'))
                PatientData["temperature"]=json.loads(PatientData["temperature"].replace("'",'"'))
            
            else:
                Count=0

            cursor.close()

            data={"status":"true","result":loginuser[0],"Nurse Details":Nurse,"Patient Details":PatientData,"Count":Count}                      
            return data

    
    except KeyError as e:
        print("Exception---->" +str(e))        
        output = {"result":"Input Keys are not Found","status":"false"}
        return output 
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/allHospital', methods=['post'])
def allHospital():
    try:
        WhereCondition = ""
        if 'searchFilter' in request.args:
            if request.args['searchFilter'] != "":
                searchFilter = request.args["searchFilter"]
                WhereCondition = " Hospital_master.hospital_name LIKE '" + "%" + str(searchFilter) + "%" + "'"
        query="select Hospital_master.ID,Hospital_master.hospital_name,Hospital_master.Address,"
        query=query+"HubMaster.HubName,HubMaster.ID as HubId  from Hospital_master inner join HubMaster on Hospital_master.HubId=HubMaster.ID where  " + str(WhereCondition) + " order by Hospital_master.ID DESC;"
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        
        
        for i in data:
            query1="select count(*) as count from userHospitalMapping where  Usertype_Id=2 and  hospitalId='"+str(i["ID"])+"';" 
            
            cursor.execute(query1)
            data1 = cursor.fetchall()
            
            i["total_doctor"]=data1[0]["count"]
            query2="select um.ID as ID,mpum.hospitalId as hospitalId  from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2  and  hm.ID='"+str(i["ID"])+"';"
            print(query2)
            cursor.execute(query2)
            data2 = cursor.fetchall()
            print(data2)
            count=0
            for j in data2:
                query1 = " select  count(*) as count from Patient_master  where  Status<>'2'  AND hospitalId='"+str(j["hospitalId"])+"'  and PatientId IN (select Patient_Id  from patientDoctorMapping  where  Status<>'2' AND  doctorId= '"+str(j["ID"])+"') ;"
                cursor.execute(query1)
                data3 = cursor.fetchall()
                print(data3)
                count+=data3[0]["count"]
            i["total_patient"]=count
    
        cursor.close()
        return {"data":data,"status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

#admin doctors

@app.route('/allDoctor', methods=['post'])
def allDoctor():
    try:
        WhereCondition = " um.Usertype_Id=2 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID "
        if 'searchFilter' in request.args:
            if request.args['searchFilter'] != "":
                searchFilter = request.args["searchFilter"]
                WhereCondition = WhereCondition + " and um.name LIKE '" + "%" + str(searchFilter) + "%" + "'"
                # WhereCondition = WhereCondition + " and um.name LIKE '" + "%" + str(searchFilter) + "%" + "' OR um.Email LIKE '" + "%" + str(searchFilter) + "%" + "' OR hsm.hospital_name LIKE '" + "%" + str(searchFilter) + "%" + "' OR um.mobile LIKE '" + "%" + str(searchFilter) + "%" + "'"
    
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.mobile,um.password,um.name as DoctorName,um.licenseNo as licenseNo,um.Status as Status,um.Email,um.Gender,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where  " + str(WhereCondition) + " ORDER BY  um.ID DESC;"
        print(query)

        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from patientDoctorMapping pdm,Patient_master pm where pm.Status<>'2'  and pm.PatientId=pdm.Patient_Id and  pm.hospitalId='"+ str(i["Hospital_Id"])+"'and doctorId='"+str(i["ID"])+"';"
            cursor.execute(query1)
            data1= cursor.fetchall()
            print(data1)
            i["patient"]=data1[0]["count"]
            
            query2="select hospitalId from userHospitalMapping where userId='"+str (i["ID"])+"';"
            cursor.execute(query2)
            data2= cursor.fetchall()
            print(data2)
            i["totalHospitals"]=data2
            
            
            for j in data2:
                query3="select hospital_name from Hospital_master where ID='"+str (j["hospitalId"])+"';"
                cursor.execute(query3)
                data3= cursor.fetchall()
                print(data3)
                j["hospitalName"]=data3[0]["hospital_name"]
                
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/allHubadmin', methods=['post'])
def allHubadmin():
    try:
        WhereCondition = " um.Usertype_Id=6 and um.ID=uhm.userId and uhm.hubId=hm.ID "
        if 'searchFilter' in request.args:
            if request.args['searchFilter'] != "":
                searchFilter = request.args["searchFilter"]
                WhereCondition = WhereCondition + " and um.name LIKE '" + "%" + str(searchFilter) + "%" + "'"
        totalpatient=0
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.name,um.mobile,um.password,um.Email,um.Status,um.Gender,um.Usertype_Id,hm.ID as HubId,hm.HubName from userMaster um,HubMaster hm, "
        query=query+" userHubMapping uhm where  " + str(WhereCondition) + "  order by um.ID desc;"
        # print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        # print(data)
        for i in data:
            query2="select hsm.ID as Hospital_Id from userMaster um,HubMaster hm,Hospital_master hsm,userHubMapping uhm where um.Usertype_Id=6 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hubId=hm.ID and hm.ID='"+str (i["HubId"])+"'  and um.ID='"+str (i["ID"])+"';"
            cursor.execute(query2)
            data2= cursor.fetchall()
            
            print(data2,"================================================================")
            i["totalHospitals"]=len(data2)

            totalpatient=0
            for j in data2:
                query1="select  count(*)  as count from Patient_master pm,Hospital_master hm,HubMaster Hm  where pm.Status<>'2'  and  pm.hospitalId=hm.ID and hm.HubId=Hm.ID  and  pm.hospitalId='"+ str(j["Hospital_Id"])+"'  ;"
                cursor.execute(query1)
                data1= cursor.fetchall()
                # print(data1)
                # print("data1======================",data1)
                totalpatient+=data1[0]["count"]



            

            i["patient"]=totalpatient



           
            
            
           

                
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/allNurse', methods=['post'])
def allNurse():
    try:
        WhereCondition = " um.Usertype_Id=3 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID "
        if 'searchFilter' in request.args:
            if request.args['searchFilter'] != "":
                searchFilter = request.args["searchFilter"]
                WhereCondition = WhereCondition + " and um.name LIKE '" + "%" + str(searchFilter) + "%" + "'"

        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.name,um.mobile,um.password,um.Email,um.Gender,um.Status,um.Usertype_Id,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where " + str(WhereCondition) + " order by um.ID desc;"
        print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from patientNurseMapping pdm,Patient_master pm where pm.Status<>'2'  and pm.PatientId=pdm.Patient_Id and  pm.hospitalId='"+ str(i["Hospital_Id"])+"'and nurse_Id='"+str(i["ID"])+"';"
            cursor.execute(query1)
            data1= cursor.fetchall()
            print(data1)
            i["patient"]=data1[0]["count"]
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output





@app.route('/alloperations', methods=['post'])
def alloperations():
    try:
        WhereCondition = " um.Usertype_Id=4 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID "
        if 'searchFilter' in request.args:
            if request.args['searchFilter'] != "":
                searchFilter = request.args["searchFilter"]
                WhereCondition = WhereCondition + " and um.name LIKE '" + "%" + str(searchFilter) + "%" + "'"

        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.name,um.mobile,um.password,um.Email,um.Gender,um.Usertype_Id,um.Status,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where " + str(WhereCondition) + " order by um.ID desc;"
        print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from Patient_master pm where pm.Status<>'2' and  pm.hospitalId='"+ str(i["Hospital_Id"])+"';"
            cursor.execute(query1)
            data1= cursor.fetchall()
            print(data1)
            i["patient"]=data1[0]["count"]
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


#admin patients
@app.route('/allPatient', methods=['post'])
def allPatient():
    try:
        WhereCondition = " pdm.doctorId=um.ID and  PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2' "
        if 'searchFilter' in request.args:
            if request.args['searchFilter'] != "":
                searchFilter = request.args["searchFilter"]
                WhereCondition = WhereCondition + " and PM.PatientName LIKE '" + "%" + str(searchFilter) + "%" + "'"
        query3 ="select  PM.PatientId as ID,PM.hospitalId as Hospital_Id,PM.PatientName,PM.heartRate,PM.spo2,PM.highPressure,PM.lowPressure,PM.pulseRate,PM.temperature,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name  as hospital_Name,"
        query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.DoctorID as DoctorID"
        query3= query3 + " from userMaster as um,Patient_master  as PM ,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs  where " + str(WhereCondition) + " ORDER BY  ID DESC;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query3)
        data= cursor.fetchall()
        cursor.close()
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/session', methods=['GET'])
def session():
    try:
       
        name = request.args['name']
        browserId=request.args['browserId']
        query= "select browserStatus from userMaster where browserId='" + browserId + "' and Email='" + name + "';"
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchone()
        cursor.close()
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"Please Log out through other Device","status":"false"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

#hubLoginHospital

@app.route('/hubadminHospital', methods=['post'])
def hubadminHospital():
    try:
        json1=request.get_data()
        Data=json.loads(json1.decode("utf-8"))

        query="select Hospital_master.ID,Hospital_master.hospital_name,Hospital_master.Address,"
        query=query+"HubMaster.HubName,HubMaster.ID as HubId  from Hospital_master inner join HubMaster on Hospital_master.HubId=HubMaster.ID where Hospital_master.HubId='"+str(Data["HubId"])+"'  order by Hospital_master.ID DESC;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        
        
        for i in data:
            query1="select count(*) as count from userHospitalMapping where  Usertype_Id=2 and  hospitalId='"+str(i["ID"])+"';" 
            
            cursor.execute(query1)
            data1 = cursor.fetchall()
            
            i["total_doctor"]=data1[0]["count"]
            query2="select um.ID as ID,mpum.hospitalId as hospitalId  from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2  and  hm.ID='"+str(i["ID"])+"';"
            print(query2)
            cursor.execute(query2)
            data2 = cursor.fetchall()
            print(data2)
            count=0
            for j in data2:
                query1 = " select  count(*) as count from Patient_master  where  Status<>'2'  AND hospitalId='"+str(j["hospitalId"])+"'  and PatientId IN (select Patient_Id  from patientDoctorMapping  where  Status<>'2' AND  DoctorID= '"+str(j["ID"])+"') ;"
                cursor.execute(query1)
                data3 = cursor.fetchall()
                print(data3)
                count+=data3[0]["count"]
            i["total_patient"]=count
    
        cursor.close()
        return {"data":data,"status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


#hubLoginDoctor

@app.route('/hubadminDoctor', methods=['post'])
def hubloginDoctor():
    try:
        json1=request.get_data()
        Data=json.loads(json1.decode("utf-8"))
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.mobile,um.password,um.name as DoctorName,um.licenseNo as licenseNo,um.Email,um.Gender,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where um.Usertype_Id=2 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID and hsm.HubId='"+str(Data["HubId"])+"'  ;"
        print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from patientDoctorMapping pdm,Patient_master pm where pm.Status<>'2'  and pm.PatientId=pdm.Patient_Id and  pm.hospitalId='"+ str(i["Hospital_Id"])+"'and doctorId='"+str(i["ID"])+"';"
            cursor.execute(query1)
            data1= cursor.fetchall()
            print(data1)
            i["patient"]=data1[0]["count"]

            query2="select hospitalId from userHospitalMapping where userId='"+str (i["ID"])+"';"
            cursor.execute(query2)
            data2= cursor.fetchall()
            print(data2)
            i["totalHospitals"]=data2
            
            
            for j in data2:
                query3="select hospital_name from Hospital_master where ID='"+str (j["hospitalId"])+"';"
                cursor.execute(query3)
                data3= cursor.fetchall()
                print(data3)
                j["hospitalName"]=data3[0]["hospital_name"]
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/hubadminNurse', methods=['post'])
def hubadminNurse():
    try:
        json1=request.get_data()
        Data=json.loads(json1.decode("utf-8"))
        
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.name,um.mobile,um.password,um.Email,um.Gender,um.Usertype_Id,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where um.Usertype_Id=3 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID   and hsm.HubId='"+str(Data["HubId"])+"'  order by um.ID desc;"
        print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from patientNurseMapping pdm,Patient_master pm where pm.Status<>'2'  and pm.PatientId=pdm.Patient_Id and  pm.hospitalId='"+ str(i["Hospital_Id"])+"'and nurse_Id='"+str(i["ID"])+"';"
            cursor.execute(query1)
            data1= cursor.fetchall()
            print(data1)
            i["patient"]=data1[0]["count"]
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/hubadminOperations', methods=['post'])
def hubadminOperations():
    try:
        json1=request.get_data()
        Data=json.loads(json1.decode("utf-8"))
        
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.name,um.mobile,um.password,um.Email,um.Gender,um.Usertype_Id,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where um.Usertype_Id=4 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID   and hsm.HubId='"+str(Data["HubId"])+"'  order by um.ID desc;"
        print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from Patient_master pm where pm.Status<>'2' and  pm.hospitalId='"+ str(i["Hospital_Id"])+"';"
            cursor.execute(query1)
            data1= cursor.fetchall()
            print(data1)
            i["patient"]=data1[0]["count"]
        
        cursor.close()    
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output






#hubLoginPatient



@app.route('/hubadminPatient', methods=['post'])
def hubloginPatient():
    try:
        
        json1=request.get_data()
        Data=json.loads(json1.decode("utf-8"))
        query3 ="select  PM.PatientId as ID,PM.hospitalId as Hospital_Id,PM.PatientName,PM.PhoneNo,Hbs.HubName,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name as hospital_Name , "
        query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber"
        query3= query3 + " from Patient_master  as PM ,Hospital_master as Hm,HubMaster as Hbs  where PM.hospitalId=Hm.ID  and  Hbs.ID='"+str(Data["HubId"])+"'    and PM.Status<>'2'   ORDER BY  ID DESC;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query3)
        data= cursor.fetchall()
        cursor.close()

        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output






@app.route('/doctorLoginHospital', methods=['post'])
def doctorLoginHospital():
    try:
        json1=request.get_data()
        
        data=json.loads(json1.decode("utf-8"))
        
        query="select us.ID as  ID ,ushm.hospitalId as HospitalId from userMaster as us ,Hospital_master as hm,HubMaster as Hm,userHospitalMapping as ushm where ushm.userId=us.Id and  hm.ID=ushm.hospitalId   and  Hm.ID= hm.HubId and   us.Usertype_Id=2  and  us.Email='"+str(data["Email"])+"';"
        
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            print("11111111")
            query1="select  count(*) as patient_count from Patient_master  where  Status<>'2'  AND hospitalId='"+str(i["HospitalId"])+"'  and PatientId IN (select Patient_Id  from patientDoctorMapping  where  Status<>'2' AND  doctorId= '"+str(i["ID"])+"');"
            cursor = conn.cursor()
            cursor.execute(query1)
            data1= cursor.fetchall()
            i["patient_count"]=data1[0]['patient_count']
            query2="select hospital_name,HubId,Address from Hospital_master where ID='"+str(i["HospitalId"])+"';"
            cursor = conn.cursor()
            cursor.execute(query2)
            data2= cursor.fetchall()
            print(data2)
            i["hospital_name"]=data2[0]['hospital_name']
            i["HubId"]=data2[0]['HubId']
            i["hospital_address"]=data2[0]['Address']
            # query3="select hospital_name,HubId from Hospital_master where ID='"+str(i["HospitalId"])+"';"
            # cursor = conn.cursor()
            # cursor.execute(query3)
            # data3= cursor.fetchall()
            # i["hospital_name"]=data3[0]['hospital_name']
        for i in data:
            if i["patient_count"]==0:
                data.remove(i)
        cursor.close()
        if data:
            return {"result":data,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output




@app.route('/doctorLoginDashboard', methods=['post'])
def doctorLoginDashboard():
    try:
        json1=request.get_data()
        data=json.loads(json1.decode("utf-8"))
        print(data)
        conn=Connection()
        cursor = conn.cursor()
        query1=" select um.ID, hsm.hospital_name,hsm.ID as HospitalId,hm.ID as HubId,hm.HubName from HubMaster hm,Hospital_master hsm,userMaster um,userHospitalMapping uhm" 
        query1=query1+" where hm.ID=hsm.HubId and hsm.ID=uhm.hospitalId and uhm.userId=um.ID and um.Email='"+str(data["Email"])+"' order by um.ID desc;"
        cursor.execute(query1)
        data1= cursor.fetchall()
        print(data1)
        total_patient=0
        for i in data1:
            
            query2="select PatientId,hospitalId,PatientName,heartRate,spo2,highPressure,lowPressure,pulseRate,temperature,BloodGroup,DeviceMac,Bed_Number,roomNumber,Gender,age from Patient_master pm,patientDoctorMapping pdm where pm.Status<>'2' and pdm.Patient_Id=pm.PatientId " 
            query2=query2+" and pdm.doctorId='"+str(i["ID"]) +"' and pm.hospitalId='"+str(i["HospitalId"])+"' order by PatientId desc;"
            cursor.execute(query2)
            data2= cursor.fetchall()
            for j in data2:
                
                j["heartRate"]=json.loads(j["heartRate"].replace("'",'"'))
                print('j["heartRate"]',j["heartRate"])
                j["highPressure"]=json.loads(j["highPressure"].replace("'",'"'))
                j["lowPressure"]=json.loads(j["lowPressure"].replace("'",'"'))
                j["pulseRate"]=json.loads(j["pulseRate"].replace("'",'"'))
                j["spo2"]=json.loads(j["spo2"].replace("'",'"'))
                j["temperature"]=json.loads(j["temperature"].replace("'",'"'))
            
                
            i["patient_Details"]=data2
            i["total_patient"]=len(i["patient_Details"])
            
        for i in data1:
            if i["patient_Details"]==():
                data1.remove(i)
        for i in data1:
            total_patient+=len(i["patient_Details"])
        cursor.close()
        if data1:
            # data.append({"Total_hospital":len(data)})
            # data.append({"total_patient":total_patient})
            data= {"result":data1,"Total_hospital":len(data1),"total_patient":total_patient,"status":"true"}
            return json.loads(json.dumps(data))
           
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output







@app.route('/hubdoctorLoginDashboard', methods=['post'])
def hubdoctorLoginDashboard():
    try:
        json1=request.get_data()
        data=json.loads(json1.decode("utf-8"))
        print(data)
        conn=Connection()
        cursor = conn.cursor()
        query1="   select hm.ID as HubId,hm.HubName from HubMaster hm,userMaster um,userHubMapping uhm  where  hm.ID=uhm.hubId and uhm.userId=um.ID and" 
        query1=query1+"  um.Email= '"+str(data["Email"])+"' order by hm.ID desc ;"
        cursor.execute(query1)
        data1= cursor.fetchall()
        count=0
        count2=0
        print(data1)
        for i in data1:
            query2= "select hm.ID as HospitalId,hm.hospital_name  from Hospital_master as hm where hm.HubId='"+str(i["HubId"])+"' "
            cursor.execute(query2)
            data2=cursor.fetchall()
            i["Hospitals"]=data2
            i["hospitalCount"]=len(data2)
            for k in data2:
                query2="select PatientId,hospitalId,PatientName,heartRate,spo2,highPressure,lowPressure,pulseRate,temperature,BloodGroup,DeviceMac,Bed_Number,roomNumber,Gender,age from Patient_master pm where pm.Status<>'2' and " 
                query2=query2+"  pm.hospitalId='"+str(k["HospitalId"])+"' order by PatientId desc;"
                cursor.execute(query2)
                data6=cursor.fetchall()
                k["patient_count"]=len(data6)
               


            
        print(data1)
        for j in data1:
            
            count+=j["hospitalCount"]
            
            for k in j["Hospitals"]:
                count2+=k["patient_count"]
        cursor.close()
        if data1:
            # data.append({"Total_hospital":len(data)})
            # data.append({"total_patient":total_patient})
            #data= {"result":data1,"Total_hub":len(data1),"total_hospital":len(data2),"hospital":data2,"status":"true"}
            return  {"result":data1,"totalHub":len(data1),"totalHospitals":count,"totalpatients":count2,"status":"true"}
           
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


# @app.route('/doctorLoginDashboard22', methods=['post'])
# def doctorLoginDashboard22():
#     try:
#         json1=request.get_data()
#         data=json.loads(json1.decode("utf-8"))
#         print(data)
#         conn=Connection()
#         cursor = conn.cursor()
#         query1=" select um.ID, hsm.hospital_name,hsm.ID as HospitalId,hm.ID as HubId,hm.HubName from HubMaster hm,Hospital_master hsm,userMaster um,userHospitalMapping uhm" 
#         query1=query1+" where hm.ID=hsm.HubId and hsm.ID=uhm.hospitalId and uhm.userId=um.ID and um.Email='"+str(data["Email"])+"';"
#         cursor.execute(query1)
#         data1= cursor.fetchall()
#         print(data1)
#         total_patient=0
#         for i in data1:
            
#             query2="select PatientId,hospitalId,PatientName,heartRate,spo2,highPressure,lowPressure,pulseRate,temperature,BloodGroup,DeviceMac,Bed_Number,roomNumber,Gender,age from Patient_master pm,patientDoctorMapping pdm where pm.Status<>'2' and pdm.Patient_Id=pm.PatientId " 
#             query2=query2+" and pdm.doctorId='"+str(i["ID"]) +"' and pm.hospitalId='"+str(i["HospitalId"])+"';"
#             cursor.execute(query2)
#             data2= cursor.fetchall()
#             for d in data2:
#                 d[d]["heartRate"]=json.loads(d[d]["heartRate"].replace("'",'"'))
#                 d[d]["lowPressure"]=json.loads(data2[d]["lowPressure"].replace("'",'"'))
#                 data2[d]["pulseRate"]=json.loads(data2[d]["pulseRate"].replace("'",'"'))
#                 data2[d]["temperature"]=json.loads(data2[d]["temperature"].replace("'",'"'))
#                 data2[d]["highPressure"]=json.loads(data2[d]["highPressure"].replace("'",'"'))
#                 data2[d]["spo2"]=json.loads(data2[d]["spo2"].replace("'",'"'))


            
#             i["patient_Details"]=data2
#             i["total_patient"]=len(i["patient_Details"])
            
#         for i in data1:
#             if i["patient_Details"]==():
#                 data1.remove(i)
#         for i in data1:
#             total_patient+=len(i["patient_Details"])
#         cursor.close()
#         if data1:
#             # data.append({"Total_hospital":len(data)})
#             # data.append({"total_patient":total_patient})
#             data={"result":data1,"Total_hospital":len(data1),"total_patient":total_patient,"status":"true"}
#             return data
#         else:
#             return {"result":"No Record Found","status":"true"}
    
#     except Exception as e :
#         print("Exception---->" +str(e))           
#         output = {"result":"something went wrong","status":"false"}
#         return output



@app.route('/doctorPatientDetails', methods=['POST'])
def doctorPatientDetails():
    try:
        json1=request.get_data()
        print(json1)
        data=json.loads(json1.decode("utf-8"))
        query2 ="select ID as DoctorID,Email as Email from userMaster where Usertype_Id=2 and Email ='"+str(data["Email"])+"';"  
        print(query2)
        conn=Connection() 
        cursor = conn.cursor()
        cursor.execute(query2)
        data1 = cursor.fetchall()
        
        l1=[]
        for dat in data1:
            doctor_Id=dat["DoctorID"]
            l2=[]
            query3 ="select  PM.PatientId as PatientId,PM.PatientName,PM.heartRate,PM.spo2,PM.highPressure,PM.lowPressure,PM.pulseRate,PM.temperature,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name  as hospital_Name,"
            query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.DoctorID as DoctorID"
            query3= query3 + " from Patient_master  as PM ,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs  where PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2'   and DoctorID='" + str(doctor_Id) + "'  ORDER BY  PatientId DESC;"
            cursor = conn.cursor()
            cursor.execute(query3)
            data27 = cursor.fetchall()
            if data27 != ():
                uu= data27
                l1.append(data27)
        cursor.close()
       
        if uu:           
            Data = {"Patient Details":uu,"status":"true"}
            return Data
        else:
            data={"status":"false","result":"Invalid Email "}
            return data

    except KeyError as e:
        print("Exception---->" +str(e))        
        output = {"result":"Input Keys are not Found","status":"false"}
        return output 
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output 

#after Doctor login ,in hospital section click on hospital eye show the hospital and patient information pass arguments  hospitalId  and doctor Email


@app.route('/HospitalPatientDetails', methods=['POST'])
def HospitalPatientDetails():
    try:
        json1=request.get_data()
        print(json1)
        data=json.loads(json1.decode("utf-8"))
        query2 ="select us.ID as DoctorID ,us.Email as Email ,hm.HubId as HubId ,Hm.HubName as HubName,hm.ID as Hospital_Id" 
        query2=query2+" from userMaster as us ,Hospital_master as hm,HubMaster as Hm,userHospitalMapping as ushm where" 
        query2=query2+" ushm.userId=us.Id and  hm.ID=ushm.hospitalId   and  Hm.ID= hm.HubId and   us.Usertype_Id=2  and " 
        query2=query2+" ushm.hospitalId='"+str(data["HospitalId"])+"' and  us.Email ='"+str(data["Email"])+"';"  
        print(query2)
        conn=Connection() 
        cursor = conn.cursor()
        cursor.execute(query2)
        data1 = cursor.fetchall()          
        print("data1aaaaaaaaaaaaaaaaaaaaaaaaaa",data1)
        l1=[]

        uu= 'NULL'

        for data in data1:
            doctor_Id=data["DoctorID"]
            Hubname= data["HubName"]
            Hub_Id=data["HubId"]

            l2=[]
            query3 ="select  PM.PatientId as PatientId,PM.PatientName,PM.heartRate,PM.spo2,PM.highPressure,PM.lowPressure,PM.pulseRate,PM.temperature,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name  as hospital_Name,"
            query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.DoctorID as DoctorID"
            query3= query3 + " from Patient_master  as PM ,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs " 
            query3=query3+" where PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2'   and "
            query3=query3+" pdm.doctorId='" + str(doctor_Id) + "' and PM.hospitalId='" + str(data["Hospital_Id"]) + "'  ORDER BY  PatientId DESC;"   
            print(query3)
            cursor = conn.cursor()
            cursor.execute(query3)
            data27 = cursor.fetchall()
            
            if data27 != ():
                uu= data27
               
                
        cursor.close()
       
        if uu:           
            Data = {"result":uu,"status":"true","HubName":Hubname,"HubId":Hub_Id}
            return Data
        else:
            data={"status":"false","result":"Invalid Email "}
            return data

    except KeyError as e:
        print("Exception---->" +str(e))        
        output = {"result":"Input Keys are not Found","status":"false"}
        return output 
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output 


#pass hospitalId
@app.route('/doctorDropdown', methods=['POST'])
def doctorDropdown():
    try:
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = " select um.ID as ID,um.name as DoctorName from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2  and hm.ID ='"+str(data["hospitalId"])+"';"
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


#admin hubdetail tab  -----not done
@app.route('/hubMaster', methods=['GET'])
def hubMaster():
    try:
        query = "select ID,HubName from HubMaster "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        #cursor.close()
        #counter=[]
        for i in data:
           
            query1 = "select count(*) as count from Hospital_master where HubId= '"+str(i["ID"])+"';"
            cursor.execute(query1)
            data1 = cursor.fetchall()
            
            i["total_hospital"]=data1[0]["count"]
            
            query2 = "select ID from Hospital_master where HubId= '"+str(i["ID"])+"';"
            cursor.execute(query2)
            data2 = cursor.fetchall()
            print(data2)
            count=0
            for j in data2:
                query1 = "select count(*) as count from userHospitalMapping where  Usertype_Id=2 and  hospitalId='"+str(j["ID"])+"';"
                cursor.execute(query1)
                data3 = cursor.fetchall()
                print(data3)
                count =data3[0]["count"]
            i["total_doctor"]=count
            
        cursor.close()
        if data:           
            Data =  {"HubMaster":data,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/hospitalMaster', methods=['POST'])
def hospitalMaster():
    try:
       
        json1=request.get_data() 
        
        
        
        if json1==b'':
            query1 = "select ID,hospital_name from Hospital_master"
        else:
            data=json.loads(json1.decode("utf-8")) 
            #query1 = "select ID,hospital_name from Hospital_master where HubId = '"+str(data["HubId"])+"' ;"
            query1 = "select ID,hospital_name from Hospital_master where HubId = "+str(data["HubId"])+" ;"
        
            
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data= cursor.fetchall()
        conn.commit()
        cursor.close()
        print(data)
        if data != ():
            return {"result":data,"status":"True"}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))  
            print("77787878")
            query2  = " insert into Hospital_master (hospital_name,HubId,Address)"
            query2 = query2 +" values("+'"'+str(data["hospital_name"])+'"'+','+'"'+str(data["HubId"])+'"'+','+'"'+str(data["Address"])+'"'+' '+");"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()
            output={"output": "Hospital Name Added succesfully","status":"true"}
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output
 
# @app.route('/doctorMaster', methods=['POST'])
# def doctorMaster():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8"))  
        # query1 = "select ID,DoctorName from DoctorMaster where HospitalId = "+str(data["ID"])+" ;"
        
        # print(query1)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query1)
        # data= cursor.fetchall()
        # conn.commit()
        # cursor.close()
        # print(data)
        # if data != None:
            # return {"result":data,"status":"True"}
        
    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
    # return output


# @app.route('/HubMaster', methods=['GET'])
# def HubMaster():
    # try:
        # query = "select * from HubMaster "
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query)
        # data = cursor.fetchall()
        # cursor.close()
        # if data:           
            # Data = json.dumps(data, default=str)
            # return str(Data)
        # else:
            # output = {"result":"No Data Found","status":"false"}
            # return output

    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
        # return output







@app.route('/updateStatus', methods=['POST'])
def updateStatus():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        conn=Connection()
        cursor = conn.cursor()
        
        query11 = " select Status from userMaster where Email = '" + str(data["Email"])+ "';"
        cursor.execute(query11)
        data1= cursor.fetchall()
        print("data=========================",data)
        if data1[0]["Status"]==0:
            query1 = " update userMaster set   counter='0',Status=2 where Email = '" + str(data["Email"])+ "';"
        else:
            query1 = " update userMaster set   counter='0',Status=0 where Email = '" + str(data["Email"])+ "';"
        print(query1)
        
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
        print("Exceptio`121QWAaUJIHUJG n---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/updateMessageStatus', methods=['POST'])
def updateMessageStatus():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        query1 = " update preiscribeMedicine set   status=1 where  id= '" + str(data["id"])+ "' and doctorId= '" + str(data["doctorId"])+ "' and patientId='" + str(data["patientId"])+ "';"
       
        
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
        output = {"result":"something went wrong","status":"false"}
        return output        

@app.route('/updatehubmaster', methods=['POST'])
def updatehubmaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update HubMaster set   HubName ='" + str(data["HubName"]) + "' where ID = '" + str(data["ID"])+ "';"
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
        print("Exceptio`121QWAaUJIHUJG n---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/updateHospitalmaster', methods=['POST'])
def hpsapitalmaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Hospital_master set   HubId ='" + str(data["HubId"]) + "', hospital_name='" + str(data["hospital_name"]) + "' , Address='" + str(data["Address"]) + "' , Status ='1'  where ID = '" + str(data["ID"])+ "';"
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
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/hospital_master_list', methods=['GET'])
def hospital_master_list():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select hospital_name from Hospital_master  "
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

@app.route('/hospital_master_list1', methods=['GET'])
def hospital_master_list2():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select hospital_name from Hospital_master  "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
        data1=[]
        for i in data:
            data1.append(i["hospital_name"])
        if data:           
            Data = {"result":data1,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/userTypeMaster', methods=['GET'])
def userTypeMaster():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select ID,Usertype from Usertype_master "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
        
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


@app.route('/preiscribeMedicine', methods=['GET'])
def preiscribeMedicine():
    try:
    
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        patientId=""
        if 'doctorId' in request.args:
            doctorId=request.args['doctorId']
        

        if 'PatientId' in request.args:
            patientId=request.args["PatientId"]
            print(type(patientId))
            if  (patientId!=0) and ('doctorId' in request.args):

                
                print("111111")
                WhereCondition2 =  " and  pmm.patientId    = '" + patientId + "'  "
                query = "select pmm.id,pmm.patientId,pmm.text,pmm.doctorId,pmm.dateCreate,pm.PatientName,pmm.status as status from preiscribeMedicine as pmm ,Patient_master as pm where doctorId='" + doctorId + "'and pm.PatientId=pmm.patientId  "+  WhereCondition2 +"  ORDER by pmm.id DESC limit  0,5"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                data = cursor.fetchall()

                query22="select count(*) as count from preiscribeMedicine as pmm ,Patient_master as pm where doctorId='" + doctorId + "'and pm.PatientId=pmm.patientId and pmm.status='0' "+  WhereCondition2 +"  ORDER by pmm.id DESC limit  0,5"
                cursor.fetchall(query22)
                data2=cursor.fetchall()
                for i in data2:
                    count=i['count']
                    print(count)


            if 'doctorId' not in request.args:
                WhereCondition2 =  " and  pmm.patientId    = '" + patientId + "'  "
                print("111111111111")
                query = "select pmm.id,pmm.patientId,pmm.text,pmm.doctorId,pmm.dateCreate,pm.PatientName,pmm.status as status from preiscribeMedicine as pmm ,Patient_master as pm where pmm.patientId='" + patientId + "'and pm.PatientId=pmm.patientId  "+  WhereCondition2 +"  ORDER by pmm.id DESC limit  0,5"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                query22="select count(*) as count from preiscribeMedicine as pmm ,Patient_master as pm where doctorId='" + doctorId + "'and pm.PatientId=pmm.patientId and pmm.status='0' "+  WhereCondition2 +"  ORDER by pmm.id DESC limit  0,5"
                cursor.fetchall(query22)
                data2=cursor.fetchall()
                for i in data2:
                    count=i['count']
                    print(count)

                

        
        else:
            print("not patient")
            WhereCondition1=""

            query2 = "select pmm.id,pmm.patientId,pmm.text,pmm.doctorId,pmm.dateCreate,pm.PatientName,pmm.status as status from preiscribeMedicine as pmm ,Patient_master as pm where doctorId='" + doctorId + "'and pm.PatientId=pmm.patientId  "+  WhereCondition1 +"  ORDER by pmm.id DESC limit  0,5"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            data = cursor.fetchall()

            query1=  "select count(*) as count from preiscribeMedicine as pmm ,Patient_master as pm where doctorId='" + doctorId + "'and pm.PatientId=pmm.patientId and pmm.status='0' "+  WhereCondition1 +"  ORDER by pmm.id DESC limit  0,5"
            cursor.execute(query1)
            data2=cursor.fetchall()
            for i in data2:
                count=i['count']
                print(count)

        
        cursor.close()
        
        
        if data:           
            Data = {"result":data,"Unreaded Messages":count,"status":"true"}
            return Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output




@app.route('/insertHubMaster', methods=['POST'])
def insertHubMaster():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from HubMaster where HubName="+'"'+str(data1["HubName"])+'";'
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
        
        if data==():           
            query2  = " insert into HubMaster (HubName)"
            query2 = query2 +" values("+'"'+str(data1["HubName"])+'");'
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output = {"result":"data inserted successfully","status":"true"}
            return output
        else:
            output = {"result":"HubName already Exist","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/insertHospitalMaster', methods=['POST'])
def insertHospitalMaster():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from Hospital_master where HubId='"+str(data1["HubId"])+ "' and hospital_name='"+str(data1["hospital_name"])+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
       
        if data==(): 
        
            print("1111111")

            query2  = " insert into Hospital_master (HubId,hospital_name,Address)"
            query2 = query2 +" values('"+str(data1["HubId"])+"','"+str(data1["hospital_name"])+"','"+str(data1["Address"])+"');"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output = {"result":"data inserted successfully","status":"true"}
            return output
        else:
            output = {"result":"HubName already Exist","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/addUser', methods=['POST'])
def addUser():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from userMaster where  Usertype_Id=3 and Email='"+str(data1["Email"])+ "';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchone()
        print(data)
        UserId=uuid.uuid1()
        UserID=UserId.hex
        if data==None:
            if data1["password"]==data1["confirm_password"]:
                query2  = " insert into userMaster (name,mobile,Usertype_Id,UserID,password,Email,Gender)"
                query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str('3')+"','"+str(UserID)
                query2=query2+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
                print(query2)
                
                cursor.execute(query2)
                conn.commit()
                query = "select ID as userId,Usertype_Id from userMaster where name= '"+str(data1["name"])+ "' and  Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data=cursor.fetchall()
                yu=data[-1]
                mainId=yu["userId"]
                Usertype_Id=yu["Usertype_Id"]
                HospitalId = data1["Hospital_Id"]
                for i in HospitalId:

                    query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                    
                    cursor.execute(query)
                    userHospitalMappingdata = cursor.fetchall()
                    if userHospitalMappingdata==():
                        query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                        query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        conn.commit()
                
                query = "select * from userMaster where  Usertype_Id=3 and Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data = cursor.fetchone()
                if data!=None:
                    print("data",data)
                    mainId=data["ID"]
                    Usertype_Id=data["Usertype_Id"]
                    HospitalId = data1["Hospital_Id"]
                    for i in HospitalId:
                        query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query)
                        userHospitalMappingdata = cursor.fetchall()
                        if userHospitalMappingdata==():
                            query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                            query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                            conn=Connection()
                            cursor = conn.cursor()
                            cursor.execute(query2)
                            conn.commit()
                cursor.close()                

                output = {"result":"data inserted successfully","status":"true"}
                return output
            else:
                output = {"result":"password mismatched","status":"false"}
                return output
        else:
            output = {"result":"User Already Added Existed ","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/addOperator', methods=['POST'])
def addOperator():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from userMaster where  Usertype_Id=4 and Email='"+str(data1["Email"])+ "';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchone()
        print(data)
        UserId=uuid.uuid1()
        UserID=UserId.hex
        if data==None:
            if data1["password"]==data1["confirm_password"]:
                query2  = " insert into userMaster (name,mobile,Usertype_Id,UserID,password,Email,Gender)"
                query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str('4')+"','"+str(UserID)
                query2=query2+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
                print(query2)
                
                cursor.execute(query2)
                conn.commit()
                query = "select ID as userId,Usertype_Id from userMaster where name= '"+str(data1["name"])+ "' and  Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data=cursor.fetchall()
                yu=data[-1]
                mainId=yu["userId"]
                Usertype_Id=yu["Usertype_Id"]
                HospitalId = data1["Hospital_Id"]
                for i in HospitalId:

                    query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                    
                    cursor.execute(query)
                    userHospitalMappingdata = cursor.fetchall()
                    if userHospitalMappingdata==():
                        query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                        query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        conn.commit()
                
                query = "select * from userMaster where  Usertype_Id=4 and Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data = cursor.fetchone()
                if data!=None:
                    print("data",data)
                    mainId=data["ID"]
                    Usertype_Id=data["Usertype_Id"]
                    HospitalId = data1["Hospital_Id"]
                    for i in HospitalId:
                        query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query)
                        userHospitalMappingdata = cursor.fetchall()
                        if userHospitalMappingdata==():
                            query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                            query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                            conn=Connection()
                            cursor = conn.cursor()
                            cursor.execute(query2)
                            conn.commit()
                cursor.close()                

                output = {"result":"data inserted successfully","status":"true"}
                return output
            else:
                output = {"result":"password mismatched","status":"false"}
                return output
        else:
            output = {"result":"User Already Added Existed ","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output






@app.route('/addDoctor', methods=['POST'])
def addDoctor():
    try:
        json1=request.get_data() 
        print(json1)
        data1=json.loads(json1.decode("utf-8"))  
        print(data1)
        conn=Connection()
        cursor = conn.cursor()
        query = "select * from userMaster where  Usertype_Id=2 and Email='"+str(data1["Email"])+ "';"
        
        cursor.execute(query)
        data = cursor.fetchone()
        print("data===========================",data)
        if data["Email"]==data1["Email"]:
            if data["name"]!=data1["name"]:
                output={"result":"name mismatched at this mailid","status":"true"}
                return output
        if data!=None:
            print("data",data)
            mainId=data["ID"]
            Usertype_Id=data["Usertype_Id"]
            HospitalId = data1["Hospital_Id"]
            for i in HospitalId:
                query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                
                cursor.execute(query)
                userHospitalMappingdata = cursor.fetchall()
                if userHospitalMappingdata==():
                    query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                    query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                    
                    cursor.execute(query2)
                    conn.commit()
            cursor.close()
        print(data)
        UserId=uuid.uuid1()
        UserID=UserId.hex
        if data==None:
            if data1["password"]==data1["confirm_password"]:
                query2  = " insert into userMaster (name,mobile,Usertype_Id,UserID,password,Email,Gender)"
                query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str('2')+"','"+str(UserID)
                query2=query2+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
                print(query2)
                
                cursor.execute(query2)
                conn.commit()
                query = "select ID as userId,Usertype_Id from userMaster where name= '"+str(data1["name"])+ "' and  Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data=cursor.fetchall()
                yu=data[-1]
                mainId=yu["userId"]
                Usertype_Id=yu["Usertype_Id"]
                HospitalId = data1["Hospital_Id"]
                for i in HospitalId:

                    query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                    
                    cursor.execute(query)
                    userHospitalMappingdata = cursor.fetchall()
                    if userHospitalMappingdata==():
                        query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                        query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        conn.commit()
                
                query = "select * from userMaster where  Usertype_Id=2 and Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data = cursor.fetchone()
                if data!=None:
                    print("data",data)
                    mainId=data["ID"]
                    Usertype_Id=data["Usertype_Id"]
                    HospitalId = data1["Hospital_Id"]
                    for i in HospitalId:
                        query = "select * from userHospitalMapping where hospitalId='"+str(i)+"'  and Usertype_Id='"+str(Usertype_Id)+"' and userid= '"+str(mainId)+"' ;"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query)
                        userHospitalMappingdata = cursor.fetchall()
                        if userHospitalMappingdata==():
                            query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
                            query2 = query2 +" values('"+str(mainId)+"','"+str(Usertype_Id)+"','"+str(i)+"');"
                            conn=Connection()
                            cursor = conn.cursor()
                            cursor.execute(query2)
                            conn.commit()
                cursor.close()                
                
                
                output = {"result":"data inserted successfully","status":"true"}
                return output
            else:
                output = {"result":"password mismatched","status":"false"}
                return output
        else:
            output = {"result":"New Hospital Added Successfully","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/addHubadmin', methods=['POST'])
def addHubadmin():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from userMaster where  Usertype_Id=6 and Email='"+str(data1["Email"])+ "';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchone()
        print(data)
        UserId=uuid.uuid1()
        UserID=UserId.hex
        if data==None:
            if data1["password"]==data1["confirm_password"]:
                query2  = " insert into userMaster (name,mobile,Usertype_Id,UserID,password,Email,Gender)"
                query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str('6')+"','"+str(UserID)
                query2=query2+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
                print(query2)
                
                cursor.execute(query2)
                conn.commit()
                query = "select ID as userId,Usertype_Id from userMaster where name= '"+str(data1["name"])+ "' and  Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data=cursor.fetchall()
                yu=data[-1]
                mainId=yu["userId"]
                Usertype_Id=yu["Usertype_Id"]
                HubId = data1["HubId"]
                print(HubId)
                for i in HubId:
                    query = "select * from userHubMapping where hubId='"+str(i)+"'   and userid= '"+str(mainId)+ "';"
                    cursor.execute(query)
                    userHubMappingdata = cursor.fetchall()
                    if userHubMappingdata==():
                        query2  = " insert into userHubMapping (userId,hubId,usertypeId)"
                        query2 = query2 +" values('"+str(mainId)+"','"+str(i)+"','"+str('6')+"' );"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        conn.commit()
                
                query = "select * from userMaster where  Usertype_Id=6 and Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data = cursor.fetchone()
                if data!=None:
                    print("data",data)
                    mainId=data["ID"]
                    Usertype_Id=data["Usertype_Id"]
                    HubId = data1["HubId"]
                    print(HubId)
                    for i in HubId:
                        query = "select * from userHubMapping where hubId='"+str(i)+"'   and userid= '"+str(mainId)+ "';"
                        cursor.execute(query)
                        userHubMappingdata = cursor.fetchall()
                        if userHubMappingdata==():
                            query2  = " insert into userHubMapping (userId,hubId,usertypeId)"
                            query2 = query2 +" values('"+str(mainId)+"','"+str(i)+"','"+str('6')+"' );"
                            conn=Connection()
                            cursor = conn.cursor()
                            cursor.execute(query2)
                            conn.commit()
                cursor.close()                

                output = {"result":"data inserted successfully","status":"true"}
                return output
            else:
                output = {"result":"password mismatched","status":"false"}
                return output
        else:
            output = {"result":"User Already Added Existed ","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/addHubDoctor', methods=['POST'])
def addHubDoctor1():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from userMaster where  Usertype_Id=5 and Email='"+str(data1["Email"])+ "';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchone()
        print(data)
        UserId=uuid.uuid1()
        UserID=UserId.hex
        if data==None:
            if data1["password"]==data1["confirm_password"]:
                query2  = " insert into userMaster (name,mobile,Usertype_Id,UserID,password,Email,Gender)"
                query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str('6')+"','"+str(UserID)
                query2=query2+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
                print(query2)
                
                cursor.execute(query2)
                conn.commit()
                query = "select ID as userId,Usertype_Id from userMaster where name= '"+str(data1["name"])+ "' and  Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data=cursor.fetchall()
                yu=data[-1]
                mainId=yu["userId"]
                Usertype_Id=yu["Usertype_Id"]
                HubId = data1["HubId"]
                print(HubId)
                for i in HubId:
                    query = "select * from userHubMapping where hubId='"+str(i)+"'   and userid= '"+str(mainId)+ "';"
                    cursor.execute(query)
                    userHubMappingdata = cursor.fetchall()
                    if userHubMappingdata==():
                        query2  = " insert into userHubMapping (userId,hubId,usertypeId)"
                        query2 = query2 +" values('"+str(mainId)+"','"+str(i)+"','"+str('5')+"' );"
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        conn.commit()
                
                query = "select * from userMaster where  Usertype_Id=5 and Email='"+str(data1["Email"])+ "';"
                
                cursor.execute(query)
                data = cursor.fetchone()
                if data!=None:
                    print("data",data)
                    mainId=data["ID"]
                    Usertype_Id=data["Usertype_Id"]
                    HubId = data1["HubId"]
                    print(HubId)
                    for i in HubId:
                        query = "select * from userHubMapping where hubId='"+str(i)+"'   and userid= '"+str(mainId)+ "';"
                        cursor.execute(query)
                        userHubMappingdata = cursor.fetchall()
                        if userHubMappingdata==():
                            query2  = " insert into userHubMapping (userId,hubId,usertypeId)"
                            query2 = query2 +" values('"+str(mainId)+"','"+str(i)+"','"+str('5')+"' );"
                            conn=Connection()
                            cursor = conn.cursor()
                            cursor.execute(query2)
                            conn.commit()
                cursor.close()                

                output = {"result":"data inserted successfully","status":"true"}
                return output
            else:
                output = {"result":"password mismatched","status":"false"}
                return output
        else:
            output = {"result":"User Already Added Existed ","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output




# @app.route('/addHubadmin', methods=['POST'])
# def addHubadmin():
#     try:
#         json1=request.get_data() 
#         data1=json.loads(json1.decode("utf-8"))  
        
#         query = "select * from userMaster where  Usertype_Id=6 and Email='"+str(data1["Email"])+ "';"
#         conn=Connection()
#         cursor = conn.cursor()
#         cursor.execute(query)
#         data = cursor.fetchone()
#         print(data)
#         UserId=uuid.uuid1()
#         UserID=UserId.hex
#         if data==None:
#             if data1["password"]==data1["confirm_password"]:
#                 query2  = " insert into userMaster (name,mobile,Usertype_Id,UserID,password,Email,Gender)"
#                 query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str('6')+"','"+str(UserID)
#                 query2=query2+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
#                 print(query2)
                
#                 cursor.execute(query2)
#                 conn.commit()
#                 query = "select ID as userId,Usertype_Id from userMaster where name= '"+str(data1["name"])+ "' and  Email='"+str(data1["Email"])+ "';"
                
#                 cursor.execute(query)
#                 data=cursor.fetchall()
#                 yu=data[-1]
#                 mainId=yu["userId"]
#                 Usertype_Id=yu["Usertype_Id"]
#                 HubId = data1["HubId"]
#                 query = "select * from userHubMapping where hubId='"+str( data1["HubId"])+"'   and userid= '"+str(mainId)+ "';"
#                 cursor.execute(query)
#                 userHubMappingdata = cursor.fetchall()
#                 if userHubMappingdata==():
#                     query2  = " insert into userHubMapping (userId,hubId)"
#                     query2 = query2 +" values('"+str(mainId)+"','"+str(data1["HubId"])+"' );"
#                     conn=Connection()
#                     cursor = conn.cursor()
#                     cursor.execute(query2)
#                     conn.commit()
                
#                 query = "select * from userMaster where  Usertype_Id=6 and Email='"+str(data1["Email"])+ "';"
                
#                 cursor.execute(query)
#                 data = cursor.fetchone()
#                 if data!=None:
#                     print("data",data)
#                     mainId=data["ID"]
#                     Usertype_Id=data["Usertype_Id"]
#                     HubId = data1["HubId"]
#                     query = "select * from userHubMapping where hubId='"+str(i)+"'   and userid= '"+str(mainId)+ "';"
#                     cursor.execute(query)
#                     userHubMappingdata = cursor.fetchall()
#                     if userHubMappingdata==():
#                         query2  = " insert into userHubMapping (userId,hubId)"
#                         query2 = query2 +" values('"+str(mainId)+"','"+str(data1["HubId"])+"' );"
#                         conn=Connection()
#                         cursor = conn.cursor()
#                         cursor.execute(query2)
#                         conn.commit()
#                 cursor.close()                

#                 output = {"result":"data inserted successfully","status":"true"}
#                 return output
#             else:
#                 output = {"result":"password mismatched","status":"false"}
#                 return output
#         else:
#             output = {"result":"User Already Added Existed ","status":"true"}
#             return output 
#     except Exception as e :
#         print("Exception---->" + str(e))    
#         output = {"result":"something went wrong","status":"false"}
#         return output




@app.route('/updateDoctorMaster', methods=['POST'])
def updateDoctorMaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
      
        conn=Connection()
        cursor = conn.cursor()

        query1 = " update userMaster set   name ='" + str(data["name"]) + "', mobile='" + str(data["mobile"]) + "' , password='" + str(data["password"]) + "' , Email='" + str(data["Email"]) + "' , Gender='" + str(data["Gender"]) + "' , Status ='1'  where Usertype_Id=2 and  ID = '" + str(data["ID"])+ "';"
        print(query1)
        
        cursor.execute(query1)
        conn.commit()
        HospitalId = data["Hospital_Id"]
        query= "delete from userHospitalMapping where userId='" + str(data["ID"])+ "'  and Usertype_Id= 2 "
        cursor.execute(query)
        conn.commit()
        print(HospitalId)
        for i in HospitalId:
            query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
            query2 = query2 +" values('" + str(data["ID"])+ "','"+str('2')+"','"+str(i)+"');"
            print(query2)
            cursor.execute(query2)
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
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/updateHubadmin', methods=['POST'])
def updatehubadmin():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
      
        conn=Connection()
        cursor = conn.cursor()

        query1 = " update userMaster set   name ='" + str(data["name"]) + "', mobile='" + str(data["mobile"]) + "' , password='" + str(data["password"]) + "' , Email='" + str(data["Email"]) + "' , Gender='" + str(data["Gender"]) + "' , Status ='1'  where  Usertype_Id=6 and  ID = '" + str(data["ID"])+ "';"
        print(query1)
        
        cursor.execute(query1)
        conn.commit()
        HubId = data["HubId"]
        query= "delete from userHubMapping where userId='" + str(data["ID"])+ "'  and usertypeId= 6 "
        cursor.execute(query)
        conn.commit()
        
        for i in HubId:
            query2  = " insert into userHubMapping (userId,hubId,usertypeId)"
            query2 = query2 +" values('" + str(data["ID"])+"','"+str(i)+"','"+str('6')+"');"
            print(query2)
            cursor.execute(query2)
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
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/updateNurseMaster', methods=['POST'])
def updateNurseMaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       
        query1 = " update userMaster set   name ='" + str(data["name"]) + "', mobile='" + str(data["mobile"]) + "' , password='" + str(data["password"]) + "' , Email='" + str(data["Email"]) + "' , Gender='" + str(data["Gender"]) + "' , Status ='1'  where Usertype_Id=3 and  ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        HospitalId = data["Hospital_Id"]
        query= "delete from userHospitalMapping where userId='" + str(data["ID"])+ "'  and Usertype_Id= 3 "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        print(HospitalId)
        for i in HospitalId:
            
            query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
            query2 = query2 +" values('" + str(data["ID"])+ "','"+str('3')+"','"+str(i)+"');"
            print(query2)
            cursor.execute(query2)
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
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/updateOperator', methods=['POST'])
def updateOperator():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       
        query1 = " update userMaster set   name ='" + str(data["name"]) + "', mobile='" + str(data["mobile"]) + "' , password='" + str(data["password"]) + "' , Email='" + str(data["Email"]) + "' , Gender='" + str(data["Gender"]) + "' , Status ='1'  where Usertype_Id=4 and  ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        HospitalId = data["Hospital_Id"]
        query= "delete from userHospitalMapping where userId='" + str(data["ID"])+ "'  and Usertype_Id= 4 "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        print(HospitalId)
        for i in HospitalId:
            
            query2  = " insert into userHospitalMapping (userId,Usertype_Id,hospitalId)"
            query2 = query2 +" values('" + str(data["ID"])+ "','"+str('4')+"','"+str(i)+"');"
            print(query2)
            cursor.execute(query2)
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
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/deleteDoctorHospital', methods=['POST'])
def deleteDoctorHospital():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       
        query1 = " Delete from userHospitalMapping where    Usertype_Id=2 and  userId = '" + str(data["ID"])+ "' and hospitalId='" + str(data["Hospital_Id"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/deleteHubadminhub', methods=['POST'])
def deleteHubadminhub():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       
        query1 = " Delete from userHubMapping where    usertypeId=6 and  userId = '" + str(data["ID"])+ "' and hubId='" + str(data["HubId"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()

        query= "Delete from userMaster where Usertype_Id=6 and ID='" + str(data["ID"])+ "'"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/deleteNurseHospital', methods=['POST'])
def deleteNurseHospital():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       

        query1 = " Delete from userHospitalMapping where    Usertype_Id=3  and  userId = '" + str(data["ID"])+ "' and hospitalId='" + str(data["Hospital_Id"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        query= "Delete from userMaster where Usertype_Id=3 and ID='" + str(data["ID"])+ "'"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/deleteoperationHospital', methods=['POST'])
def deleteoperationHospital():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       

        query1 = " Delete from userHospitalMapping where    Usertype_Id=4  and  userId = '" + str(data["ID"])+ "' and hospitalId='" + str(data["Hospital_Id"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        query= "Delete from userMaster where Usertype_Id=4 and ID='" + str(data["ID"])+ "'"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output
@app.route('/deleteHospital', methods=['POST'])
def deleteHospital():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 

        query1 = " Delete from Hospital_master where ID = '" + str(data["ID"])+ "'  and HubId='" + str(data["HubId"])+ "' ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/deleteHub', methods=['POST'])
def deleteHub():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 

        query1 = " Delete from HubMaster where ID = '" + str(data["ID"])+ "' ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


app.route('/patientDoctorUpdate', methods=['POST'])
def patientDoctorUpdate():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        
        
        query1 = " update patientDoctorMapping   set status='1' and  doctorId  = '" + str(data["DoctorID"])+ "'  where Patient_Id = '" + str(data["PatientId"])+ "'   ;"
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
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/operationDashboard', methods=['post'])
def operationDashboard():
    try:
        
        json1=request.get_data()
        Data=json.loads(json1.decode("utf-8"))

        query3 ="select  PM.PatientId as ID,PM.PatientName,PM.PhoneNo,PM.heartRate,PM.spo2,PM.highPressure,PM.lowPressure,PM.pulseRate,PM.temperature,Hbs.HubName,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name as hospital_Name, "
        query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber"
        query3= query3 + " from Patient_master  as PM ,Hospital_master as Hm,HubMaster as Hbs  where PM.hospitalId=Hm.ID  and  Hm.ID='"+str(Data["hospital_Id"])+"' and  Hm.HubId=Hbs.ID   and PM.Status<>'2' order by ID desc Limit    " + str(Data["startlimit"]) + ", " + str(Data["endlimit"]) + " ;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query3)
        data= cursor.fetchall()

        for j in data:
            j["heartRate"]=json.loads(j["heartRate"].replace("'",'"'))
            j["highPressure"]=json.loads(j["highPressure"].replace("'",'"'))
            j["lowPressure"]=json.loads(j["lowPressure"].replace("'",'"'))
            j["pulseRate"]=json.loads(j["pulseRate"].replace("'",'"'))
            j["spo2"]=json.loads(j["spo2"].replace("'",'"'))
            j["temperature"]=json.loads(j["temperature"].replace("'",'"'))

        query ="select  PM.PatientId as ID,PM.PatientName,PM.PhoneNo,Hbs.HubName,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name as hospital_Name, "
        query=query+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber"
        query= query + " from Patient_master  as PM ,Hospital_master as Hm,HubMaster as Hbs  where PM.hospitalId=Hm.ID  and  Hm.ID='"+str(Data["hospital_Id"])+"' and  Hm.HubId=Hbs.ID   and PM.Status<>'2' order by ID desc ;"
        print(query)
        cursor.execute(query)
        data9= cursor.fetchall()
      
        cursor.close()
        
        if data:
            return {"result":data,"status":"true","total_patient":len(data9)}
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/Patient_masterTest', methods=['POST'])
def Patient_masterTest():
    try:
         
        json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        data=json.loads(json1.decode("utf-8"))
        print(data)    
        print("111111")
        print(type(data))
        spo2=str(data["spo2"]).replace("'",'"')
        pulseRate=str(data["pulseRate"]) .replace("'",'"')
        PatientName=data["PatientName"]
        heartRate=str(data["heartRate"]).replace("'",'"')
        print(heartRate)
        highPressure=str(data["highPressure"]).replace("'",'"')
        lowPressure=str(data["lowPressure"]).replace("'",'"')
        temperature=str(data["temperature"]).replace("'",'"')
        roomNumber=data["roomNumber"]
        gender=data["gender"]
        age=data["age"]
        BloogGroup=data["BloodGroup"]
        DeviceMac=data["DeviceMac"]
        Bed_Number=data["Bed_Number"]
        Usertype_Id=data["Usertype_Id"]
        hospitalId=data["hospitalId"]
        startdate=data["startdate"]
        usercreate=data["usercreate"]
        PhoneNo=data["PhoneNo"]
        
        if 'familyId' in data:
            FamilyId=data['familyId']
            if FamilyId=="":
                Family=int(FamilyId)











        query1="select PatientId from Patient_master Where PhoneNo='"+str(PhoneNo)+"'  " 
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data1=cursor.fetchone()
        if data1 != None:
            query2  = " insert into Patient_master(PatientName,heartRate,spo2,pulseRate,highPressure,lowPressure,temperature,roomNumber,Gender,age,BloodGroup,DeviceMac,Bed_Number,Usertype_Id,hospitalId,startdate,usercreate,PhoneNo)"
            
            query2 =query2 +" values('"+str(PatientName)+"','"+str(heartRate)+"','"+str(spo2)+"','"+str(pulseRate)+"','"+str(highPressure)+"','"

            query2=query2+str(lowPressure)+"','"+str(temperature)+"','"+str(roomNumber)+"','"+str(gender)+"','"+str(age)+"','"+str(BloogGroup)+"','"

            query2=query2+str(DeviceMac)+"','"+str(Bed_Number)+"','"+str(Usertype_Id)+"','"+str(hospitalId)+"','"+str(startdate)+"','"+str(usercreate)+"','"+str(PhoneNo)+"');"
            
            



            
          
            
            
            print(query2)
            print("222222222222")
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()

            if 'allergiesId' in data:
                allergiesId=data['allergiesId']
                u=[]
                for i in allergiesId:
                    if i == "":
                        query2= " select id from allergiesMaster where allergies='"+str(i)+"' "
                        conn=Connection()
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        data8=cursor.fetchone()
                        if data8 == None:
                            query2= "insert into allergiesMaster(allergies) values('"+str(i)+"')"
                            conn=Connection()
                            cursor = conn.cursor()
                            cursor.execute(query2)
                            conn.commit()
                            Id = cursor.lastrowid
                            conn.commit()
                            cursor.close()
                            u.append(Id)








                    else:

                        y=[]
                        y.append(i)
                        for k in y:
                            for j in u:
                                if j not in y:
                                    y.append(j)



            

            
 



            query1= "insert into patientDetails(patientName,hospitalId,phoneNo,bloodGroup,deviceMac,bedNumber,usertypeId,startdate,enddate,Gender,age,roomNumber)"
            query1=query1+" values('"+str(PatientName)+"','"+str(hospitalId)+"','"+str(PhoneNo)+"','"+str(BloogGroup)+"','"+str(DeviceMac)+"','"+str(Bed_Number)+"','"+str(Usertype_Id)+"','"+str(startdate)+"','"+str(enddate)+"','"+str(Gender)+"','"+str(age)+"','"+str(roomNumber)+"');"
            
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query1)
            conn.commit()
            cursor.close()


            query = "select * from Patient_master  where  Status<>'2' and enddate is NULL " 
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            data9 = cursor.fetchall()

            query = "select PatientId  from Patient_master where Status<>'2'  and enddate is NULL;"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            
            data999=cursor.fetchall()

            final= data999[-1]
            P_Id=final["PatientId"]
            DoctorId = data["DoctorId"]
            for m in y:
                query2= "insert into patientAllergiesMapping(patientId,AllergiesId) values('"+str(P_Id)+"','"+str(m)+"'); "
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query2)


            for i in DoctorId:
                
                query = "select * from patientDoctorMapping where Patient_Id='"+str(P_Id)+"' and  doctorId ='"+str(i)+"';"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                userHospitalMappingdata = cursor.fetchall()
                if userHospitalMappingdata==():
                    query2  = " insert into patientDoctorMapping (Patient_Id,doctorId)"
                    query2 = query2 +" values('"+str(P_Id)+"','"+str(i)+"');"
                    conn=Connection()
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    conn.commit()
            
            nurseId = data["nurseId"]
            
            for i in nurseId :
                
                query = "select * from patientNurseMapping where  Patient_Id='"+str(P_Id)+"' and nurse_Id='"+str(i)+"';"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                userHospitalMappingdata = cursor.fetchall()
                
                if userHospitalMappingdata==():
                    query2  = " insert into patientNurseMapping (Patient_Id,nurse_Id)"
                    query2 = query2 +" values('"+str(P_Id)+"','"+str(i)+"');"
                    conn=Connection()
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    conn.commit()
            
            cursor.close()
            print("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq",data9[-1])
            print("zzzzzzzzzzzzzzzzzzzzzzzzzz",type(data9[-1]["spo2"]))

            data9[-1]["spo2"]=json.loads(data9[-1]["spo2"])
            print(data9[-1]["spo2"])
            print(type(data9[-1]["spo2"]))
            
            data9[-1]["pulseRate"]=json.loads(data9[-1]["pulseRate"])
            
            data9[-1]["heartRate"]=json.loads(data9[-1]["heartRate"])
            data9[-1]["highPressure"]=json.loads(data9[-1]["highPressure"])
            data9[-1]["lowPressure"]=json.loads(data9[-1]["lowPressure"])
            data9[-1]["temperature"]=json.loads(data9[-1]["temperature"])
            print("data9999999999999999999999",data9[-1])
            output={"output": "Patient Added succesfully","Patient Details":data9[-1],"status":"true"}
            print("++++++++++++++++++++++++")

        else:

            PatientId=data1['PatientId']

            query22="update  Patient_master set PatientName='"+str(PatientName)+"',heartRate='"+str(heartRate)+"',spo2='"+str(spo2)+"',pulseRate='"+str(pulseRate)+"'"

            query22=query22+",highPressure='"+str(highPressure)+"',lowPressure='"+str(lowPressure)+"',temperature='"+str(temperature)+"',roomNumber='"+str(roomNumber)+"' "
            query22=query22+",Gender='"+str(Gender)+"',age='"+str(age)+"',BloodGroup='"+str(BloogGroup)+"',DeviceMac='"+str(DeviceMac)+"',Bed_Number='"+str(Bed_Number)+"',Usertype_Id='"+str(Usertype_Id)+"',hospitalId='"+str(hospitalId)+"',startdate='"+str(startdate)+"' where PhoneNo='"+str(PhoneNo)+"'"
            
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query22)
            conn.commit()
            cursor.close()


            
            query1= "insert into patientDetails(PatientId,patientName,hospitalId,phoneNo,bloodGroup,deviceMac,bedNumber,usertypeId,startdate,Gender,age,roomNumber)"

            query1=query1+" values('"+str(patientId)+"','"+str(PatientName)+"','"+str(hospitalId)+"','"+str(BloogGroup)+"','"+str(DeviceMac)+"','"+str(Bed_Number)+"','"+str(Usertype_Id)+"','"+str(startdate)+"','"+str(Gender)+"','"+str(age)+"','"+str(roomNumber)+"');"

            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query1)
            conn.commit()
            cursor.close()




            query = "select * from patientDetails  where  Status<>'2' and enddate is NULL and PhoneNo='"+str(PhoneNo)+"'" 
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            data8 = cursor.fetchall()
            print(data8,"====================================")

            query = "select spo2,heartRate,lowPressure,highPressure,temperature,pulseRate from Patient_master  where  Status<>'2' AND  PhoneNo='"+str(PhoneNo)+"' " 
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            data9 = cursor.fetchall()
            print(data9,"=========================================================================")

            query = "select PatientId  from patientDetails where Status<>'2'  and enddate is NULL;"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            
            data999=cursor.fetchall()

            final= data999[-1]
            P_Id=final["PatientId"]
            DoctorId = data["DoctorId"]

            for i in DoctorId:
                
                query = "select * from patientDoctorMapping where Patient_Id='"+str(P_Id)+"' and  doctorId ='"+str(i)+"';"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                userHospitalMappingdata = cursor.fetchall()
                if userHospitalMappingdata==():
                    query2  = " insert into patientDoctorMapping (Patient_Id,doctorId)"
                    query2 = query2 +" values('"+str(P_Id)+"','"+str(i)+"');"
                    conn=Connection()
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    conn.commit()
            
            nurseId = data["nurseId"]
            
            for i in nurseId :
                
                query = "select * from patientNurseMapping where  Patient_Id='"+str(P_Id)+"' and nurse_Id='"+str(i)+"';"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                userHospitalMappingdata = cursor.fetchall()
                
                if userHospitalMappingdata==():
                    query2  = " insert into patientNurseMapping (Patient_Id,nurse_Id)"
                    query2 = query2 +" values('"+str(P_Id)+"','"+str(i)+"');"
                    conn=Connection()
                    cursor = conn.cursor()
                    cursor.execute(query2)
                    conn.commit()
            
            cursor.close()
            print("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq",data9[-1])
            print("zzzzzzzzzzzzzzzzzzzzzzzzzz",type(data9[-1]["spo2"]))

            data9[-1]["spo2"]=json.loads(data9[-1]["spo2"])
            print(data9[-1]["spo2"])
            print(type(data9[-1]["spo2"]))
            
            data9[-1]["pulseRate"]=json.loads(data9[-1]["pulseRate"])
            
            data9[-1]["heartRate"]=json.loads(data9[-1]["heartRate"])
            data9[-1]["highPressure"]=json.loads(data9[-1]["highPressure"])
            data9[-1]["lowPressure"]=json.loads(data9[-1]["lowPressure"])
            data9[-1]["temperature"]=json.loads(data9[-1]["temperature"])
            data8[-1].update(data9[1])
            


            print("data9999999999999999999999",data9[-1])
            output={"output": "Patient Added succesfully","Patient Details":data8[-1],"status":"true"} 
        
       


        
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output          





@app.route('/Patient_master', methods=['POST'])
def Patient_master():
    try:
         
        json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        data=json.loads(json1.decode("utf-8"))
        print(data)    
        print("111111")
        print(type(data))
        spo2=str(data["spo2"]).replace("'",'"')
        pulseRate=str(data["pulseRate"]) .replace("'",'"')
        PatientName=data["PatientName"]
        heartRate=str(data["heartRate"]).replace("'",'"')
        print(heartRate)
        highPressure=str(data["highPressure"]).replace("'",'"')
        lowPressure=str(data["lowPressure"]).replace("'",'"')
        temperature=str(data["temperature"]).replace("'",'"')
        roomNumber=data["roomNumber"]
        gender=data["gender"]
        age=data["age"]
        BloogGroup=data["BloodGroup"]
        DeviceMac=data["DeviceMac"]
        Bed_Number=data["Bed_Number"]
        Usertype_Id=data["Usertype_Id"]
        hospitalId=data["hospitalId"]
        startdate=data["startdate"]
        usercreate=data["usercreate"]
        
        query2  = " insert into Patient_master(PatientName,heartRate,spo2,pulseRate,highPressure,lowPressure,temperature,roomNumber,Gender,age,BloodGroup,DeviceMac,Bed_Number,Usertype_Id,hospitalId,startdate,usercreate)"
        query2 =query2 +" values('"+str(PatientName)+"','"+str(heartRate)+"','"+str(spo2)+"','"+str(pulseRate)+"','"+str(highPressure)+"','"
        query2=query2+str(lowPressure)+"','"+str(temperature)+"','"+str(roomNumber)+"','"+str(gender)+"','"+str(age)+"','"+str(BloogGroup)+"','"
        query2=query2+str(DeviceMac)+"','"+str(Bed_Number)+"','"+str(Usertype_Id)+"','"+str(hospitalId)+"','"+str(startdate)+"','"+str(usercreate)+"');"
        
        print(query2)
        print("222222222222")
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        conn.commit()
        cursor.close()
        query = "select * from Patient_master  where  Status<>'2' and enddate is NULL " 
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data9 = cursor.fetchall()
        query = "select PatientId  from Patient_master where Status<>'2'  and enddate is NULL;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        
        data999=cursor.fetchall()

        final= data999[-1]
        P_Id=final["PatientId"]
        DoctorId = data["DoctorId"]

        for i in DoctorId:
            
            query = "select * from patientDoctorMapping where Patient_Id='"+str(P_Id)+"' and  doctorId ='"+str(i)+"';"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            userHospitalMappingdata = cursor.fetchall()
            if userHospitalMappingdata==():
                query2  = " insert into patientDoctorMapping (Patient_Id,doctorId)"
                query2 = query2 +" values('"+str(P_Id)+"','"+str(i)+"');"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query2)
                conn.commit()
        
        nurseId = data["nurseId"]
        
        for i in nurseId :
            
            query = "select * from patientNurseMapping where  Patient_Id='"+str(P_Id)+"' and nurse_Id='"+str(i)+"';"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query)
            userHospitalMappingdata = cursor.fetchall()
            
            if userHospitalMappingdata==():
                query2  = " insert into patientNurseMapping (Patient_Id,nurse_Id)"
                query2 = query2 +" values('"+str(P_Id)+"','"+str(i)+"');"
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query2)
                conn.commit()
        
        cursor.close()
        print("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq",data9[-1])
        print("zzzzzzzzzzzzzzzzzzzzzzzzzz",type(data9[-1]["spo2"]))

        data9[-1]["spo2"]=json.loads(data9[-1]["spo2"])
        print(data9[-1]["spo2"])
        print(type(data9[-1]["spo2"]))
        
        data9[-1]["pulseRate"]=json.loads(data9[-1]["pulseRate"])
        
        data9[-1]["heartRate"]=json.loads(data9[-1]["heartRate"])
        data9[-1]["highPressure"]=json.loads(data9[-1]["highPressure"])
        data9[-1]["lowPressure"]=json.loads(data9[-1]["lowPressure"])
        data9[-1]["temperature"]=json.loads(data9[-1]["temperature"])
        print("data9999999999999999999999",data9[-1])
        output={"output": "Patient Added succesfully","Patient Details":data9[-1],"status":"true"}
        
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output

@app.route('/Patient_master_select', methods=['GET'])
def Patient_master_select():
    try:
        PatientName,DeviceMac,PatientId,y,y2,y3= "","","","","",""
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
        if 'DeviceMac' in request.args:
            DeviceMac=request.args["DeviceMac"]
        if 'PatientName' in request.args:
            PatientName=request.args["PatientName"]
        if 'ID' in request.args:
            ID=request.args["ID"]
       
        WhereCondition=""
        
        if ID !="":
            
            WhereCondition1 =  " and  DoctorId    = '" + ID + "'  "
        
        if PatientId != "":
            WhereCondition1 =  " and  PatientId    = '" + PatientId + "'  "
            # y = y +  WhereCondition1
        
        if DeviceMac != "":
            WhereCondition1 =  " and DeviceMac   = '" + DeviceMac + "'  "
            # y = y +  WhereCondition1
        
        if  PatientName != "":
            WhereCondition1 =  "  and  PatientName   = '" + PatientName + "'  "
            # y = y +  WhereCondition1

       
        query = "select * from Patient_master  where enddate is NULL " +WhereCondition1  # y 
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



@app.route('/updatePatientmaster', methods=['POST'])
def update_Patient_type():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        spo2=str(data["spo2"]).replace("'",'"')
        print(spo2)
        pulseRate=str(data["pulseRate"]).replace("'",'"')
        print(pulseRate)
       
        heartRate=str(data["heartRate"]).replace("'",'"')
        print(heartRate)
        highPressure=str(data["highPressure"]).replace("'",'"')
        lowPressure=str(data["lowPressure"]).replace("'",'"')
        temperature=str(data["temperature"]).replace("'",'"')
       
       
        

       

        query1 = " update Patient_master set  spo2='" + str(spo2) + "',heartRate='" + str(heartRate) + "',highPressure='" + str(highPressure) + "',lowPressure='" + str(lowPressure) + "',pulseRate='" + str(pulseRate) + "',temperature='" + str(temperature) + "'   where PatientId = '" + str(data["PatientId"])+ "'  ;"
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
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/Discharge', methods=['POST'])
def update_Patient_Discharge():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        ist = pytz.timezone('Asia/Kolkata')
        print("======5======" )
        ist_time = datetime.now(tz=ist)
        ist_f_time = ist_time.strftime("%Y-%m-%d %H:%M:%S")
        query1 = " update Patient_master set   Status ='2'  ,enddate='"+str(ist_f_time)+"'  where PatientId = '" + str(data["PatientId"])+ "' and Usertype_Id = '" + str(data["Usertype_Id"])+ "' and  DeviceMac = '" + str(data["DeviceMac"])+ "'  ;"
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
        output = {"result":"something went wrong","status":"false"}
        return output
 


@app.route('/Patient_Vital_master_select', methods=['GET'])
def Patient_Vital_master_select():
    try:
        PatientName,DeviceMac,PatientId,y,y2,y3= "","","","","",""
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

       



        
        query = "select  PVM.Patient_Id as PatientId,Pm.PatientName as PatientName,PVM.RESP,PVM.ECG,PVM.SPO2,PVM.NIBP,PVM.TEMP,Pm.DeviceMac AS DeviceMac,Pm.Gender as Gender,Pm.age AS Age,Pm.roomNumber as roomNumber from Patient_Vital_master as PVM INNER JOIN Patient_master as Pm ON Pm.PatientId= PVM.Patient_Id  " +y
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        # print("prashant",data)
       

        # for  data1 in data:
        #     data1["ECG"]=json.loads(data1["ECG"].replace("'",'"'))
        #     data1["NIBP"]=json.loads(data1["NIBP"].replace("'",'"'))
        #     data1["SPO2"]=json.loads(data1["SPO2"].replace("'",'"'))

           
        data[-1]["ECG"]=json.loads(data[-1]["ECG"].replace("'",'"'))
        data[-1]["NIBP"]=json.loads(data[-1]["NIBP"].replace("'",'"'))
        data[-1]["SPO2"]=json.loads(data[-1]["SPO2"].replace("'",'"'))
        
        if data:
            Data = {"result":data[-1],"status":"true"}
            return  Data
        else:
            output = {"result":"No Data Found","status":"false"}
            return output

    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

#not done
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
        output = {"result":"something went wrong","status":"false"}
        return output


#total hub total hospital total doctor total totalPatient
@app.route('/adminPannel', methods=['POST'])
def adminPannel():
    try:
       
        conn=Connection()
        cursor = conn.cursor()
        query1 = " select  count(*) as count from HubMaster;"
        print(query1)
        cursor.execute(query1)
        data1 = cursor.fetchall()
        
        
        query2 = " select  count(*) as count from Hospital_master;"
        print(query2)
        cursor.execute(query2)
        data2 = cursor.fetchall()
        
        

        query1="select um.ID as ID from userMaster as um,userHospitalMapping as uhm  where um.ID=uhm.userId and um.Usertype_Id=uhm.Usertype_Id and  um.Usertype_Id= '2' ;" 
        cursor.execute(query1)
        data17 =cursor.fetchall()
        print(data17)
        umq=[]
        for j in data17:
            umq.append(int(j['ID']))
           
            yu=[]
            for x in umq:
                if x not in yu:
                    yu.append(x)
                    totalDoctor=len(yu)
                    data3=[]
                    data3.append({"count":totalDoctor})
            
        
        query4= " select  count(*) as count from Patient_master where Status<>'2' ;"
        print(query4)
        cursor.execute(query4)
        data4 = cursor.fetchall()
        
        data5={"totalHub":data1,"totalHospital":data2,"totalDoctor":data3,"totalPatient":data4}
        cursor.close()
        output = {"result":data5,"status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/hubadminPannel', methods=['POST'])
def hubadminPannel():
    try:
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       
        

        query2 = " select  HubName from HubMaster where ID='" + str(data["HubId"]) + "';"
        print(query2)

        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        data27 = cursor.fetchone()

        
        
        query2 = " select  count(*) as count from Hospital_master where HubId='" + str(data["HubId"]) + "';"
        print(query2)
        cursor.execute(query2)
        data2 = cursor.fetchall()

        query="select Hospital_master.ID from Hospital_master inner join HubMaster on Hospital_master.HubId=HubMaster.ID where Hospital_master.HubId='"+str(data["HubId"])+"'  order by Hospital_master.ID DESC;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data99= cursor.fetchall()
        totalDoctor=0
        totalNurse=0
        totalpatients=0
        
        totalOperations=0
        
        umq=[]

        for i in data99:
            query1="select distinct(um.ID) as ID from userMaster as um,userHospitalMapping as uhm  where um.ID=uhm.userId and um.Usertype_Id=uhm.Usertype_Id and  uhm.Usertype_Id= '2'  aND uhm.hospitalId='"+str(i["ID"])+"' ;" 
            cursor.execute(query1)
            data17 =cursor.fetchall()
            for j in data17:
                umq.append(int(j['ID']))
                print(umq,"==========================================")
                yu=[]
                
                for x in umq:
                    if x not in yu:
                        yu.append(x)
                        totalDoctor=len(yu)
            
            

            query2="select count(*) as count from userHospitalMapping where  Usertype_Id=3 and  hospitalId='"+str(i["ID"])+"';" 
            
            cursor.execute(query2)
            print(query2)
            data171 =cursor.fetchall()
            totalNurse+=data171[0]["count"]

            query2="select count(*) as count from userHospitalMapping where  Usertype_Id=4 and  hospitalId='"+str(i["ID"])+"';" 
            
            cursor.execute(query2)
            print(query2)
            data172 =cursor.fetchall()
            totalOperations+=data172[0]["count"]

            query4= " select  count(*) as count from Patient_master where hospitalId='"+str(i["ID"])+"' and Status<>'2';"
            print(query4)
            cursor.execute(query4)
            data4 = cursor.fetchall()
            totalpatients+=data4[0]["count"]
            print(totalpatients)
            i["patient"]=totalpatients

        
        data5={"Hub":data27,"totalHospital":data2,"totalDoctor":totalDoctor,"totalPatient":totalpatients,"totalNurse":totalNurse,"totalOperation":totalOperations}
        cursor.close()
        output = {"result":data5,"status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

#Doctor Profile
@app.route('/doctorProfile', methods=['POST'])
def doctorProfile():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))
        conn=Connection()
        cursor = conn.cursor()
        
        query = "select um.ID as doctorId,um.mobile,um.name as doctorName,um.licenseNo,um.Email,um.Gender as gender from userMaster as um where um.Email='"+str(data["Email"])+"';"
        
        cursor.execute(query)
        data = cursor.fetchall()
        print(data)
        
        
        
        query1= "select count(*) as hospital from userHospitalMapping as uhm  where uhm.userId='"+str(data[0]["doctorId"])+"';"
        cursor.execute(query1)
        data1 = cursor.fetchall()
        
        query2= "select userId,hospitalId  from userHospitalMapping as uhm  where uhm.userId='"+str(data[0]["doctorId"])+"';"
        cursor.execute(query2)
        data2 = cursor.fetchall()
        print(data2)
        hub_count=0
        for i in data2:
            query3= "select count(*)as count  from HubMaster  where HubMaster.ID ='"+str(i["hospitalId"])+"';"
            cursor.execute(query3)
            data3 = cursor.fetchall()
            hub_count+=data3[0]["count"]
            
        
        query4= "select count(*) as count from patientDoctorMapping as pdm,Patient_master as pm  where pm.PatientId=pdm.Patient_Id and pm.Status<>'2' and pdm.doctorId='"+str(data[0]["doctorId"])+"';"
        cursor.execute(query4)
        data4 = cursor.fetchall()
        print(data4)
        
        cursor.close()
        output = {"result":data,"patient_count":data4[0]["count"],"hub_count":hub_count,"status":"true"}
        output["hospital_count"]=data1[0]["hospital"]
        return output  
    

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/editDoctorProfile', methods=['POST'])
def editDoctorProfile():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
       
        query1 = " update userMaster set  licenseNo='" + str(data["licenseNo"])+ "'  where Email = '" + str(data["Email"])+ "'   ;"
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
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/diagReportMaster', methods=['POST'])
def diagReportMaster():

    try:  
        inputdata = request.form.get('reportInfo')
        inputdata1 = request.form.get('patientId')     

        inputdata = json.loads(inputdata)   

        patientId = inputdata1

        if inputdata1 == None :
            data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
            return data
        else:
            for i in inputdata:
                
                reportName = i['reportName']
                testType = i['testType']
                hospitalId = i['hospitalId']
                doctorId = i['doctorId']
                hubId = i['hubId']
                userId = i['userId']

                query  = " insert into DIAG_ReportMaster (HubId,HospitalId,DoctorId,PatientId,UploadedBy,TestType,ReportName)"
                query = query +" values("+'"'+str(hubId)+'"'+','+'"'+str(hospitalId)+'"'+','+'"'+str(doctorId)+'"'+','+'"'+str(patientId)+'"'+','+'"'+str(userId)+'"'+','+'"'+str(testType)+'"'+','+'"'+str(reportName)+'"'+' '+");"
                print(query)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                Id = cursor.lastrowid
                conn.commit()
                cursor.close()


                if 'reportFile' in request.files:
                    file = request.files.get('reportFile')        
                    filename = file.filename or ''                 
                    filename = filename.replace("'","")

                    print(file)
                    print(filename) 

                    filepath = '/'+str(patientId)

                    ReportPath = '/DiagnosticReport'+str(filepath)+'/'+str(filename) 
                    FolderPath = getDiagReportPath(filepath)

                    isdir = os.path.isdir(FolderPath)  
                    print(isdir)

                    if isdir == False:
                        os.mkdir(FolderPath)
                        print("if",FolderPath,filename)
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath)
                        print(type(FolderPath))                   
                    else:
                        print("else",FolderPath,filename)                        
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath)
                        print(type(FolderPath))                     

                    file.save(FolderPath)

                    query="update DIAG_ReportMaster set ReportPath = '"+str(ReportPath)+"' where ReportId = '" + str(Id) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()
                    cursor.close()

                    data = {"status":"true","message":"","result":"Data Inserted Successfully"}
                    return data
                else:
                    data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
                    return data

    except Exception as e :
        print("Exception--->" + str(e))                                  
        data = {"status":"false","message":"Something went wrong please contact system admin"}
        return data

@app.route('/pacsReportMaster', methods=['POST'])
def pacsReportMaster():

    try:  
        inputdata = request.form.get('reportInfo')
        inputdata1 = request.form.get('patientId')     

        inputdata = json.loads(inputdata)   

        patientId = inputdata1

        if inputdata1 == None :
            data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
            return data
        else:
            for i in inputdata:
                
                reportName = i['reportName']
                testType = i['testType']
                hospitalId = i['hospitalId']
                doctorId = i['doctorId']
                hubId = i['hubId']
                userId = i['userId']

                query  = " insert into PACS_ReportMaster (HubId,HospitalId,DoctorId,PatientId,UploadedBy,TestType,ReportName)"
                query = query +" values("+'"'+str(hubId)+'"'+','+'"'+str(hospitalId)+'"'+','+'"'+str(doctorId)+'"'+','+'"'+str(patientId)+'"'+','+'"'+str(userId)+'"'+','+'"'+str(testType)+'"'+','+'"'+str(reportName)+'"'+' '+");"
                print(query)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                Id = cursor.lastrowid
                conn.commit()
                cursor.close()


                if 'reportFile' in request.files:
                    file = request.files.get('reportFile')        
                    filename = file.filename or ''                 
                    filename = filename.replace("'","")

                    print(file)
                    print(filename) 

                    filepath = '/'+str(patientId)

                    ReportPath = '/PacsReport'+str(filepath)+'/'+str(filename) 
                    FolderPath = getPacsReportPath(filepath)

                    isdir = os.path.isdir(FolderPath)  
                    print(isdir)

                    if isdir == False:
                        os.mkdir(FolderPath)
                        print("if",FolderPath,filename)
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath)
                        print(type(FolderPath))                   
                    else:
                        print("else",FolderPath,filename)                        
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath)
                        print(type(FolderPath))                     

                    file.save(FolderPath)

                    query="update PACS_ReportMaster set ReportPath = '"+str(ReportPath)+"' where ReportId = '" + str(Id) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()
                    cursor.close()

                    data = {"status":"true","message":"","result":"Data Inserted Successfully"}
                    return data
                else:
                    data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
                    return data

    except Exception as e :
        print("Exception--->" + str(e))                                  
        data = {"status":"false","message":"Something went wrong please contact system admin"}
        return data

@app.route('/dicomReportMaster', methods=['POST'])
def dicomReportMaster():

    try:  
        inputdata = request.form.get('reportInfo')
        inputdata1 = request.form.get('patientId')     

        inputdata = json.loads(inputdata)   

        patientId = inputdata1

        if inputdata1 == None :
            data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
            return data
        else:
            for i in inputdata:
                
                reportName = i['reportName']
                testType = i['testType']
                hospitalId = i['hospitalId']
                doctorId = i['doctorId']
                hubId = i['hubId']
                userId = i['userId']

                query  = " insert into DICOM_ReportMaster (HubId,HospitalId,DoctorId,PatientId,UploadedBy,TestType,ReportName)"
                query = query +" values("+'"'+str(hubId)+'"'+','+'"'+str(hospitalId)+'"'+','+'"'+str(doctorId)+'"'+','+'"'+str(patientId)+'"'+','+'"'+str(userId)+'"'+','+'"'+str(testType)+'"'+','+'"'+str(reportName)+'"'+' '+");"
                print(query)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                Id = cursor.lastrowid
                conn.commit()
                cursor.close()


                if 'reportFile' in request.files:
                    file = request.files.get('reportFile')        
                    filename = file.filename or ''                 
                    filename = filename.replace("'","")

                    print(file)
                    print(filename) 

                    filepath = '/'+str(patientId)

                    ReportPath = '/DicomReport'+str(filepath)+'/'+str(filename) 
                    FolderPath = getDicomReportPath(filepath)

                    isdir = os.path.isdir(FolderPath)  
                    print(isdir)

                    if isdir == False:
                        os.mkdir(FolderPath)
                        print("if",FolderPath,filename)
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath)
                        print(type(FolderPath))                   
                    else:
                        print("else",FolderPath,filename)                        
                        FolderPath = str(FolderPath)
                        print(FolderPath)
                        print(type(FolderPath))                     

                    file.save(FolderPath)

                    query="update DICOM_ReportMaster set ReportPath = '"+str(ReportPath)+"' where ReportId = '" + str(Id) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()
                    cursor.close()

                    data = {"status":"true","message":"","result":"Data Inserted Successfully"}
                    return data
                else:
                    data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
                    return data

    except Exception as e :
        print("Exception--->" + str(e))                                  
        data = {"status":"false","message":"Something went wrong please contact system admin"}
        return data

@app.route('/labReportMaster', methods=['POST'])
def labReportMaster():

    try:  
        inputdata = request.form.get('reportInfo')
        inputdata1 = request.form.get('patientId')     

        inputdata = json.loads(inputdata)   

        patientId = inputdata1

        if inputdata1 == None :
            data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
            return data
        else:
            for i in inputdata:
                
                reportName = i['reportName']
                testType = i['testType']
                hospitalId = i['hospitalId']
                doctorId = i['doctorId']
                hubId = i['hubId']
                userId = i['userId']

                query  = " insert into LAB_ReportMaster (HubId,HospitalId,DoctorId,PatientId,UploadedBy,TestType,ReportName)"
                query = query +" values("+'"'+str(hubId)+'"'+','+'"'+str(hospitalId)+'"'+','+'"'+str(doctorId)+'"'+','+'"'+str(patientId)+'"'+','+'"'+str(userId)+'"'+','+'"'+str(testType)+'"'+','+'"'+str(reportName)+'"'+' '+");"
                print(query)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query)
                Id = cursor.lastrowid
                conn.commit()
                cursor.close()


                if 'reportFile' in request.files:
                    file = request.files.get('reportFile')        
                    filename = file.filename or ''                 
                    filename = filename.replace("'","")

                    print(file)
                    print(filename)
                    
                    filepath = '/'+str(patientId)

                    FolderPath = getLabReportPath(filepath)

                    ReportPath = '/LabReport'+str(filepath)+'/'+str(filename) 

                    isdir = os.path.isdir(FolderPath)  
                    print(isdir)

                    if isdir == False:
                        os.mkdir(FolderPath)
                        print("if",FolderPath,filename)
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath,"+++++++++")
                        print(type(FolderPath))                   
                    else:
                        print("else",FolderPath,filename)                        
                        FolderPath = str(FolderPath)+'/'+str(filename)
                        print(FolderPath,"_________!!!!!!!!@22121")
                        print(type(FolderPath))                     

                    file.save(FolderPath)

                    query="update LAB_ReportMaster set ReportPath = '"+str(ReportPath)+"' where ReportId = '" + str(Id) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    conn.commit()
                    cursor.close()

                    data = {"status":"true","message":"","result":"Data Inserted Successfully"}
                    return data
                else:
                    data = {"status":"false","message":"Something went wrong please contact system admin","result":""}
                    return data

    except Exception as e :
        print("Exception--->" + str(e))                                  
        data = {"status":"false","message":"Something went wrong please contact system admin"}
        return data


@app.route('/getdiagReportMaster', methods=['GET'])
def getdiagReportMaster():
    try:
        HubId,HospitalId,DoctorId,PatientId="","","",""

        if 'HubId' in request.args:
            HubId=request.args["HubId"]
        if 'HospitalId' in request.args:
            HospitalId=request.args["HospitalId"]
        if 'DoctorId' in request.args:
            DoctorId=request.args["DoctorId"]
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
       
        WhereCondition=" where lrm.TestType = ttm.ID"
        
        if HubId !="" and HospitalId !="" and DoctorId !="" and PatientId !="":
            
            WhereCondition =  WhereCondition+" and HubId = '" + HubId + "'"
            WhereCondition =  WhereCondition+" and HospitalId = '" + HospitalId + "'"
            WhereCondition =  WhereCondition+" and DoctorId = '" + DoctorId + "'"                        
            WhereCondition =  WhereCondition+" and PatientId = '" + PatientId + "'"

        query = "select lrm.HubId,lrm.ReportId,lrm.HospitalId,lrm.PatientId,lrm.ReportPath,lrm.ReportName,ttm.TestType,date_format(lrm.DateCreate,'%Y-%m-%d %H:%i:%s')DateCreate from DIAG_ReportMaster lrm, TestTypeMaster ttm " +WhereCondition+ ";"        
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
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

@app.route('/getpacsReportMaster', methods=['GET'])
def getpacsReportMaster():
    try:
        HubId,HospitalId,DoctorId,PatientId="","","",""

        if 'HubId' in request.args:
            HubId=request.args["HubId"]
        if 'HospitalId' in request.args:
            HospitalId=request.args["HospitalId"]
        if 'DoctorId' in request.args:
            DoctorId=request.args["DoctorId"]
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
       
        WhereCondition=" where lrm.TestType = ttm.ID"
        
        if HubId !="" and HospitalId !="" and DoctorId !="" and PatientId !="":
            
            WhereCondition =  WhereCondition+" and HubId = '" + HubId + "'"
            WhereCondition =  WhereCondition+" and HospitalId = '" + HospitalId + "'"
            WhereCondition =  WhereCondition+" and DoctorId = '" + DoctorId + "'"                        
            WhereCondition =  WhereCondition+" and PatientId = '" + PatientId + "'"

        query = "select lrm.HubId,lrm.ReportId,lrm.HospitalId,lrm.PatientId,lrm.ReportPath,lrm.ReportName,ttm.TestType,date_format(lrm.DateCreate,'%Y-%m-%d %H:%i:%s')DateCreate from PACS_ReportMaster lrm, TestTypeMaster ttm " +WhereCondition+ ";"        
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
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



@app.route('/getdicomReportMaster', methods=['GET'])
def getdicomReportMaster():
    try:
        HubId,HospitalId,DoctorId,PatientId="","","",""

        if 'HubId' in request.args:
            HubId=request.args["HubId"]
        if 'HospitalId' in request.args:
            HospitalId=request.args["HospitalId"]
        if 'DoctorId' in request.args:
            DoctorId=request.args["DoctorId"]
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
       
        WhereCondition=" where lrm.TestType = ttm.ID"
        
        if HubId !="" and HospitalId !="" and DoctorId !="" and PatientId !="":
            
            WhereCondition =  WhereCondition+" and HubId = '" + HubId + "'"
            WhereCondition =  WhereCondition+" and HospitalId = '" + HospitalId + "'"
            WhereCondition =  WhereCondition+" and DoctorId = '" + DoctorId + "'"                        
            WhereCondition =  WhereCondition+" and PatientId = '" + PatientId + "'"

        query = "select lrm.HubId,lrm.ReportId,lrm.HospitalId,lrm.PatientId,lrm.ReportPath,lrm.ReportName,ttm.TestType,date_format(lrm.DateCreate,'%Y-%m-%d %H:%i:%s')DateCreate from DICOM_ReportMaster lrm, TestTypeMaster ttm " +WhereCondition+ ";"        
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
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

@app.route('/getlabReportMaster', methods=['GET'])
def getlabReportMaster():
    try:
        HubId,HospitalId,DoctorId,PatientId="","","",""

        if 'HubId' in request.args:
            HubId=request.args["HubId"]
        if 'HospitalId' in request.args:
            HospitalId=request.args["HospitalId"]
        if 'DoctorId' in request.args:
            DoctorId=request.args["DoctorId"]
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
       
        WhereCondition=" where lrm.TestType = ttm.ID"
        
        if HubId !="" and HospitalId !="" and DoctorId !="" and PatientId !="":
            
            WhereCondition =  WhereCondition+" and HubId = '" + HubId + "'"
            WhereCondition =  WhereCondition+" and HospitalId = '" + HospitalId + "'"
            WhereCondition =  WhereCondition+" and DoctorId = '" + DoctorId + "'"                        
            WhereCondition =  WhereCondition+" and PatientId = '" + PatientId + "'"

        query = "select lrm.HubId,lrm.ReportId,lrm.HospitalId,lrm.PatientId,lrm.ReportPath,lrm.ReportName,ttm.TestType,date_format(lrm.DateCreate,'%Y-%m-%d %H:%i:%s')DateCreate from LAB_ReportMaster lrm, TestTypeMaster ttm " +WhereCondition+ ";"        
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
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



@app.route('/MedicationIntegration', methods=['POST'])
def MedicationIntegration():

    try:  
        inputdata = request.get_data() 
          

        inputdata = json.loads(inputdata.decode("utf-8"))   

        patientId = inputdata['patientId']

        if inputdata == None :
            data = {"status":"false","message":"Somthing went wrong please contact system admin","result":""}
            return data
        else:
            for i in inputdata:
                
                Medicine = i['medicine']
                frequency = i['frequency']
                dosage=i['dosage']
                duration=i['duration']
                regime=i['regime']
                comment=i['comment']
                hospitalId = i['hospitalId']
                doctorId = i['doctorId']
                hubId = i['hubId']
                userId = i['userId']
                flag=i['flag']

                if 'flag' in inputdata:
                    flag=inputdata['flag']

                if flag == 'i':

                    query  = " insert into Medication_Integration (hubId,hospitalId,doctorId,patientId,medicine,frequency,dosage,duration,regime,comment)"
                    query = query +" values("+'"'+str(hubId)+'"'+','+'"'+str(hospitalId)+'"'+','+'"'+str(doctorId)+'"'+','+'"'+str(patientId)+'"'+','+'"'+str(Medicine)+'"'+','+'"'+str(frequency)+'"'+','+'"'+str(dosage)+'"'+','+'"'+str(duration)+'"'+','+'"'+str(regime)+'"'+','+'"'+str(comment)+'"'+' '+");"
                    print(query)
                    conn=Connection()
                    cursor = conn.cursor()
                    cursor.execute(query)

                    data = {"status":"true","message":"","result":"Data Inserted Successfully"}
                    return data

                
                if flag =='u':
                    if 'id' in inputdata:
                        Id=inputdata['id']
                    query2="update Medication_Integration set hubId='" + str(HubId)+ "',hospitalId='" + str(hospitalId)+ "',doctorId='" + str(doctorId)+ "',patientId='" + str(PatientId)+ "',medicine='" + str(Medicine)+ "',frequency='" + str(frequency)+ "',dosage='" + str(dosage)+ "',duration='" + str(duration)+ "',regime='" + str(regime)+ "',comment='" + str(regime)+ "'  Where Id= '" + str(Id)+ "'          "
                    print(query)
                    conn=Connection()
                    cursor = conn.cursor()
                    cursor.execute(query2)

                    data = {"status":"true","message":"","result":"Data Updated Successfully"}
                    return data

    except Exception as e :
        print("Exception--->" + str(e))                                  
        data = {"status":"false","message":"Somthing went wrong please contact system admin"}
        return data



@app.route('/getMedicationIntegration', methods=['GET'])
def getMedicationIntegration():
    try:
        HubId,HospitalId,DoctorId,PatientId="","","",""

        if 'HubId' in request.args:
            HubId=request.args["HubId"]
        if 'HospitalId' in request.args:
            HospitalId=request.args["HospitalId"]
        if 'PatientId' in request.args:
            PatientId=int(request.args["PatientId"])
        if 'DoctorId' in request.args:
            DoctorId=request.args["DoctorId"]
        
       
        WhereCondition=""
        if HubId !="" and HospitalId !="" and DoctorId !="" and PatientId !="":

            WhereCondition =  " where HubId = '" + HubId + "'"
            WhereCondition =  WhereCondition+" and HospitalId = '" + HospitalId + "'"
            WhereCondition =  WhereCondition+" and DoctorId = '" + DoctorId + "'"                        
            WhereCondition =  WhereCondition+" and PatientId = '" + PatientId + "'"
      
            # y = y +  WhereCondition1
       

       
        query = "select  * from Medication_Integration where  " +WhereCondition  # y 
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

# add allergies

@app.route('/addAllergies', methods=['POST'])
def addAllergies():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from allergiesMaster where allergies ='"+str(data1["allergies"])+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchone()
        cursor.close()
        print(data)
       
        if data==None: 
        
            print("1111111")

            query2  = " insert into allergiesMaster(allergies)"
            query2 = query2 +" values('"+str(data1["allergies"])+"');"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output = {"result":"data inserted successfully","status":"true"}
            return output
        
        else:
            query23="delete from allergiesMaster Where allergies='"+str(data1["allergies"])+"'"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query23)

            query2  = " insert into allergiesMaster(allergies)"
            query2 = query2 +" values('"+str(data1["allergies"])+"');"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output = {"result":"data inserted successfully","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/getallAllergies', methods=['GET'])
def getallAllergies():
    try:
       

       
        query = "select  * from allergiesMaster  "  
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



@app.route('/addFamilyMaster', methods=['POST'])
def addFamilyMaster():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from FamilyMaster where  relation  ='"+str(data1["relation"])+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchone()
        cursor.close()
        print(data)
       
        if data==None: 
        
            print("1111111")

            query2  = " insert into FamilyMaster(relation)"
            query2 = query2 +" values('"+str(data1["relation"])+"');"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output = {"result":"data inserted successfully","status":"true"}
            return output
        
        else:
            query23="delete from FamilyMaster Where  relation='"+str(data1["relation"])+"'"
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query23)

            query2  = " insert into FamilyMaster(relation)"
            query2 = query2 +" values('"+str(data1["relation"])+"');"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            output = {"result":"data inserted successfully","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/getallFamilyMaster', methods=['GET'])
def getallFamilyMaster():
    try:
       

       
        query = "select  * from FamilyMaster  "  
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




@app.route('/getTestType', methods=['GET'])
def getTestType():

    try:  

        query  = " select ID,TestType from TestTypeMaster;"        
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        conn.commit()
        cursor.close()

        data = {"status":"true","message":"Successfully Got Data","result":result}
        return data

    except Exception as e :
        print("Exception--->" + str(e))                                  
        data = {"status":"false","message":"Something went wrong please contact system admin"}
        return data


# @app.route('/patientDoctorMapping', methods=['POST'])
# def patientDoctorMapping():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        # conn=Connection()
        # cursor = conn.cursor()
        # for i in range(1,31):
            # query = " insert into  patientNurseMapping(Patient_Id,nurse_Id) values('"+str(i)+"','"+str(4)+"');"
            # print(query)
            
            # cursor.execute(query)
            # data1 = cursor.fetchall()
            # conn.commit()
        # cursor.close()
        # output = {"result":data1,"status":"true"}
        # return output  
     

    # except Exception as e :
        # print("Exception---->" +str(e))    
        # output = {"result":"something went wrong","status":"false"}
        # return output
@app.route('/update', methods=['POST'])
def update():
    try:
       
        
        conn=Connection()
        cursor = conn.cursor()
        for i in range(1,90):
            query = " update Patient_master set Bed_Number='"+str(i)+ "'where PatientId='"+str(i)+"';"
            print(query)
            
            cursor.execute(query)
            
            conn.commit()
        cursor.close()
        
        return "ok"  
     

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output
###################################
#novastore
@app.route('/novastore', methods=['POST'])
def novastore():
    try:
         
        json1=request.get_data()
        
        # data=json.loads(json1.decode("utf-8")) 
        data=json.loads(json1.decode("utf-8"))
        print(data)
        Name=str(data["Name"])
        Occupation=str(data["Occupation"])
        MobileNo=data["MobileNo"]
        EmailId=str(data["EmailId"])
        
        BenefiteYouWant=str(data["BenefiteYouWant"])
        oftenPurchaseVegetables=str(data["oftenPurchaseVegetables"])
        PurchaseType=str(data["PurchaseType"])
        productsdelivered=data["productsdelivered"]
        timetopurchase=data["timetopurchase"]
        whatsupgroup=data["whatsupgroup"]
        gift=data["gift"]
      

        query2  = " insert into novaFeedback(Name,Occupation,MobileNo,EmailId,BenefiteYouWant,oftenPurchaseVegetables,PurchaseType,productsdelivered,timetopurchase,whatsupgroup,gift)"
        query2 =query2 +" values('"+str(Name)+"','"+str(Occupation)+"','"+str(MobileNo)+"','"+str(EmailId)+"','"+str(BenefiteYouWant)+"','"
        query2=query2+str(oftenPurchaseVegetables)+"','"+str(PurchaseType)+"','"+str(productsdelivered)+"','"+str(timetopurchase)+"','"+str(whatsupgroup)+"','"+str(gift)+"');"
        
        
        print(query2)
        print("222222222222")
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        conn.commit()
        cursor.close()
        return {"result":"Data inserted  successfully","status":"true"}
    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

######################################################START#################################################################################

@app.route('/getPatientDetail',methods=['POST'])
def getPatientDetail():
    try:
        json1=request.get_data()
        data=json.loads(json1.decode("utf-8"))
        print(data)
        query1=" select uhm.userId as UserID,hsm.ID as HospitalId,hm.ID as HubId from HubMaster hm,Hospital_master hsm,userMaster um,userHospitalMapping uhm" 
        query1=query1+" where hm.ID=hsm.HubId and hsm.ID=uhm.hospitalId and uhm.userId=um.ID and um.ID='"+str(data["ID"])+"';"
        conn = Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data1= cursor.fetchall()
        print(data1)
        conn.commit
        cursor.close()
        for i in data1:
            query2="select pdm.doctorId,pm.PatientId,pm.PhoneNo,pm.PatientName,pm.Gender,pm.roomNumber,pm.Bed_Number,pm.Address,pm.BloodGroup,pm.Email from Patient_master pm,patientDoctorMapping pdm where pdm.Patient_Id=pm.PatientId" 
            query2=query2+" and pm.hospitalId='"+str(i["HospitalId"])+"';"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            data2= cursor.fetchall()
            # print(data2)
            i["patient"]=data2
            conn.commit
            cursor.close()
            
        return {"result":data1,"status":"True"}

    except Exception as e :
        print("Exception---->" +str(e))
        output = {"result":"something went wrong","status":"false"}
        return output




####################################END#######################################################################################

 
if __name__ == "__main__":
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0',port=5053,debug=True)
    # socketio.run(app)
