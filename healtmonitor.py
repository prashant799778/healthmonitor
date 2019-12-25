from flask import Flask,request, abort
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


# @app.route('/login1', methods=['GET'])
# def login8888():
    # try:
        #userid = request.args['userid']
        # password = request.args['password']
        # name = request.args['name']
        
               
            
        # query ="select si.name as name,si.Usertype_Id as Usertype_Id,"
        # query=query+" si.Hospital_Id as Hospital_Id,us.Usertype as Usertype,si.UserID as UserID,si.ID as mainId,si.Email as Email  from signup as si INNER JOIN Usertype_master as us on us.ID=si.Usertype_Id"
        # query=query+" INNER JOIN Hospital_master AS hm on hm.ID=si.Hospital_Id  where name = '" + name + "' and password='" + password + "' ;"   
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query)
        # loginuser = cursor.fetchone()
       

       
        # y= loginuser["Usertype"]
        # y3= loginuser["Usertype_Id"]
        # y2= loginuser["Hospital_Id"]
        # Nurse = ""
        


        # if  y == 'Nurse':
            # query2 = "select  hm.hospital_name  as hospital_Name,hm.HubId as HubId,Dm.DoctorName as DoctorName,Dm.ID as DoctorID  from Hospital_master  as hm INNER JOIN DoctorMaster as Dm on Dm.HospitalId= hm.ID where  hm.ID ='" + str(y2) + "'"
            
            # cursor = conn.cursor()
            # cursor.execute(query2)
            # Nurse = cursor.fetchall()
            # for i in Nurse:
                # query3= "select ID as DoctorID from signup where name= '"+str(i["DoctorName"])+"';"
                # cursor = conn.cursor()
                # cursor.execute(query3)
                # data3= cursor.fetchall()
                # i["DoctorID"]=data3[0]["DoctorID"]
                
        # query2 = "select  * from Patient_master where Status<>'2'  and Usertype_Id ='" + str(y3) + "'"
      
        # cursor = conn.cursor()
        # cursor.execute(query2)
        # ii= cursor.fetchone()
        # cursor.close()
        # if ii != None:
            # Count= 1
        
        # else:
            # Count=0

        # if loginuser:   
            # data={"status":"true","result":loginuser,"Nurse Details":Nurse,"Patient Details":ii,"Count":Count}                      
            # return data
        # else:
            # data={"status":"false","result":"Login Failed"}
            # return data



        



    # except KeyError as e:
        # print("Exception---->" +str(e))        
        # output = {"result":"Input Keys are not Found","status":"false"}
        # return output 
    
    # except Exception as e :
        # print("Exception---->" +str(e))           
        # output = {"result":"something went wrong","status":"false"}
        # return output


@app.route('/login', methods=['GET'])
def login88881():
    try:
        # userid = request.args['userid']
        password = request.args['password']
        name = request.args['name']
        
               
       
        
               
            
        query ="select si.name as name,si.Usertype_Id as Usertype_Id,"
        query=query+" si.Hospital_Id as Hospital_Id,us.Usertype as Usertype,si.UserID as UserID,si.ID as mainId,si.Email as Email  from signup as si INNER JOIN Usertype_master as us on us.ID=si.Usertype_Id"
        query=query+" INNER JOIN Hospital_master AS hm on hm.ID=si.Hospital_Id  where name = '" + name + "' and password='" + password + "' ;"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        loginuser = cursor.fetchone()
       

       
        y= loginuser["Usertype"]
        y3= loginuser["Usertype_Id"]
        y2= loginuser["Hospital_Id"]
        
        Nurse=""


       


        if  y == 'Nurse':
            query2 = "select  hm.hospital_name  as hospital_Name,hm.HubId as HubId,Dm.DoctorName as DoctorName,Dm.ID as DoctorID  from Hospital_master  as hm INNER JOIN DoctorMaster as Dm on Dm.HospitalId= hm.ID where  hm.ID ='" + str(y2) + "'"
            
            cursor = conn.cursor()
            cursor.execute(query2)
            Nurse = cursor.fetchall()
            # for i in Nurse:
                # query3= "select ID as DoctorID from signup where name= '"+str(i["DoctorName"])+"';"
                # cursor = conn.cursor()
                # cursor.execute(query3)
                # data3= cursor.fetchall()
               
                # i["DoctorID"]=data3[0]["DoctorID"]


        DeviceMac,y9 = " ", ""




        if 'DeviceMac' in request.args:
            DeviceMac=request.args["DeviceMac"]

        if DeviceMac != "":
            

            query2="Select * from Patient_master where Status<>'2' and Usertype_Id ='" +str(y3) + "' and DeviceMac='"+str(DeviceMac)+ "';"
          

            print(query2)
            cursor = conn.cursor()
            cursor.execute(query2)
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

        if loginuser:   
            data={"status":"true","result":loginuser,"Nurse Details":Nurse,"Patient Details":PatientData,"Count":Count}                      
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


@app.route('/allHospital', methods=['post'])
def allHospital():
    try:
        
        query="select Hospital_master.ID,Hospital_master.hospital_name,Hospital_master.Address,HubMaster.HubName,HubMaster.ID as HubId  from Hospital_master inner join HubMaster on Hospital_master.HubId=HubMaster.ID;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        
        
        for i in data:
            query1="select count(*) as count from DoctorMaster where HospitalId='"+str(i["ID"])+"';" 
            
            cursor.execute(query1)
            data1 = cursor.fetchall()
            
            i["total_doctor"]=data1[0]["count"]
            query2="select ID  from DoctorMaster where HospitalId='"+str(i["ID"])+"';"
            cursor.execute(query2)
            data2 = cursor.fetchall()
            print(data2)
            count=0
            for j in data2:
                query1 = "select count(*) as count from Patient_master where DoctorID= '"+str(j["ID"])+"';"
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
        
        query= "select DM.ID,DM.DoctorName,HM.hospital_name,(HM.Address)hospital_address,HM.ID as Hospital_Id,HBS.ID as HubId,"
        query=query+"(select count(*) as count from Patient_master where DM.ID=Patient_master.DoctorID)patient,"
        query=query+"HBS.HubName from DoctorMaster DM,Hospital_master HM,HubMaster as HBS where  DM.HospitalId=HM.ID and HM.HubId=HBS.ID;"
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
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

@app.route('/allNurse', methods=['post'])
def allNurse():
    try:
        
        query= "select si.name as name,si.ID,si.Gender,si.mobile,si.password,si.Email,si.Usertype_Id,Hm.ID as Hospital_Id,Hm.HubId,Hm.hospital_name,HBS.HubName,"
        query=query+"(select count(*) as count from Patient_master where status<>'2' and si.ID=Patient_master.nurseId)patient"
        query=query+" from signup si,Hospital_master Hm,HubMaster as HBS where  si.Hospital_Id=Hm.ID and Hm.HubId=HBS.ID and si.Usertype_Id=3 ;"
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
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


#admin patients
@app.route('/allPatient', methods=['post'])
def allPatient():
    try:
        
        query="select PM.PatientId as ID,PM.PatientName,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,"
        query=query+"PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.hospital_Name,PM.age,PM.Gender,PM.roomNumber from Patient_master as PM;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
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
        
        query="select ID, HospitalId from DoctorMaster where Email='"+(data["Email"])+"';"
        
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        
        for i in data:
            print("11111111")
            query1="select count(*) as patient_count from Patient_master where Status=0 and  DoctorID='"+str(i["ID"])+"';"
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
        print(json1)
        data=json.loads(json1.decode("utf-8"))
        print(data)
        query="select ID, HospitalId from DoctorMaster where Email='"+(data["Email"])+"';"
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        print(data)
        total_patient=0
        for i in data:
            print("11111111")
            query1="select count(*) as patient_count from Patient_master where Status=0 and  DoctorID='"+str(i["ID"])+"';"
            cursor = conn.cursor()
            cursor.execute(query1)
            data1= cursor.fetchall()
            i["patient_count"]=data1[0]['patient_count']
            
            query3="select  *  from Patient_master where Status=0 and  DoctorID='"+str(i["ID"])+"';"
            cursor = conn.cursor()
            cursor.execute(query3)
            data3= cursor.fetchall()
            print(data3)
            i["patient_Details"]=data3
            
            
            
            query2="select hospital_name,HubId from Hospital_master where ID='"+str(i["HospitalId"])+"';"
            cursor = conn.cursor()
            cursor.execute(query2)
            data2= cursor.fetchall()
            print(data2)
            i["hospital_name"]=data2[0]['hospital_name']
            i["HubId"]=data2[0]['HubId']
            # query3="select hospital_name,HubId from Hospital_master where ID='"+str(i["HospitalId"])+"';"
            # cursor = conn.cursor()
            # cursor.execute(query3)
            # data3= cursor.fetchall()
            # i["hospital_name"]=data3[0]['hospital_name']
            total_patient+=int(i["patient_count"])
        for i in data:
            if i["patient_count"]==0:
                data.remove(i)
            
        cursor.close()
        if data:
            # data.append({"Total_hospital":len(data)})
            # data.append({"total_patient":total_patient})
            return {"result":data,"Total_hospital":len(data),"total_patient":total_patient,"status":"true"}
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
        query2 ="select ID as DoctorID,Email as Email from DoctorMaster where Email ='"+str(data["Email"])+"';"  
        print(query2)
        conn=Connection() 
        cursor = conn.cursor()
        cursor.execute(query2)
        data1 = cursor.fetchall()
        l1=[ ]
        for dat in data1:
            doctor_Id=dat["DoctorID"]
            l2=[]
            query3 ="select PM.PatientId as ID,PM.PatientName,PM.DoctorID as DoctorID,PM.PhoneNo,PM.Address,PM.BloodGroup,PM.DeviceMac,PM.Email,PM.Bed_Number,PM.Usertype_Id,PM.hospital_Name,PM.roomNumber,PM.age,PM.Gender from Patient_master as PM  where  Status<>'2' and DoctorID='" + str(doctor_Id) + "'  ORDER BY  ID DESC;;"   
            print(query3)
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
        query2 ="select Dm.ID as DoctorID ,Dm.Email as Email ,hm.HubId as HubId ,Hm.HubName as HubName,Dm.HospitalId as HospitalId from DoctorMaster as Dm INNER JOIN Hospital_master as hm on hm.ID=Dm.HospitalId  INNER JOIN HubMaster as Hm on Hm.ID= hm.HubId where HospitalId='"+str(data["HospitalId"])+"' and  Email ='"+str(data["Email"])+"';"  
        print(query2)
        conn=Connection() 
        cursor = conn.cursor()
        cursor.execute(query2)
        data1 = cursor.fetchall()
        print(data1)
        l1=[ ]

        uu= 'NULL'

        for dat in data1:
            doctor_Id=dat["DoctorID"]
            Hubname= dat["HubName"]
            Hub_Id=dat["HubId"]

            l2=[]
            
            query3 ="select * from Patient_master   where  Status=0 and DoctorID='" + str(doctor_Id) + "'  ORDER BY  PatientId DESC;"   
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

# @app.route('/signup', methods=['POST'])
# def signup():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8"))  
           
       

        # query1 = "select Usertype_Id,Hospital_Id,mobile from signup where name = "+'"'+str(data["name"])+'"'+" ;"
        # print(query1)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query1)
        # data= cursor.fetchone()
        # conn.commit()
        # cursor.close()
        # UserID=uuid.uuid1()
        # if data != None:
            # output={"output": "Name already registered ,Please enter the other Name","status":"false"}
        # else:
            # json1=request.get_data() 
            # data=json.loads(json1.decode("utf-8"))  
            # print("77787878")
            # query2  = " insert into signup (name,mobile,password,Usertype_Id,Hospital_Id,usercreate,UserID)"
            # query2 = query2 +" values("+'"'+str(data["name"])+'"'+','+'"'+str(data["mobile"])+'"'+','+'"'+str(data["password"])+'"'+','+'"'+str(data["Usertype_Id"])+'"'+','+'"'+str(data["Hospital_Id"])+'"'+','+'"'+str(data["usercreate"])+'"'+','+'"'+str(UserID)+'"'+");"
            # print(query2)
            # conn=Connection()
            # cursor = conn.cursor()
            # cursor.execute(query2)
            # conn.commit()
            # cursor.close()
            # output={"output": "User Signup succesfully","status":"true"}
        
    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
    # return output
   
# @app.route('/Signuplist', methods=['GET'])
# def Signuplist():
    # try:
    
        ##query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        # query = "select * from signup "
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query)
        # data = cursor.fetchall()
        # cursor.close()
        # if data:           
            # Data = {"result":data,"status":"true"}
            # return Data
        # else:
            # output = {"result":"No Data Found","status":"false"}
            # return output

    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
        # return output

@app.route('/doctorDropdown', methods=['POST'])
def doctorDropdown():
    try:
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))
        # query = " select distinct userid,username,usertype from usermaster where usertype <> 'Admin';"
        query = "select ID,DoctorName from DoctorMaster where HospitalId ='"+str(data["hospitalId"])+"';"
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



# @app.route('/update_Signup', methods=['POST'])
# def updateSignup():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        # print("yy")
        # query1 = " update signup  set  name= '" + str(data["name"]) + "',  password ='" + str(data["password"]) + "'  ,  mobile ='" + str(data["mobile"]) + "'  ,  Usertype_Id ='" + str(data["Usertype_Id"]) + "' ,  Hospital_Id ='" + str(data["Hospital_Id"]) + "' ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1' where ID = '" + str(data["ID"])+ "';"
        # print(query1)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query1)
        # conn.commit()
        # cursor.close()
        # output = {"result":"Updated Successfully","status":"true"}
        # return output  

    # except KeyError :
        # print("Key Exception---->")   
        # output = {"result":"key error","status":"false"}
        # return output  

    # except Exception as e :
        # print("Exception---->" +str(e))    
        # output = {"result":"somthing went wrong","status":"false"}
        # return output

# @app.route('/Usertype_master', methods=['POST'])
# def Usertype_master():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8"))  
        # query1 = "select ID,Usertype from Usertype_master where Usertype = "+'"'+str(data["Usertype"])+'"'+" ;"
        # print(query1)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query1)
        # data= cursor.fetchone()
        # conn.commit()
        # cursor.close()
        # if data != None:
            # output={"output": "Usertype already registered ,Please enter the other Usertype ","status":"false"}
        # else:
            # json1=request.get_data() 
            # data=json.loads(json1.decode("utf-8"))  
            # print("77787878")
            # query2  = " insert into Usertype_master (Usertype,usercreate)"
            # query2 = query2 +" values("+'"'+str(data["Usertype"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
            # print(query2)
            # conn=Connection()
            # cursor = conn.cursor()
            # cursor.execute(query2)
            # conn.commit()
            # cursor.close()
            # output={"output": "Usertype Added succesfully","status":"true"}
    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
    # return output
 
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
                query1 = "select count(*) as count from DoctorMaster where HospitalId= '"+str(j["ID"])+"';"
                cursor.execute(query1)
                data3 = cursor.fetchall()
                print(data3)
                count+=data3[0]["count"]
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
 
@app.route('/doctorMaster', methods=['POST'])
def doctorMaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
        query1 = "select ID,DoctorName from DoctorMaster where HospitalId = "+str(data["ID"])+" ;"
        
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data= cursor.fetchall()
        conn.commit()
        cursor.close()
        print(data)
        if data != None:
            return {"result":data,"status":"True"}
        
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
    return output


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




# @app.route('/getCurrentpatient', methods=['GET'])
# def getCurrentpatient():
    # try:
        # Usertype_Id = request.args['Usertype_Id']
        # query2 = "select  * from Patient_master where Status<>'2'  and Usertype_Id ='" +  Usertype_Id + "'"
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query2)

        # ii= cursor.fetchone()
        # cursor.close()
        # if ii != None:
            # Count= 1
        # else:
            # Count=0
        # if ii:           
            # Data =  {"result":ii,"Count":Count,"status":"True"}
            # return Data
        # else:
            # output = {"result":"No Data Found","status":"false"}
            # return output

    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
        # return output


# @app.route('/update_Usertype', methods=['POST'])
# def update_Usertype():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        # print("yy")
        # query1 = " update Usertype_master set  Usertype='" + str(data["Usertype"]) + "' ,  UserUpdate ='" + str(data["UserUpdate"]) + "' , Status ='1'  where ID = '" + str(data["ID"])+ "';"
        # print(query1)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query1)
        # conn.commit()
        # cursor.close()
        # output = {"result":"Updated Successfully","status":"true"}
        # return output  
    # except KeyError :
        # print("Key Exception---->")   
        # output = {"result":"key error","status":"false"}
        # return output  

    # except Exception as e :
        # print("Exception---->" +str(e))    
        # output = {"result":"somthing went wrong","status":"false"}
        # return output

#update hub

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




 
# @app.route('/Hospital_master1', methods=['POST'])
# def Hospital_master1():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8"))  
        # query2  = " insert into Hospital_master1 (hospital_name,City,Usermaster_Id,State,usercreate)"
        # query2 = query2 +" values("+'"'+str(data["hospital_name"])+'"'+','+'"'+str(data["City"])+'"'+','+'"'+str(data["Usermaster_Id"])+'"'+','+'"'+str(data["State"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
        # print(query2)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query2)
        # conn.commit()
        # output={"output": "Hospital Name Added succesfully","status":"true"}
    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
    # return output


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
        
        query = "select * from signup where Email='"+str(data1["Email"])+ "';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
        UserId=uuid.uuid1()
        UserID=UserId.hex
        if data==():
            if data1["password"]==data1["confirm_password"]:
                query2  = " insert into signup (name,mobile,Usertype_Id,UserID,Hospital_Id,password,Email,Gender)"
                query2 = query2 +" values('"+str(data1["name"])+"','"+str(data1["mobile"])+"','"+str(data1["Usertype_Id"])+"','"+str(UserID)
                query2=query2+"','"+str(data1["Hospital_Id"])+"','"+str(data1["password"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
                print(query2)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query2)
                conn.commit()
                output = {"result":"data inserted successfully","status":"true"}
                return output
            else:
                output = {"result":"password mismatched","status":"false"}
                return output
        else:
            output = {"result":"HubName already Exist","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output


# @app.route('/hospital_master_Select', methods=['GET'])
# def hospital_master_Select():
#     try:
    
        
#         DoctorName= request.args['DoctorName']
#         query = "select hm.hospital_name  as Hospital_Name,Dm.DoctorName as DoctorName from Hospital_master as hm INNER join DoctorMaster as Dm on Dm.HospitalId=hm.ID where DoctorName = '" + DoctorName + "'  "
#         conn=Connection()
#         cursor = conn.cursor()
#         cursor.execute(query)
#         data = cursor.fetchall()
#         cursor.close()
#         if data:           
#             Data = {"result":data,"status":"true"}
#             return Data
#         else:
#             output = {"result":"No Data Found","status":"false"}
#             return output

#     except Exception as e :
#         print("Exception---->" + str(e))    
#         output = {"result":"something went wrong","status":"false"}
#         return output



# @app.route('/Doctor_master_Select', methods=['GET'])
# def Doctor_master_Select():
#     try:
    
       
       
#         query = "select  DoctorName,Email from  DoctorMaster  "
#         conn=Connection()
#         cursor = conn.cursor()
#         cursor.execute(query)
#         data = cursor.fetchall()
#         cursor.close()
#         if data:           
#             Data = {"result":data,"status":"true"}
#             return Data
#         else:
#             output = {"result":"No Data Found","status":"false"}
#             return output

#     except Exception as e :
#         print("Exception---->" + str(e))    
#         output = {"result":"something went wrong","status":"false"}
#         return output





# @app.route('/addDoctor', methods=['POST'])
# def addDoctor():
#     try:
#         json1=request.get_data() 
#         data1=json.loads(json1.decode("utf-8"))  
        
#         query = "select * from DoctorMaster where Email='"+str(data1["Email"])+ "';"
#         conn=Connection()
#         cursor = conn.cursor()
#         cursor.execute(query)
#         data = cursor.fetchall()
#         cursor.close()
#         print(data)
#         if data==():           
#             query2  = " insert into DoctorMaster (HospitalId,DoctorName,Email,Gender)"
#             query2 = query2 +" values('"+str(data1["HospitalId"])+"','"+str(data1["DoctorName"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
#             print(query2)
#             conn=Connection()
#             cursor = conn.cursor()
#             cursor.execute(query2)
#             conn.commit()
#             output = {"result":"data inserted successfully","status":"true"}
#             return output
#         else:
#             output = {"result":"record already Exist","status":"true"}
#             return output 
#     except Exception as e :
#         print("Exception---->" + str(e))    
#         output = {"result":"something went wrong","status":"false"}
#         return output


@app.route('/addDoctor', methods=['POST'])
def addDoctor():
    try:
        
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from DoctorMaster where Email='"+str(data1["Email"])+ "' and HospitalId='"+str(data1["HospitalId"])+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)

        query = "select * from signup where Email='"+str(data1["Email"])+ "' and Hospital_Id= '"+str(data1["HospitalId"])+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data2 = cursor.fetchall()
        cursor.close()
        print(data2)
        
        if data==() and data2 ==():  
            print("1111111111111111111111111111")
            query2  = " insert into DoctorMaster (HospitalId,DoctorName,Email,Gender)"
            query2 = query2 +" values('"+str(data1["HospitalId"])+"','"+str(data1["DoctorName"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()

            UserId=uuid.uuid1()
            UserId=UserId.hex 
            if  "password" not in data1:
                print("2222222222222222222222222222")
                data1["password"]= '1234'

                query3  = " insert into  signup (Hospital_Id,name,Usertype_Id,Email,password,Gender,UserID)"
                query3 = query3 +" values('"+str(data1["HospitalId"])+"','"+str(data1["DoctorName"])+"','"+str('2')+"','"+str(data1["Email"])+"','"+str('123')+"','"+str(data1["Gender"])+"','"+str(UserId)+"');"
                print(query3)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query3)
                conn.commit()
                cursor.close()

            else:
                query3  = " insert into  signup (Hospital_Id,name,Usertype_Id,Email,password,Gender,UserID)"
                query3 = query3 +" values('"+str(data1["HospitalId"])+"','"+str(data1["DoctorName"])+"','"+str('2')+"','"+str(data1["Email"])+"','"+str(data1["password"])+"','"+str(data1["Gender"])+"','"+str(UserId)+"');"
                print(query3)
                conn=Connection()
                cursor = conn.cursor()
                cursor.execute(query3)
                conn.commit()
                cursor.close()
            
            output = {"result":"data inserted successfully","status":"true"}
            return output
            

        else:
            output = {"result":"record already Exist","status":"true"}
            return output 
    except Exception as e :
        print("Exception---->" + str(e))    
        output = {"result":"something went wrong","status":"false"}
        return output

#doctor master update
@app.route('/updateDoctormaster', methods=['POST'])
def updateDoctormaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        print("yy")
        query1 = " update Doctormaster set  HospitalId ='" + str(data["HospitalId"]) + "' , DoctorName='" + str(data["DoctorName"]) + "' , Email = '" + str(data["Email"]) + "'  ,  Gender ='" + str(data["Gender"]) + "' , Status ='1'  where ID = '" + str(data["ID"])+ "';"
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        conn.commit()
        cursor.close()
        if  "password" not in data:
            print("2222222222222222222222222222")
            query2 = " update signup set  Hospital_Id ='" + str(data["HospitalId"]) + "' , name ='" + str(data["DoctorName"]) + "' ,Usertype_Id ='2' ,Email = '" + str(data["Email"]) + "'  ,  Gender ='" + str(data["Gender"]) + "' ,password='123'  ,Status ='1'  where ID = '" + str(data["ID"])+ "';"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()
        else:
            query2 = " update signup set  Hospital_Id ='" + str(data["HospitalId"]) + "' , name ='" + str(data["DoctorName"]) + "' ,Usertype_Id ='2' ,Email = '" + str(data["Email"]) + "'  ,  Gender ='" + str(data["Gender"]) + "' ,password='" + str(data["password"]) + "'  ,Status ='1'  where ID = '" + str(data["ID"])+ "';"
            print(query2)
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

@app.route('/updateNursemaster', methods=['POST'])
def updateNursemaster():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        
        
        if  "password" not in data:
            print("2222222222222222222222222222")
            query2 = " update signup set  Hospital_Id ='" + str(data["Hospital_Id"]) + "' , name ='" + str(data["name"]) + "' ,Usertype_Id ='3' ,Email = '" + str(data["Email"]) + "'  ,  Gender ='" + str(data["Gender"]) + "' ,password='123'  ,Status ='1'  where ID = '" + str(data["ID"])+ "';"
            print(query2)
            conn=Connection()
            cursor = conn.cursor()
            cursor.execute(query2)
            conn.commit()
            cursor.close()
        else:
            query2 = " update signup set  Hospital_Id ='" + str(data["Hospital_Id"]) + "' , name ='" + str(data["name"]) + "' ,Usertype_Id ='3' ,Email = '" + str(data["Email"]) + "'  ,  Gender ='" + str(data["Gender"]) + "' ,password='" + str(data["password"]) + "'  ,Status ='1'  where ID = '" + str(data["ID"])+ "';"
            print(query2)
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

@app.route('/Patient_master', methods=['POST'])
def Patient_master():
    try:
         
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
        query2  = " insert into Patient_master(PatientName,DoctorID,roomNumber,Gender,age,BloodGroup,DeviceMac,Bed_Number,Usertype_Id,hospital_Name,startdate,usercreate)"
        query2 =query2 +" values("+'"'+str(data["PatientName"])+'"'+','+'"'+str(data["DoctorID"])+'"'+','+'"'+str(data["roomNumber"])+'"'+','+'"'+str(data["gender"])+'"'+','+'"'+str(data["age"])+'"'+','+'"'+str(data["BloodGroup"])+'"'+','+'"'+str(data["DeviceMac"])+'"'+','+'"'+str(data["Bed_Number"])+'"'+','+'"'+str(data["Usertype_Id"])+'"'+','+'"'+str(data["hospital_Name"])+'"'+','+'"'+str(data["startdate"])+'"'+','+'"'+str(data["usercreate"])+'"'+''+");"
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
        data = cursor.fetchall()
        cursor.close()
        output={"output": "Patient Added succesfully","Patient Details":data[-1],"status":"true"}
        
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

# @app.route('/Patient_master_select1', methods=['GET'])
# def Patient_master_select1():
    # try:
        # PatientName,DeviceMac,PatientId,y,y2,y3,hospital_Name= "","","","","","",""
        # if 'PatientId' in request.args:
            # PatientId=request.args["PatientId"]
        # if 'DeviceMac' in request.args:
            # DeviceMac=request.args["DeviceMac"]
        # if 'PatientName' in request.args:
            # PatientName=request.args["PatientName"]

        # if 'hospital_Name' in request.args:
            # hospital_Name = request.args["hospital_Name"]
      
      
        # WhereCondition=""
        
        # if PatientId != "":
            # WhereCondition1 =  " and  PatientId    = '" + PatientId + "'  "
            # y = y +  WhereCondition1
        
        # if DeviceMac != "":
            # WhereCondition1 =  " and DeviceMac   = '" + DeviceMac + "'  "
            # y = y +  WhereCondition1
        
        # if  PatientName != "":
            # WhereCondition1 =  "  and  PatientName   = '" + PatientName + "'  "
            # y = y +  WhereCondition1

        # if  hospital_Name != "":
            # WhereCondition1 =  "  and  hospital_Name   = '" + PatientName + "'  "
            # y = y +  WhereCondition1


       
        # query = "select PatientId,PatientName from Patient_master  where enddate is NULL " + y 
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query)
        # data = cursor.fetchall()
        # cursor.close()
        # print(data)
        # data1=[]
        # data2=[]
        # for i in data:
            # data1.append(i["PatientId"])
            # data2.append(i["PatientName"])
        # if data:           
            # Data = {"PatientId":data1,"status":"true","PatientName":data2}
            # return Data
        # else:
            # output = {"result":"No Data Found","status":"false"}
            # return output

    # except Exception as e :
        # print("Exception---->" + str(e))    
        # output = {"result":"something went wrong","status":"false"}
        # return output

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
        query1 = " update Patient_master set   Status ='2'  ,enddate='"+str(ist_f_time)+"'  where PatientId = '" + str(data["PatientId"])+ "' and Usertype_Id = '" + str(data["Usertype_Id"])+ "' and  DeviceMac = '" + str(data["DeviceMac"])+ "' and DoctorID='" + str(data["DoctorID"])+ "' ;"
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
 
# @sio.on('new message')
# def on_message(data):
    # print('I received a message!')

#io.connect("http://localhost:8000")


    # sio.connect('http://159.65.146.25:3015')

    # sio.emit("RealTimeData", json)
    # sio.send("hello")

# @sio.event
# def connect():
   # print('connection established')


    





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


#total hub total hospital total doctor total doctor
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
        
        query3 = " select  count(*) as count from DoctorMaster;"
        print(query3)
        cursor.execute(query3)
        data3 = cursor.fetchall()
        
        query3 = " select  count(*) as count from Patient_master;"
        print(query3)
        cursor.execute(query3)
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
        query = "select DM.ID as doctorId,DM.DoctorName as doctorNmae,DM.Gender as gender, HSM.ID as hospitalId,HSM.hospital_name As hospitalName,HM.ID as hubId,HM.HubName from"
        query=query+" Hospital_master HSM ,HubMaster HM,DoctorMaster DM where HSM.HubId=HM.ID and DM.HospitalId=HSM.ID " 
        query=query+" and DM.Email='"+str(data["Email"])+"';"
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data1 = cursor.fetchall()
        cursor.close()
        output = {"result":data1,"status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
        output = {"result":"key error","status":"false"}
        return output  

    except Exception as e :
        print("Exception---->" +str(e))    
        output = {"result":"somthing went wrong","status":"false"}
        return output



# @app.route('/userMaster', methods=['POST'])
# def userMaster():
    # try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        # query = "select * from userMaster where Hospital_Id in (1,2,3,4,5);"
        # print(query)
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query)
        # data1 = cursor.fetchall()
        # cursor.close()
        # output = {"result":data1,"status":"true"}
        # return output  
    # except KeyError :
        # print("Key Exception---->")   
        # output = {"result":"key error","status":"false"}
        # output = {"result":"key error","status":"false"}
        # return output  

    # except Exception as e :
        # print("Exception---->" +str(e))    
        # output = {"result":"somthing went wrong","status":"false"}
        # return output

@app.route('/userM', methods=['POST'])
def userM():
    try:
       
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        print("!1111111111")
        query1 = " select Hospital_Id from healthmonitor_staging.userMaster where Email='rakesh@gmail.com' ;"
        print("!22222222")
        print(query1)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query1)
        data2 = cursor.fetchall()
        cursor.close()
        
        query = " select um.ID,um.name,um.Email,um.Gender,hm.hospital_name from healthmonitor_staging.userMaster um,healthmonitor_staging.Hospital_master hm where hm.ID in("+data2['Hospital_Id'] +")+ and um.Email='rakesh@gmail.com';"
        print("!22222222")
        print(query)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data1 = cursor.fetchall()
        cursor.close()
        output = {"result":data1,"data2":data2,"status":"true"}
        return output  
    except KeyError :
        print("Key Exception---->")   
        output = {"result":"key error","status":"false"}
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
