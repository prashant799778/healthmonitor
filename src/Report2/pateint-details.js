// import React from "react";
import PateintDetailsStyle from "./pateint-details-style";
import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import history from '../History';
import {UserStyled} from '../User/UserStyled';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { withTheme } from 'styled-components';
import 'react-widgets/dist/css/react-widgets.css';
import Multiselect from 'react-widgets/lib/Multiselect'
class PateintDetails extends React.Component{
    constructor(){
        super()
            this.state={
    doctors:"",
     hubs:"",
     HList:[],
     HListId:[],
     doctorsDetail: [],
     hospitals:"",
     Shospitals:[],
     Sdoctor: [],
              isList:true,
              mobile:'',   
              err:'',
              isBar:true,
              email:'',
              gen:'',
              password:'',
             name:'',
             hub_id:"",
             hosp_id: "",
             hospital_id:"",
             hub_name:"",
             hospital_name:"",
             userid:'',
             pass:'',
             
             type:'',
              isValid:true,emailError:false,
    
             typeList:'',
             userList:'',
             isEdit:false,
             deleteid:'',

             isPatientButton:false,
             isPatientDetailsView: false,


            }
      }
      deletes=(id,hid)=>{
        this.setState({deleteid:id,deleteHid:hid})
      }
      delete=()=>{
    
        console.log("deleteId",this.state.deleteid+","+this.state.deleteHid)
        let api="http://159.65.146.25:5053/deleteDoctorHospital"
        let jsn={
          "ID":this.state.deleteid,
          "Hospital_Id":this.state.deleteHid
        }
        axios.post(api,jsn)
      .then((response)=> {
        // handle success
          
       
        if(response){
        
          if(response && response.data && response.data.status==="true"){
           
             this.callapi() 
          
          }else{
          
            
          }
        }
    
        
      })
      .catch( (error)=> {
        // handle error
        
        
      })
    
    
    
     
        
      }
      uploadHandler=(e)=>{
        e.preventDefault()
       
        if(this.state.emailError){
          // alert("email is not valid")
          this.setState({err:"Invalid email",emailError:!this.state.emailError,
          //  isEdit:true,isList:false
        },()=>{
        })
       
        }
        else if(!this.state.emailError) {
        
       
        if(this.state.isEdit){
          this.updatetapi()
        }
        else {
          this.submitapi()
        }
      }}
      getTypeapi=()=>{
    
      let api="http://134.209.153.34:5004/getrole"
       axios.get(api)
     .then((response)=> {
       // handle success
         
      
       if(response){
         if(response && response.data && response.data.data[0] && response.data.status==="true"){
          
                 let d=response.data.data;
                 let l=[]
                 for(let i=0;i<d.length;i++){
                   l.push(d[i].role)
                 }
              this.setState({typeList:l})
    
         }else{
         
           
         }
       }
    
     })
     .catch( (error)=> {
       // handle error
       
      
     })
    
    
    
      }
      edit=(item)=>{
    
        let  gender=item.Gender;
           if(gender==0){
             gender=3
           }
    
    
           this.getHospitals(item.HubId)
    
    
           let hls=[];
           if(Array.isArray(item.totalHospitals)){
            item.totalHospitals.map((itm,i)=>{
              hls.push( itm.hospitalName ) 
            })
           
           }
        this.setState({
          isList:false,
          isEdit:true,
        
          name:item.DoctorName?item.DoctorName:"",
          userid:item.ID?item.ID:"",
          email:item.Email?item.Email:"",
          gen:gender?gender:"",  
          password:item.password?item.password:"",
          mobile:item.mobile?item.mobile:"",
         hub_id:item.HubId?item.HubId:"",
         Shospitals:hls,
        })
       
      }
    
    
     
    
      componentDidMount(){
        this.callapi()
        this.getHubs()
        // this.getTypeapi()
      }
      handleValidation(){
        let fields = this.state.json;
            let errors = {};
            let formIsValid = true;
        if(!fields["name"]){
          formIsValid = false;
          errors["name"] = "Cannot be empty";
       }
    
      }
    
      reset=()=>{
    
        this.setState({
          err:'',
          email:'',
          name:'',
          userid:'',
          pass:'',
          gen:'',
          type:'',
          hospitals: [],
          doctorsDetail: [],
          PateintDetails: [],
          patientDetailView: '',
          isPatientButton: false
        })
      }
    
      getHubs=()=>{
           
     
    
    
    
         let api="http://159.65.146.25:5053/hubMaster"
          axios.get(api)
        .then((response)=> {
          // handle success
             
          
          console.log("hubs",response)
       
    
           if(response.data && response.statusText && response.statusText=="OK"){
             console.log("hubs",response)
                   if(Array.isArray(response.data.HubMaster)){
                   
                     this.setState({hubs: response.data.HubMaster})
    
    
                   }
             
           }
      
    
        
      })
      .catch( (error)=> {
        // handle error
        
        
      })
      this.hubs = [
          {
            "HubName": "Delhi", 
            "ID": 1, 
            "total_doctor": 2, 
            "total_hospital": 5
          }, 
          {
            "HubName": "Uttar Pradesh", 
            "ID": 2, 
            "total_doctor": 0, 
            "total_hospital": 4
          }, 
          {
            "HubName": "Chandigarh", 
            "ID": 3, 
            "total_doctor": 0, 
            "total_hospital": 5
          }, 
          {
            "HubName": "Rajasthan", 
            "ID": 4, 
            "total_doctor": 0, 
            "total_hospital": 6
          }, 
          {
            "HubName": "Mumbai", 
            "ID": 5, 
            "total_doctor": 0, 
            "total_hospital": 3
          }, 
          {
            "HubName": "Lucknow", 
            "ID": 6, 
            "total_doctor": 0, 
            "total_hospital": 1
          }
        ]
      
      }
      getPatient=(id)=>{
        let patient_id = this.state.patient_id;
          console.log("hhhhhhh",this.state.patient_id)
          if(id){
            patient_id = id
          }
          this.setState({ Sdoctor:[]})
          let api="http://159.65.146.25:5053/getPatientList";
          let json = {
              "doctorId": 1,
          }
          axios.post(api,json).then(resp=>{
              console.log(resp)
              if(resp && resp){
                  
              }else{
                this.state.doctorsDetail.push([
                  {
                    "DateCreate": "Sat, 21 Dec 2019 13:44:20 GMT",
                    "DateUpdate": null,
                    "DoctorName": "mohit",
                    "Email": "mohit@gmail.com",
                    "Gender": 0,
                    "HospitalId": 4,
                    "ID": 15,
                    "Status": 0,
                    "UserCreate": null,
                    "UserUpdate": null
                },
                {
                    "DateCreate": "Mon, 23 Dec 2019 08:40:09 GMT",
                    "DateUpdate": null,
                    "DoctorName": "maya",
                    "Email": "maya@gmail.com",
                    "Gender": 1,
                    "HospitalId": 4,
                    "ID": 18,
                    "Status": 0,
                    "UserCreate": null,
                    "UserUpdate": null
                }
                ])
               
              }
              this.state.PateintDetails =[
                {
                  "Address": "Noida_sec_65",
                  "Bed_Number": "1",
                  "BloodGroup": "A+",
                  "DateCreate": "Tue, 17 Dec 2019 11:00:32 GMT",
                  "DateUpdate": null,
                  "DeviceMac": "192.1.1.20",
                  "Email": "user@gmail.com",
                  "Gender": 1,
                  "PatientId": 1,
                  "PatientName": "Anurag",
                  "PhoneNo": 9999999999,
                  "Status": 0,
                  "UserUpdate": null,
                  "Usertype_Id": 1,
                  "age": 30,
                  "enddate": null,
                  "heartRate": "{\"upper\": \"150\", \"lower\": \"90\", \"status\": \"true\"}",
                  "highPressure": "{\"upper\": \"110\", \"lower\": \"60\", \"status\": \"true\"}",
                  "hospitalId": 1,
                  "lowPressure": "{\"upper\": \"130\", \"lower\": \"70\", \"status\": \"true\"}",
                  "pulseRate": "{\"upper\": \"120\", \"lower\": \"90\", \"status\": \"true\"}",
                  "roomNumber": 2,
                  "spo2": "{\"upper\": \"101\", \"lower\": \"70\", \"status\": \"true\"}",
                  "startdate": "Thu, 12 Dec 2019 11:11:03 GMT",
                  "temperature": "{\"upper\": \"40\", \"lower\": \"80\", \"status\": \"true\"}",
                  "usercreate": "Doctor"
              },
              {
                  "Address": "Noida_sec_65",
                  "Bed_Number": "3",
                  "BloodGroup": "A+",
                  "DateCreate": "Tue, 17 Dec 2019 13:10:49 GMT",
                  "DateUpdate": null,
                  "DeviceMac": "192.1.1.20",
                  "Email": "user@gmail.com",
                  "Gender": 1,
                  "PatientId": 3,
                  "PatientName": "Naman",
                  "PhoneNo": 9999999999,
                  "Status": 0,
                  "UserUpdate": null,
                  "Usertype_Id": 1,
                  "age": 30,
                  "enddate": null,
                  "heartRate": "{\"upper\": \"120\", \"lower\": \"80\", \"status\": \"true\"}",
                  "highPressure": "{\"upper\":150,\"lower\":90,\"status\":\"true\"}",
                  "hospitalId": 1,
                  "lowPressure": "{\"upper\":100,\"lower\":60,\"status\":\"true\"}",
                  "pulseRate": "{\"upper\":50,\"lower\":30,\"status\":\"true\"}",
                  "roomNumber": 2,
                  "spo2": "{\"upper\":110,\"lower\":70,\"status\":\"true\"}",
                  "startdate": "Thu, 12 Dec 2019 11:11:03 GMT",
                  "temperature": "{\"upper\":50,\"lower\":30,\"status\":\"true\"}",
                  "usercreate": "Doctor"
              },
              ]
          })
          this.state.PateintDetails =[
            {
              "Address": "Noida_sec_65",
              "Bed_Number": "1",
              "BloodGroup": "A+",
              "DateCreate": "Tue, 17 Dec 2019 11:00:32 GMT",
              "DateUpdate": null,
              "DeviceMac": "192.1.1.20",
              "Email": "user@gmail.com",
              "Gender": 1,
              "PatientId": 1,
              "PatientName": "Anurag",
              "PhoneNo": 9999999999,
              "Status": 0,
              "UserUpdate": null,
              "Usertype_Id": 1,
              "age": 30,
              "enddate": null,
              "heartRate": "{\"upper\": \"150\", \"lower\": \"90\", \"status\": \"true\"}",
              "highPressure": "{\"upper\": \"110\", \"lower\": \"60\", \"status\": \"true\"}",
              "hospitalId": 1,
              "lowPressure": "{\"upper\": \"130\", \"lower\": \"70\", \"status\": \"true\"}",
              "pulseRate": "{\"upper\": \"120\", \"lower\": \"90\", \"status\": \"true\"}",
              "roomNumber": 2,
              "spo2": "{\"upper\": \"101\", \"lower\": \"70\", \"status\": \"true\"}",
              "startdate": "Thu, 12 Dec 2019 11:11:03 GMT",
              "temperature": "{\"upper\": \"40\", \"lower\": \"80\", \"status\": \"true\"}",
              "usercreate": "Doctor"
          },
          {
              "Address": "Noida_sec_65",
              "Bed_Number": "3",
              "BloodGroup": "A+",
              "DateCreate": "Tue, 17 Dec 2019 13:10:49 GMT",
              "DateUpdate": null,
              "DeviceMac": "192.1.1.20",
              "Email": "user@gmail.com",
              "Gender": 1,
              "PatientId": 3,
              "PatientName": "Naman",
              "PhoneNo": 9999999999,
              "Status": 0,
              "UserUpdate": null,
              "Usertype_Id": 1,
              "age": 30,
              "enddate": null,
              "heartRate": "{\"upper\": \"120\", \"lower\": \"80\", \"status\": \"true\"}",
              "highPressure": "{\"upper\":150,\"lower\":90,\"status\":\"true\"}",
              "hospitalId": 1,
              "lowPressure": "{\"upper\":100,\"lower\":60,\"status\":\"true\"}",
              "pulseRate": "{\"upper\":50,\"lower\":30,\"status\":\"true\"}",
              "roomNumber": 2,
              "spo2": "{\"upper\":110,\"lower\":70,\"status\":\"true\"}",
              "startdate": "Thu, 12 Dec 2019 11:11:03 GMT",
              "temperature": "{\"upper\":50,\"lower\":30,\"status\":\"true\"}",
              "usercreate": "Doctor"
          },
          ]
          
          console.log("hi")
      }
      getPatientOpen(){
        console.log("change value",this.state.isPatientButton)
        this.setState({
          isPatientButton: true})
          console.log("change value",this.state.isPatientButton)
      }
      getDoctor=(id)=>{
          let hospital_id = this.state.hosp_id;
          console.log("hhhhhhh",this.state.hosp_id)
          if(id){
              hospital_id = id
          }
          this.setState({ Sdoctor:[]})
          let api="http://159.65.146.25:5053/getDoctorList";
          let json = {
              "HospitalId": 1,
          }
          axios.post(api,json).then(resp=>{
              console.log(resp)
              if(resp && resp){
                  
              }else{
                this.state.doctorsDetail.push([
                  {
                    "DateCreate": "Sat, 21 Dec 2019 13:44:20 GMT",
                    "DateUpdate": null,
                    "DoctorName": "mohit",
                    "Email": "mohit@gmail.com",
                    "Gender": 0,
                    "HospitalId": 4,
                    "ID": 15,
                    "Status": 0,
                    "UserCreate": null,
                    "UserUpdate": null
                },
                {
                    "DateCreate": "Mon, 23 Dec 2019 08:40:09 GMT",
                    "DateUpdate": null,
                    "DoctorName": "maya",
                    "Email": "maya@gmail.com",
                    "Gender": 1,
                    "HospitalId": 4,
                    "ID": 18,
                    "Status": 0,
                    "UserCreate": null,
                    "UserUpdate": null
                }
                ])
               
              }
              this.state.doctorsDetail =[
                {
                  "DateCreate": "Sat, 21 Dec 2019 13:44:20 GMT",
                  "DateUpdate": null,
                  "DoctorName": "mohit",
                  "Email": "mohit@gmail.com",
                  "Gender": 0,
                  "HospitalId": 4,
                  "ID": 15,
                  "Status": 0,
                  "UserCreate": null,
                  "UserUpdate": null
              },
              {
                  "DateCreate": "Mon, 23 Dec 2019 08:40:09 GMT",
                  "DateUpdate": null,
                  "DoctorName": "maya",
                  "Email": "maya@gmail.com",
                  "Gender": 1,
                  "HospitalId": 4,
                  "ID": 18,
                  "Status": 0,
                  "UserCreate": null,
                  "UserUpdate": null
              }
              ]
          })
          this.state.doctorsDetail =[
            {
              "DateCreate": "Sat, 21 Dec 2019 13:44:20 GMT",
              "DateUpdate": null,
              "DoctorName": "mohit",
              "Email": "mohit@gmail.com",
              "Gender": 0,
              "HospitalId": 4,
              "ID": 15,
              "Status": 0,
              "UserCreate": null,
              "UserUpdate": null
          },
          {
              "DateCreate": "Mon, 23 Dec 2019 08:40:09 GMT",
              "DateUpdate": null,
              "DoctorName": "maya",
              "Email": "maya@gmail.com",
              "Gender": 1,
              "HospitalId": 4,
              "ID": 18,
              "Status": 0,
              "UserCreate": null,
              "UserUpdate": null
          }
          ]
          console.log("hi")
      }
          
    
      getHospitals=(id)=>{
          console.log("cehecttss",id)
           let hub_id= this.state.hub_id;
           if(id){
            hub_id=id;
    
           }
           this.setState({  Shospitals:[]})
        console.log("edit hospital")
      
    
         let api="http://159.65.146.25:5053/hospitalMaster"
    
         let json={
          "HubId":hub_id,
         
        }
          axios.post(api,json)
        .then((response)=> {
          // handle success
             
          
          console.log("hubs",response)
       
    
           if(response.data && response.statusText && response.statusText=="OK"){
             console.log("hospitals",response)
                   if(Array.isArray(response.data.result)){
                   
                     this.setState({hospitals: response.data.result},()=>{
                      if( Array.isArray(this.state.hospitals)){
                               let hl=[]
                               let hlId = []
                        this.state.hospitals.map((item,i)=>{
                             
                          hl.push(item.hospital_name);
                          hlId[item.hospital_name]=item.ID;
    
                        })
    
    
                        this.setState({HList:hl,HListId:hlId})
                        console.log("checks",this.HList, this.HListId)
                      }
                     })
    
    
                   }
             
           }
      
    
        
      })
      .catch( (error)=> {
        // handle error
        
        
      })
    
    this.state.hospitals = {
      "HubMaster": [
        {
          "HubName": "Delhi", 
          "ID": 1, 
          "total_doctor": 2, 
          "total_hospital": 5
        }, 
        {
          "HubName": "Uttar Pradesh", 
          "ID": 2, 
          "total_doctor": 0, 
          "total_hospital": 4
        }, 
        {
          "HubName": "Chandigarh", 
          "ID": 3, 
          "total_doctor": 0, 
          "total_hospital": 5
        }, 
        {
          "HubName": "Rajasthan", 
          "ID": 4, 
          "total_doctor": 0, 
          "total_hospital": 6
        }, 
        {
          "HubName": "Mumbai", 
          "ID": 5, 
          "total_doctor": 0, 
          "total_hospital": 3
        }, 
        {
          "HubName": "Lucknow", 
          "ID": 6, 
          "total_doctor": 0, 
          "total_hospital": 1
        }
      ], 
      "status": "true"
    }
    
     
        
      }
      viewDetails(){
        this.setState({
          isPatientDetailsView: true
        })
        
        let api="http://159.65.146.25:5053/getPatientDetail";
          let json = {
              "PatientId": 1,
          }
          axios.post(api,json).then(resp=>{
              console.log(resp)
              if(resp && resp['state'] == 'true'){
                this.setState({
                  patientDetailView: resp['result'][0]
                })
              }  
      })

      }          
      callapi=()=>{
           
        this.setState({isList:true,isEdit:false})
    
       console.log("delete after")
    
         let api="http://159.65.146.25:5053/allDoctor"
          axios.post(api)
        .then((response)=> {
          // handle success
             
          
          console.log("allDoctor",response)
       
    
           if(response.data && response.statusText && response.statusText=="OK"){
             console.log("allDoctor",response)
                   if(Array.isArray(response.data.result)){
                   
                     this.setState({doctors: response.data.result})
    
    
                   }
             
           }
      
    
        
      })
      .catch( (error)=> {
        // handle error
        
        
      })
    
    
    
     
        
      }
       
      
      getGender=(gen)=>{
        if(gen!=undefined){
          switch(gen){
            case 0:
              return "Female";
              case 1:
              return "Male";
              default :
              return "Other";
          }
        }
       
        }   
       
          
        // }
        submitapi=()=>{
          let gens = this.state.gen;
          if(gens==3){
            gens=0
          }
          let hids=[]  
          this.state. Shospitals.map((item,i)=>{
    hids.push(this.state. HListId[item])
          })     
          
          let api="http://159.65.146.25:5053/addDoctor"
          let json=
          
          
          {
    "name":this.state.name,
    "mobile":this.state.mobile,
    "password":this.state.password, 
    "confirm_password":this.state.password,
    "Gender":Number(gens),
    "Hospital_Id":hids,
    
    
    "Email":this.state.email}
          
                  
         
          
           axios.post(api,json)
         .then((response)=> {
           // handle success
            console.log("addHub",response) 
          
           if(response){
             
             if(response && response.data && response.data.status==="true"){
             
     alert("User Created Successfully")
               this.callapi()
     
     
     
     
             }else{
             
               this.setState({err:response.data.result}) 
             }
           }
       
           
         })
         .catch( (error)=> {
           // handle error
           this.setState({err:"somethimg goes wrong!"}) 
           
         })
        
        }
    
        updatetapi=()=>{
    
          console.log("update doctor")
          let gens = this.state.gen;
          if(gens==3){
            gens=0
          }
          let hids=[]  
          this.state. Shospitals.map((item,i)=>{
    hids.push(this.state. HListId[item])
          })     
         let api="http://159.65.146.25:5053/updateDoctorMaster"
         let json={"ID":this.state.userid,"name":this.state.name
         ,"mobile":this.state.mobile,"Usertype_Id":2,"Hospital_Id": hids,"password":this.state.password,"confirm_password":this.state.password,"Email":this.state.email,"Gender":gens}     
         
        
       
          axios.post(api,json)
        .then((response)=> {
          // handle success
            console.log(response)  
         
          if(response){
           
            if(response && response.data && response.data.status==="true"){
            
              alert("Data Updated Successfully")
              this.setState({err:""})
              this.callapi()
    
    
            }else{
            
              this.setState({err:response.data.result}) 
             
            }
          }
      
        })
        .catch( (error)=> {
          // handle error
          alert("aa22")
          this.setState({err:"somethimg goes wrong!"}) 
         
        })
      
      
      
       
          
        }
        render() {
          if(localStorage.getItem("user_type","")!="admin")
          { history.push('/')
           window.location.reload();}
    
          let colors = ['orange', 'red', 'blue', 'purple1','orange1', 'red1', 'blue1', 'purple1'] 
     
          
          return (
            <UserStyled>
            <div >
              {/* Page Wrapper */}
              <div id="wrapper">
                {/* Sidebar */}
                { this.props.isOpen  &&   <SideBar></SideBar>}
    
               
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                  {/* Main Content */}
                  <div id="content">
                    {/* Topbar */}
                 <AppBar  Open={this.props.Open}></AppBar>
                    {/* End of Topbar */}
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-sm-12 col-md-12">
                          <div className="wrap-had">
                            <button  style={{ background:'#E96729 !important',   cursor: "pointer"}}  className="clk" onClick={()=>{this.setState({
                                email:'',
                                name:'',
                                userid:'',
                                pass:'',
                                gen:'',
                                type:'',
                                error1:'',err:"",emailError:false,
                              isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})
                              }}>
                {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />View Pateint Details</span>}
                
                {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                {!this.state.isList && this.state.isCanclbutton == true && <span style={{color:'#ffffff'}} className="adu">Go Back</span>}
                             
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
              {!this.state.isList &&     <div style={{background:'#26293B'}}   className="container-fluid" >
                      <div className="row" style={{background:'#1E1E2F'}}  >
                        <div className="col-sm-12 col-md-12">
                         <form onSubmit={this.uploadHandler} style={{background:'#26293B'}}  > <div className="adduser fadeInLeft animated" style={{background:'#26293B'}}  > {/* Card user */}              
                         <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                          <font color="white">Patient Details</font>
                            
                          </h6>
                      
                        </div>


                        <div style={{background:'#26293B'}}   className="info-headding">
                          <h6 className="m-0 text-black"><font color="white">Patient Information</font></h6>
                          <span className="line" />
                        </div>
                         {this.state.isPatientDetailsView == false && <div>
    
    
                            <div className="col-sm-12 col-md-12  ">
                              <div style={{background:'#26293B'}}  className="container form-box">
                                <div className="row">
    
                                <div className="col-sm-12 col-md-3 innr-bx">
                                    <label className="title-fom" htmlFor="class-info"><font color="white">Hub</font></label>
                                    <select  required  disabled={this.state.isEdit} value={this.state.hub_id} onChange={(e)=>{
                                     
                                      this.setState({hub_id: e.target.value},()=>{
                                       
                                        this.getHospitals()})}}  className="form-control fom-hit" id="class-info">
                                      <option>-- Choose Type --</option>
                                      {Array.isArray(this.state.hubs) && this.state.hubs.map((item,i)=>{
                                        return(<option id={item.ID} value={item.ID} >{item.HubName}</option>)
                                      })}
                                    </select>
                                  </div>
                      
                              { this.state.hospitals && this.state.hospitals.length > 0 &&   <div className="col-sm-12 col-md-3 innr-bx">
                                  <label className="title-fom" htmlFor="class-info"><font color="white">Hospital</font></label>
                                  {console.log("chekc",this.state.hospitals)}
                                    <select  required  disabled={this.state.isEdit} value={this.state.hosp_id} onChange={(e)=>{
                                     console.log("aaaaa",e.target.value)
                                      this.setState({hosp_id: e.target.value},()=>{
                                        console.log(this.hosp_id)
                                       
                                        this.getDoctor()})}}  className="form-control fom-hit" id="class-info">
                                      <option>-- Choose hospital --</option>
                                      {/* {console.log("vijay",this.state.HList[0])} */}
                                      {Array.isArray(this.state.hospitals) && this.state.hospitals.map((item,i)=>{
                                          console.log("vijay",item)
                                        //   {item.HList && item.HList[i]
                                            return(<option id={item.ID} value={item.ID} >{item.hospital_name}</option>)
                                        //   }
                                        
                                      })}
                                    </select>
                                    
                                  </div>}
    
    
    
                                  
                                 {console.log("doctorssss",this.state.doctorsDetail)}
                                  { this.state.doctorsDetail && this.state.doctorsDetail.length > 0 && <div className="col-sm-12 col-md-3 innr-bx">
                                    <label className="title-fom"><font color="white">Doctor name</font></label>
                                    <select  required  disabled={this.state.isEdit} value={this.state.doctor_id} onChange={(e)=>{
                                     
                                     this.setState({doctor_id: e.target.value},()=>{
                                      
                                       this.getPatient()})}}  className="form-control fom-hit" id="class-info">
                                     <option>-- Choose Pateint --</option>
                                     {/* {console.log("vijay",this.state.HList[0])} */}
                                     {Array.isArray(this.state.doctorsDetail) && this.state.doctorsDetail.map((item,i)=>{
                                        
                                       //   {item.HList && item.HList[i]
                                           return(<option id={item.ID} value={item.ID} >{item.DoctorName}</option>)
                                       //   }
                                       
                                     })}
                                   </select>
                                   {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                                   </div>
                                  }
                                 

                                 { this.state.PateintDetails && this.state.PateintDetails.length > 0 && <div className="col-sm-12 col-md-3 innr-bx">
                                    <label className="title-fom"><font color="white">Patient name</font></label>
                                    <select  required  disabled={this.state.isEdit} value={this.state.patient_id} onChange={(e)=>{
                                     
                                     this.setState({patient_id: e.target.value},()=>{
                                      
                                       this.getPatientOpen()})}}  className="form-control fom-hit" id="class-info">
                                     <option>-- Choose Pateint --</option>
                                     {/* {console.log("vijay",this.state.HList[0])} */}
                                     {Array.isArray(this.state.PateintDetails) && this.state.PateintDetails.map((item,i)=>{
                                        
                                       //   {item.HList && item.HList[i]
                                           return(<option id={item.ID} value={item.ID} >{item.PatientName}</option>)
                                       //   }
                                       
                                     })}
                                   </select>
                                   {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                                   </div>
                                  }
                                 
                                  
                                  <div className="clearfix" />
                                  <div className="col-sm-12 col-md-12">
                                    {/* <p style={{color:'red'}}>{this.state.err}</p> */}
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="btn-bx">
                                      {console.log("change value",this.state.isPatientButton)}
                                      {this.state.isPatientButton == true && <button onClick={()=>{this.viewDetails()}}  className="form-btn sbmtbtn" style={{background:"#4FA746",borderColor:"#4e72df"}}> View </button>}
                                      
                                     {!this.state.isEdit &&   <button style={{background:'#DC3545',borderColor:"#cc7564"}}  className="form-btn sbmtbtn" type="reset" onClick={()=>{this.reset()}}>Reset</button>
                                     }
                                    </div>
                                  </div>
    
                                </div>
                              </div>
                            </div>
                          
                            
                              </div> 
                         }
                         { this.state.isPatientDetailsView == true && <div>hello</div>

                         }
                                    
                                  
                         </div>
                        </form>{/* End Card user */}

                        </div>
                      </div>
                    </div>
                   
                                }
                   
                   
                   {/* table data */}
                   
                  {/* End Table Data */}
                  </div>
                  {/* End of Main Content */}
                  {/* Footer */}
                  <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                      <div className="copyright text-center my-auto">
                        <span>Copyright ©Digitology Healthtech Pvt. Ltd. 2020</span>
                      </div>
                    </div>
                  </footer>
                  {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
              </div>
              {/* End of Page Wrapper */}
              {/* Scroll to Top Button*/}
              <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
              </a>
    
                {/* Logout Modal*/}
                <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Ready to Delete?</h5>
                      <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">Select "Delete" below if you are ready to delete HUB.</div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                      <a  style={{color:"#ffffff"}} data-dismiss="modal" className="btn btn-primary"  onClick={()=>{this.delete()}}>delete</a>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Logout Modal*/}
             
              <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                      <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                      <a  style={{color:"#ffffff"}} className="btn btn-primary"  onClick={()=>{
                        localStorage.removeItem("login")
                        history.push("/")
                        window.location.reload();
    
                      }}>Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            </div></UserStyled>
    
    
    
          );
        }
    }
export default PateintDetails;