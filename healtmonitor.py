from flask import Flask,request,abort
from flask_socketio import SocketIO,emit
import uuid
import json
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
socketio = SocketIO(app, cors_allowed_origins="*")
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



@app.route('/login', methods=['GET'])
def login88881():
    try:
        # userid = request.args['userid']
        password = request.args['password']
        name = request.args['name']
        
        print(name)       
          
        query ="select  um.Email,um.ID,um.name as name,us.Usertype as Usertype,um.Usertype_Id as Usertype_Id from userMaster  as um,Usertype_master as us  where um.Usertype_Id=us.ID and  name = '" + name + "' and password='" + password + "' ;"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        loginuser = cursor.fetchall()
        print("11111111111",loginuser)


        if loginuser==():
            data={"status":"false","result":"Login Failed"}
            return data

        else:
            for d in loginuser:
                y9=d["ID"]
                y=  d["Usertype"]
                y3= d["Usertype_Id"]
                Nurse=""

                if  d["Usertype"]== 'Nurse':
                    
                    
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

                
                if  d["Usertype"]== 'Doctor':
                    
                    Nurse=[]
                    query= "select hospitalId as Hospital_Id from userHospitalMapping where  Usertype_Id=2 and userId= '" + str(y9) + "' "
                    cursor = conn.cursor()
                    cursor.execute(query)
                    Nur = cursor.fetchall()
                    print(Nur)
                    for i in Nur:
                        query2 = " select hm.ID as Hospital_Id,hm.hospital_name,hm.HubId as HubId,Hbs.HubName as HubName,um.ID as DoctorID,um.name as DoctorName,um.Email as Email,um.Gender,um.mobile from userMaster as um ,userHospitalMapping  as mpum,HubMaster as Hbs,Hospital_master as hm  where  mpum.userId=um.ID and mpum.hospitalId=hm.ID and  hm.HubId=Hbs.ID  and  um.Usertype_Id=2 and  um.name='"+name +"'    and hm.ID = '" + str(i["Hospital_Id"]) + "';"
                        print(query2)
                        cursor = conn.cursor()
                        cursor.execute(query2)
                        Nurs = cursor.fetchone()
                        Nurse.append(Nurs)
            
            
            DeviceMac,y9 = " ", ""
            if 'DeviceMac' in request.args:
                DeviceMac=request.args["DeviceMac"]

            if DeviceMac != "":
                query ="select  PM.PatientId as PatientId,um.name as Doctorname,PM.PatientName,PM.PhoneNo,Hbs.HubName,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name as hospital_Name,PM.hospitalId as Hospital_Id, "
                query=query+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.doctorId as DoctorID"
                query= query+ " from userMaster as um,Patient_master  as PM ,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs  where pdm.doctorId=um.ID and  PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2'  and PM.Usertype_Id='" + str(y3) + "' and PM.DeviceMac='"+str(DeviceMac)+ "'  ORDER BY  PatientId DESC ;"
                print(query)
                cursor = conn.cursor()
                cursor.execute(query)
                PatientData= cursor.fetchone()
            else:
                query2 = " select   * from Patient_master where Status<>'2'  and Usertype_Id ='" + str(y3) + "';" 
                cursor = conn.cursor()
                cursor.execute(query2)
                PatientData= cursor.fetchone()

            cursor.close()
            
            if PatientData != None:
                
                Count= 1
            
            else:
                
                Count=0

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
        
        query="select Hospital_master.ID,Hospital_master.hospital_name,Hospital_master.Address,"
        query=query+"HubMaster.HubName,HubMaster.ID as HubId  from Hospital_master inner join HubMaster on Hospital_master.HubId=HubMaster.ID order by Hospital_master.ID DESC;"
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
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.mobile,um.password,um.name as DoctorName,um.Email,um.Gender,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where um.Usertype_Id=2 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID  ORDER BY  um.ID DESC;"
        print(query)
        
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            query1="select count(*) as count from patientDoctorMapping pdm,Patient_master pm where pm.Status<>'2'  and pm.PatientId=pdm.Patient_Id and  pm.hospitalId='"+ str(i["Hospital_Id"])+"'and doctorId='"+str(i["ID"])+"';"
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


@app.route('/allNurse', methods=['post'])
def allNurse():
    try:
        
        conn=Connection()
        cursor = conn.cursor()
        query= " select um.ID,um.name,um.mobile,um.password,um.Email,um.Gender,um.Usertype_Id,hsm.ID as Hospital_Id,hsm.hospital_name,hm.ID as HubId,hsm.Address as hospital_address,hm.HubName from userMaster um,HubMaster hm,Hospital_master hsm,"
        query=query+"userHospitalMapping uhm where um.Usertype_Id=3 and hm.ID=hsm.HubId and um.ID=uhm.userId and uhm.hospitalId=hsm.ID  order by um.ID desc;"
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



#admin patients
@app.route('/allPatient', methods=['post'])
def allPatient():
    try:
        query3 ="select  um.name as Doctorname,PM.PatientId as ID,PM.PatientName,PM.PhoneNo,Hbs.HubName,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name as hospital_Name , "
        query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.doctorId as DoctorID"
        query3= query3 + " from userMaster as um,Patient_master  as PM ,patientDoctorMapping as pdm,Hospital_master as Hm,HubMaster as Hbs  where  pdm.doctorId=um.ID and  PM.hospitalId=Hm.ID and Hm.HubId=Hbs.ID and  pdm.Patient_Id=PM.PatientId  and PM.Status<>'2'   ORDER BY  ID DESC;"
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
        query1=query1+" where hm.ID=hsm.HubId and hsm.ID=uhm.hospitalId and uhm.userId=um.ID and um.Email='"+str(data["Email"])+"';"
        cursor.execute(query1)
        data1= cursor.fetchall()
        print(data1)
        total_patient=0
        for i in data1:
            
            query2="select * from Patient_master pm,patientDoctorMapping pdm where pdm.Patient_Id=pm.PatientId " 
            query2=query2+" and pdm.doctorId='"+str(i["ID"]) +"' and pm.hospitalId='"+str(i["HospitalId"])+"';"
            cursor.execute(query2)
            data2= cursor.fetchall()
            print(data2)
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
            return {"result":data1,"Total_hospital":len(data1),"total_patient":total_patient,"status":"true"}
        else:
            return {"result":"No Record Found","status":"true"}
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output




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
            query3 ="select  PM.PatientId as ID,PM.PatientName,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name as hospital_Name , "
            query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.doctorId as DoctorID"
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
            
            query3 ="select  PM.PatientId as PatientId,PM.PatientName,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,Hm.HubId,Hm.hospital_name  as hospital_Name,"
            query3=query3+" PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.age,PM.Gender,PM.roomNumber,pdm.doctorId as DoctorID"
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
                query1 = "select count(*) as count from userHospitalMapping where  Usertype_Id=2 and  hospitalId='"+str(i["ID"])+"';"
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






@app.route('/updatehubmaster', methods=['POST'])
def updatehubmaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update HubMaster set   HubName ='" + str(data[" HubName "]) + "'  , Status ='1'  where ID = '" + str(data["ID"])+ "';"
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
        output = {"result":"somthing went wrong","status":"false"}
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



@app.route('/updateDoctorMaster', methods=['POST'])
def updateDoctorMaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
      


        query1 = " update userMaster set   name ='" + str(data["name"]) + "', mobile='" + str(data["mobile"]) + "' , password='" + str(data["password"]) + "' , Email='" + str(data["Email"]) + "' , Gender='" + str(data["Gender"]) + "' , Status ='1'  where Usertype_Id=2 and  ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        HospitalId = data["Hospital_Id"]
        for i in HospitalId:
            query2="update userHospitalMapping set hospitalId='"+str(i)+"' where Usertype_Id=2 and userId='" + str(data["ID"])+ "' "
            conn=Connection()
            cursor = conn.cursor()
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
        output = {"result":"somthing went wrong","status":"false"}
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
        for i in HospitalId:
            query2="update userHospitalMapping set hospitalId='"+str(i)+"' where Usertype_Id=3 and userId='" + str(data["ID"])+ "' "
            conn=Connection()
            cursor = conn.cursor()
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
        output = {"result":"somthing went wrong","status":"false"}
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
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
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
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output


@app.route('/deleteHospital', methods=['POST'])
def deleteHospital():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 

        query1 = " Delete from Hospital_master where ID = '" + str(data["ID"])+ "' ;"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        cursor.close()
        output = {"result":"Deleted Successfully","status":"true"}
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
        query2  = " insert into Patient_master(PatientName,roomNumber,Gender,age,BloodGroup,DeviceMac,Bed_Number,Usertype_Id,hospitalId,startdate,usercreate)"
        query2 =query2 +" values("+'"'+str(data["PatientName"])+'"'+','+'"'+str(data["roomNumber"])+'"'+','+'"'+str(data["gender"])+'"'+','+'"'+str(data["age"])+'"'+','+'"'+str(data["BloodGroup"])+'"'+','+'"'+str(data["DeviceMac"])+'"'+','+'"'+str(data["Bed_Number"])+'"'+','+'"'+str(data["Usertype_Id"])+'"'+','+'"'+str(data["hospitalId"])+'"'+','+'"'+str(data["startdate"])+'"'+','+'"'+str(data["usercreate"])+'"'+''+");"
        print(query2)
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
            
            query = "select * from patientDoctorMapping where Patient_Id='"+str(P_Id)+"' and  doctorId='"+str(i)+"';"
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



@app.route('/update_Patient_master', methods=['POST'])
def update_Patient_type():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        query2= "select * from Patient_master where Status<>'2'  and PatientId = '" + str(data["PatientId"])+ "' "
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        data=cursor.fetchall()
        print("prahhhhhhhhhhhhhhhhh",type(data))
        conn.commit()
        cursor.close()

        print("yy")
        query1 = " update Patient_master set  PatientName ='" + str(data["PatientName"]) + "' , DeviceMac ='" + str(data["DeviceMac"]) + "' , Bed_Number = '" + str(data["Bed_Number"]) + "', Usertype_Id = '" + str(data["Usertype_Id"]) + "' , hospital_Name ='" + str(data["hospital_Name"]) + "' , startdate='" + str(data["startdate"]) + "', enddate = '" + str(data["enddate"]) + "'  ,  UserUpdate ='" + str(data["UserUpdate"]) + "'  where PatientId = '" + str(data["PatientId"])+ "' and Status= '2' ;"
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
        output = {"result":"somthing went wrong","status":"false"}
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

       



        
        query = "select  PVM.Patient_Id as PatientId,Pm.PatientName as PatientName,PVM.RESP,PVM.ECG,PVM.SPO2,PVM.NIBP,PVM.TEMP,Pm.DeviceMac AS DeviceMac,Pm.hospital_Name,Pm.Gender as Gender,Pm.age AS Age,Pm.roomNumber as roomNumber from Patient_Vital_master as PVM INNER JOIN Patient_master as Pm ON Pm.PatientId= PVM.Patient_Id  " +y
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
        output = {"result":"somthing went wrong","status":"false"}
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
        
        query3 = " select  count(*) as count from userMaster where Usertype_Id=2;"
        print(query3)
        cursor.execute(query3)
        data3 = cursor.fetchall()
        
        query4= " select  count(*) as count from Patient_master;"
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
        output = {"result":"somthing went wrong","status":"false"}
        return output

#Doctor Profile
@app.route('/doctorProfile', methods=['POST'])
def doctorProfile():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))
        conn=Connection()
        cursor = conn.cursor()
        
        query = "select um.ID as doctorId,um.mobile,um.name as doctorName,um.Email,um.Gender as gender from userMaster as um where um.Email='"+str(data["Email"])+"';"
        
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
        output = {"result":"somthing went wrong","status":"false"}
        return output



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
        # output = {"result":"somthing went wrong","status":"false"}
        # return output
 
if __name__ == "__main__":
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0',port=5053,debug=True)
    socketio.run(app)
