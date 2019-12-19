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

@app.route('/Login', methods=['GET'])
def login():
    try:
        # userid = request.args['userid']
        password = request.args['password']
        name = request.args['name']
        
               
        #query="select userid,usertype from usermaster where userid = '" + userid + "' and password='" + password + "';"      
        query ="select si.mobile as mobile,si.name as name,si.password as password,si.Usertype_Id as Usertype_Id,"
        query=query+" si.Hospital_Id as Hospital_Id,us.Usertype,hm.hospital_name from signup as si INNER JOIN Usertype_master as us on us.ID=si.Usertype_Id"
        query=query+" INNER JOIN Hospital_master AS hm on hm.ID=si.Hospital_Id  where name = '" + name + "' and password='" + password + "';"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        loginuser = cursor.fetchone()
        print(loginuser["Usertype_Id"])
        y= loginuser["Usertype_Id"]
        cursor.close()
        query2 = "select  * from Patient_master where Status<>'2'  and Usertype_Id ='" + str(y) + "'"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        ii= cursor.fetchone()
        cursor.close()
        if ii != None:
            Count= 1
        else:
            Count=0

        if loginuser:   
            data={"status":"true","result":loginuser,"Patient Details":ii,"Count":Count}                      
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


# @app.route('/login2', methods=['post'])
# def login2():
    # try:
        # json1=request.get_data() 
        # data=json.loads(json1.decode("utf-8")) 
        # query="select count(1) as count from signup where Email='"+data["Email"]+"';"
        # conn=Connection()
        # cursor = conn.cursor()
        # cursor.execute(query)
        # data= cursor.fetchone()
        # cursor.close()
        # if data["count"]==1:
            
               
        
    
    # except Exception as e :
        # print("Exception---->" +str(e))           
        # output = {"result":"something went wrong","status":"false"}
        # return output
@app.route('/allHospital', methods=['post'])
def allHospital():
    try:
        
        query="select Hospital_master.ID,Hospital_master.hospital_name,Hospital_master.Address,HubMaster.HubName from Hospital_master inner join HubMaster on Hospital_master.HubId=HubMaster.ID;"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchall()
        
        #return {"data":data}
        for i in data:
            query1="select count(*) as count from DoctorMaster where HospitalId='"+str(i["ID"])+"';" 
            
            cursor.execute(query1)
            data1 = cursor.fetchall()
            
            i["total_doctor"]=data1[0]["count"]
            query2="select ID  from DoctorMaster "
            cursor.execute(query2)
            data2 = cursor.fetchall()
            print(data2)
            # for j in data2:
                # query1 = "select count(*) as count from DoctorMaster where HospitalId= '"+str(j["ID"])+"';"
                # cursor.execute(query1)
                # data3 = cursor.fetchall()
                # print(data3)
                # count+=data3[0]["count"]
            # i["total_doctor"]=count
        
        cursor.close()
        return {"data":data}
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output


@app.route('/allDoctor', methods=['post'])
def allDoctor():
    try:
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        query="select count(1) as count from signup where Email='"+data["Email"]+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchone()
        cursor.close()
        return "ok"
            
               
        
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output

@app.route('/allPatient', methods=['post'])
def allPatient():
    try:
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8")) 
        query="select count(1) as count from signup where Email='"+data["Email"]+"';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data= cursor.fetchone()
        cursor.close()
        return "ok"
            
               
        
    
    except Exception as e :
        print("Exception---->" +str(e))           
        output = {"result":"something went wrong","status":"false"}
        return output



@app.route('/Login1', methods=['GET'])
def login1():
    try:
       
       
        name = request.args['name']
        password= request.args['password']
        
               
        #query="select userid,usertype from usermaster where userid = '" + userid + "' and password='" + password + "';"      
        query ="select si.name as name,si.password as password ,hm.hospital_name  as hospital_Name from signup as si INNER JOIN Usertype_master as us on us.ID=si.Usertype_Id  INNER JOIN Hospital_master1 AS hm on hm.Usermaster_Id=si.ID  where name = '" + name + "' and password='" + password + "';"   
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        data1=[]
        for i in data:
            data1.append(i["hospital_Name"])
        if data:           
            Data = {"Hospitals":data1,"status":"true"}
            return Data
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
        UserID=uuid.uuid1()
        if data != None:
            output={"output": "Name already registered ,Please enter the other Name","status":"false"}
        else:
            json1=request.get_data() 
            data=json.loads(json1.decode("utf-8"))  
            print("77787878")
            query2  = " insert into signup (name,mobile,password,Usertype_Id,Hospital_Id,usercreate,UserID)"
            query2 = query2 +" values("+'"'+str(data["name"])+'"'+','+'"'+str(data["mobile"])+'"'+','+'"'+str(data["password"])+'"'+','+'"'+str(data["Usertype_Id"])+'"'+','+'"'+str(data["Hospital_Id"])+'"'+','+'"'+str(data["usercreate"])+'"'+','+'"'+str(UserID)+'"'+");"
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
            #Data = json.dumps(data, default=str)
            return {"HubMaster":data}#,"counter":counter}
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
            query1 = "select ID,hospital_name from Hospital_master where HubId = "+str(data["ID"])+" ;"
        
            
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




@app.route('/getCurrentpatient', methods=['GET'])
def getCurrentpatient():
    try:
        Usertype_Id = request.args['Usertype_Id']
        query2 = "select  * from Patient_master where Status<>'2'  and Usertype_Id ='" +  Usertype_Id + "'"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)

        ii= cursor.fetchone()
        cursor.close()
        if ii != None:
            Count= 1
        else:
            Count=0
        if ii:           
            Data =  {"result":ii,"Count":Count,"status":"True"}
            return Data
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



 
@app.route('/Hospital_master1', methods=['POST'])
def Hospital_master1():
    try:
       
        json1=request.get_data() 
        data=json.loads(json1.decode("utf-8"))  
        query2  = " insert into Hospital_master1 (hospital_name,City,Usermaster_Id,State,usercreate)"
        query2 = query2 +" values("+'"'+str(data["hospital_name"])+'"'+','+'"'+str(data["City"])+'"'+','+'"'+str(data["Usermaster_Id"])+'"'+','+'"'+str(data["State"])+'"'+','+'"'+str(data["usercreate"])+'"'+' '+");"
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
            query2  = " insert into Hospital_master (HubId,hospital_name)"
            query2 = query2 +" values('"+str(data1["HubId"])+"','"+str(data1["hospital_name"])+"');"
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
        UserID=uuid.uuid1()
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




@app.route('/addDoctor', methods=['POST'])
def addDoctor():
    try:
        json1=request.get_data() 
        data1=json.loads(json1.decode("utf-8"))  
        
        query = "select * from DoctorMaster where Email='"+str(data1["Email"])+ "';"
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
        
        if data==():           
            query2  = " insert into DoctorMaster (HospitalId,DoctorName,Email,Gender)"
            query2 = query2 +" values('"+str(data1["HospitalId"])+"','"+str(data1["DoctorName"])+"','"+str(data1["Email"])+"','"+str(data1["Gender"])+"');"
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
        hospital_Name, y="",""
    
       
        if 'hospital_Name' in request.args:
            hospital_Name=request.args["hospital_Name"]

        if  hospital_Name != "":
            WhereCondition1 =  " where hospital_name   = '" + hospital_Name + "'  "
            y = y +  WhereCondition1

        query = "select  de.DeviceMac,de.Bed_Number,de.Vard_Name,de.Hospital_Id,hm.hospital_name as hospital_Name from Device_master as de INNER JOIN Hospital_master as hm on hm.ID= de.Hospital_Id " +y
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


@app.route('/Device_master_select1', methods=['GET'])
def Device_master_select2():
    try:
        hospital_Name, y="",""
    
       
        if 'hospital_Name' in request.args:
            hospital_Name=request.args["hospital_Name"]

        if  hospital_Name != "":
            WhereCondition1 =  " where hospital_name   = '" + hospital_Name + "'  "
            y = y +  WhereCondition1

        query = "select  de.DeviceMac as DeviceMac,hm.hospital_name,de.Hospital_Id as hospital_Name  from Device_master as de INNER JOIN Hospital_master1 as hm on hm.ID= de.Hospital_Id " +y
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        data1=[]
        for i in data:
            data1.append(i["DeviceMac"])
        if data:           
            Data = {"DeviceMac":data1,"status":"true"}
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
        query2  = " insert into Patient_master(PatientName,DoctorID,DeviceMac,Bed_Number,Usertype_Id,hospital_Name,startdate,usercreate)"
        query2 =query2 +" values("+'"'+str(data["PatientName"])+'"'+','+'"'+str(data["DoctorID"])+'"'+','+'"'+str(data["DeviceMac"])+'"'+','+'"'+str(data["Bed_Number"])+'"'+','+'"'+str(data["Usertype_Id"])+'"'+','+'"'+str(data["hospital_name"])+'"'+','+'"'+str(data["startdate"])+'"'+','+'"'+str(data["usercreate"])+'"'+''+");"
        print(query2)
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query2)
        conn.commit()
        cursor.close()
        query = "select PatientId,PatientName,DeviceMac,Usertype_Id from Patient_master  where enddate is NULL " 
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

@app.route('/Patient_master_select1', methods=['GET'])
def Patient_master_select1():
    try:
        PatientName,DeviceMac,PatientId,y,y2,y3,hospital_Name= "","","","","","",""
        if 'PatientId' in request.args:
            PatientId=request.args["PatientId"]
        if 'DeviceMac' in request.args:
            DeviceMac=request.args["DeviceMac"]
        if 'PatientName' in request.args:
            PatientName=request.args["PatientName"]

        if 'hospital_Name' in request.args:
            hospital_Name = request.args["hospital_Name"]
      
      
        WhereCondition=""
        
        if PatientId != "":
            WhereCondition1 =  " and  PatientId    = '" + PatientId + "'  "
            y = y +  WhereCondition1
        
        if DeviceMac != "":
            WhereCondition1 =  " and DeviceMac   = '" + DeviceMac + "'  "
            y = y +  WhereCondition1
        
        if  PatientName != "":
            WhereCondition1 =  "  and  PatientName   = '" + PatientName + "'  "
            y = y +  WhereCondition1

        if  hospital_Name != "":
            WhereCondition1 =  "  and  hospital_Name   = '" + PatientName + "'  "
            y = y +  WhereCondition1


       
        query = "select PatientId,PatientName from Patient_master  where enddate is NULL " + y 
        conn=Connection()
        cursor = conn.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        print(data)
        data1=[]
        data2=[]
        for i in data:
            data1.append(i["PatientId"])
            data2.append(i["PatientName"])
        if data:           
            Data = {"PatientId":data1,"status":"true","PatientName":data2}
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
        query1 = " update Patient_master set   Status ='2'  ,enddate='"+str(ist_f_time)+"'  where PatientId = '" + str(data["PatientId"])+ "' and Usertype_Id = '" + str(data["Usertype_Id"])+ "' and  DeviceMac = '" + str(data["DeviceMac"])+ "';"
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

@socketio.on('new message')
def handle_json(json):
    try:
        print('received json: ' + str(json))
        socketio.emit(json)
        print(type(json))
        data=json  

        socketio.send(data) 
        socketio.emit(data) 
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

       



        
        query = "select  PVM.Patient_Id as PatientId,Pm.PatientName as PatientName,PVM.RESP,PVM.ECG,PVM.SPO2,PVM.NIBP,PVM.TEMP,Pm.DeviceMac AS DeviceMac,Pm.hospital_Name from Patient_Vital_master as PVM INNER JOIN Patient_master as Pm ON Pm.PatientId= PVM.Patient_Id  " +y
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







 
if __name__ == "__main__":
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0',port=5053,debug=True)
    socketio.run(app)
