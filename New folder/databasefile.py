
from connection import DBconnection
import commonfile
import json
import smtplib 
#import config_staging
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

import pymysql

def DBconnection():
    mysqlcon = pymysql.connect(host='localhost',
                            user='root',
                            password='tynor123',
                            db='healthmonitor_staging',
                            charset='utf8mb4',
                            cursorclass=pymysql.cursors.DictCursor)
    
    return mysqlcon



def InsertQuery(table,columns,values):
    try:
        
        query = " insert into " + table + " (" + columns + ") values(" + values + ");" 
        print(query)
        con = DBconnection()
        cursor = con.cursor()
        cursor.execute(query)            
        con.commit()        
        cursor.close()   

        message = commonfile.Successmessage('insert')
        data = {"status":"true","message":message,"result":""}       
        return data

    except Exception as e:
        print("Error--->" + str(e))            
        return "0" 

def InsertRtnId(table,columns,values):
    try:
        
        query = " insert into " + table + " (" + columns + ") values(" + values + ");" 
        print(query)
        con = DBconnection()
        cursor = con.cursor()
        cursor.execute(query)     
        Id = cursor.lastrowid
        con.commit()        
        cursor.close()   
              
        return Id

    except Exception as e:
        print("Error--->" + str(e))            
        return "0" 

def SelectQuery(table,columns,whereCondition,groupby,startlimit,endlimit):
    try:
        limitCondition= ""
        
        if whereCondition != "":
            whereCondition = " where 1=1 " + whereCondition
        if startlimit != "" and endlimit != "":
            limitCondition = "limit "+startlimit+","+endlimit
        
        if groupby != "":
            groupby = " group by " + groupby
                
        query = " select " + columns + " from " + table + " " + whereCondition  + " " + groupby +" "+ limitCondition +" ;"

        print(query)
        con = DBconnection()      
        cursor = con.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
      
        if data:
            data = {"status":"true","message":"","result":data}
        else:
            data = {"status":"true","message":"No Data Found","result":""}

        return data

    except Exception as e:
        print("Error--->" + str(e))            
        return "0" 

def SelectQueryOrderby(table,columns,whereCondition,groupby,startlimit,endlimit,orderby):
    try:
        limitCondition= ""
        
        if whereCondition != "":
            whereCondition = " where 1=1 " + whereCondition
        if startlimit != "" and endlimit != "":
            limitCondition = "limit "+startlimit+","+endlimit
        if orderby != "":
            orderby = " order by " + orderby +" DESC "
        if groupby != "":
            groupby = " group by " + groupby
                
        query = " select " + columns + " from " + table + " " + whereCondition  + " " + groupby +" "+ orderby + limitCondition +" ;"

        print(query)
        con = DBconnection()      
        cursor = con.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
      
        if data:
            data = {"status":"true","message":"","result":data}
        else:
            data = {"status":"true","message":"No Data Found","result":""}

        return data

    except Exception as e:
        print("Error--->" + str(e))            
        return "0" 





def SelectCountQuery(table,whereCondition,groupby):
    try:
        groupby = ""
        if whereCondition != "":
            whereCondition = " where 1=1 " + whereCondition
        if groupby != "":
            groupby = " group by " + groupby
               
        query = " select count(1) as count from " + table + " " + whereCondition  + " " + groupby  + ";"
        print(query)
        con = DBconnection()
        cursor = con.cursor()
        cursor.execute(query)
        data = cursor.fetchall()  
        cursor.close()   

        if data:
            data = json.loads(json.dumps(data))                                 
            return str(data[0]["count"])
        else:
            return "0"

    except Exception as e:
        print("Error--->" + str(e))            
        return "0" 

def rtnsum(table,column,whereCondition,groupbycolumns):
    try:     
        groupby = "" 
        if whereCondition != "":
            whereCondition = " where 1=1 " + whereCondition
        if groupbycolumns != "":
            groupby = " group by " + groupbycolumns
              
        query = " select sum("+column+") as total from " + table + " " + whereCondition  + " " + groupby  + ";"
        print(query)
        con = DBconnection()
        cursor = con.cursor()
        cursor.execute(query)
        data = cursor.fetchall()  
        cursor.close()   

        if data:
            data = json.loads(json.dumps(data))                                 
            return str(data[0]["total"])
        else:
            return "0"

    except Exception as e:
        print("Error--->" + str(e))            
        return "0"

def UpdateQuery(table,columns,whereCondition):
    try:

        if whereCondition != "":
            whereCondition = " where 1=1 " + whereCondition  

        if columns != "":   
            query = " update " + table + " set " + columns  + " " + whereCondition  + ";"             
            print(query)
            con = DBconnection()
            cursor = con.cursor()         
            cursor.execute(query)
            con.commit()
            cursor.close()
              
            message = commonfile.Successmessage('update')
            data = {"status":"true","message":message,"result":""}
            return data
        else:
            return "0"

    except Exception as e:
        print("Error--->" + str(e))            
        return "0"

def DeleteQuery(table,whereCondition):
    try:

        if whereCondition != "":
            whereCondition = " where 1=1 " + whereCondition        

            query = " delete from " + table + " " + whereCondition + ";" 
            print(query)
            con = DBconnection()
            cursor = con.cursor()
            cursor.execute(query)
            con.commit()
            cursor.close()

            message = commonfile.Successmessage('delete')
            data = {"status":"true","message":message,"result":""}
            return data

        else :
            return "0"
                
    except Exception as e:
       print("Error--->" + str(e))            
       return "0"



