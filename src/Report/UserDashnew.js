import React, { useState, useEffect } from "react";
import axios from "axios";
import { Connector } from 'mqtt-react';


import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/USidebar";
import { DashStyled } from "./DashStyled";
import Device1 from "./device1";
import Device2 from "./device2";
import CardComponent from './CardComponent'


import PatientId1 from "./patientId1";
import PatientId2 from "./patientId2";
import PatientId3 from "./patientId3";
import {subscribe} from 'mqtt-react';
import Detail from '../Details'
   
class UserDash extends React.Component {
  constructor() {
    super();
    this.state = {
      hospitalList:"",
totalHospitalCount:"",
totalPatientCount:"",
currentTopic:"",
currentinnerItem:"",
  client:"",
  isDetail:false
    }}
    MessageContainer=""
    componentDidMount() {
     
      var mqtt = require('mqtt')
  var client  = mqtt.connect('ws://159.65.146.25:9001')
  this.setState({client:client})
  this.callApi()
    }
    goBack=()=>{
      this.setState({isDetail:false})
  }
   callApi=() => {
    let jsons={
      "Email":localStorage.getItem("email","")
    }
    axios
      .post(
        `http://159.65.146.25:5053/doctorLoginDashboard`, jsons
      )
      .then(res => {

        console.log("dashboard",res)
        if (res && res.data && res.data.status=="true") {

 this.setState({TotalHospitalCount:res.data.Total_hospital,TotalPatientCount:res.data.total_patient,HospitalList:res.data.result},()=>{

  // 
  // if(this.state.client.connected){
  //   console.log("message","connect")
  // this.state.client.subscribe('/1/1/1/+',  (err)=> {
  //   console.log("message",err)
  //   if (!err) {
  //     console.log("message",err)
  //     // client.publish('/t1', '')
  //   }
  // })}
  // client.on('connect', ()=> {
  // if( Array.isArray(this.state.HospitalList)){


    this.state.HospitalList.map((item,i)=>{
      console.log("message",'/'+item.HubId+'/'+item.HospitalId+'/'+ localStorage.getItem("user_id", "")+'/+')
      if(this.state.client.connected){
        console.log("message","connect")
      this.state.client.subscribe('/'+item.HubId+'/'+item.HospitalId+'/'+ '1'+'/+',  (err)=> {
        console.log("message",err)
        if (!err) {
          console.log("message",err)
          // client.publish('/t1', '')
        }
      })}



    })
  // }
  
  })
 

//  })
      
       


        }
      })
      .catch(e => console.log(e));
  }


  handleClick=(e,item,innerItem)=>{

    console.log("click")
    this.setState({isDetail:!this.state.isDetail,currentinnerItem:innerItem,currentTopic:'/'+item.HubId+'/'+item.HospitalId+'/'+"1/"+innerItem.PatientId})
  }

  render(){

 let totalHospitalCount=this.state.TotalHospitalCount;
 let totalPatientCount=this.state.TotalPatientCount;
 let  hospitalList=this.state.HospitalList
  let arr=[]

    return (
     
   <DashStyled>
        
           
        <div>
       
          {/* Header */}
          <div id="wrapper">
            {this.props.isOpen && <SideBar></SideBar>}
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <AppBar Open={this.props.Open}></AppBar>
                {/* Header */}
                {  !this.state.isDetail &&   
                <div className="containerr">                
  
        <div class="new-container">
    <div class="container">
    <div class="row">
          <div class="col-sm-12 col-md-12">
            <div class="page-hadding">
              <h2>Dashborad</h2>
              <h3>Monitoring </h3>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-12">
            <div class="info-card box-bg-color">
              <div class="box-1 line-spc">
                <img src={require("./img/lifeline.svg")}/>
                  <h2 class="box-title">Hospitals</h2>
              </div>
              <div class="box-1">
    <h3 class="number-title">{totalHospitalCount}</h3>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-12">
            <div class="info-card box-bg-color">
              <div class="box-1 line-spc">
                <img src={require("./img/dropper.svg")}/>
                  <h2 class="box-title">Patients</h2>
              </div>
              <div class="box-1">
    <h3 class="number-title">{totalPatientCount}</h3>
              </div>
            </div>
          </div>
        </div> 
      <div class="row">
  
        { Array.isArray(hospitalList) && hospitalList.map((item,i)=>{
          let cls="col-12 col-sm-12 col-md-6"
            if(hospitalList.length==1){
              cls="col-12 col-sm-12 col-md-12"

            }
      return(
        <div class={cls}  >
        <div class="new-box box-bg-color">
          <div class="up-side-box">
      <h2 class="text-hd">{item.hospital_name}</h2>
            <h2 class="text-hd">{'Pateints :'+item.patient_count}</h2>
          </div>
          <div class="new-box-add">
        
  
          {Array.isArray(item.patient_Details) && item.patient_Details.map((innerItem,j)=>{
  
  
  return(
  
 <CardComponent  onClick={(event)=>this.handleClick(event,item,innerItem)}  id={innerItem.PatientId} client={this.state.client} item={innerItem} index={j}  topic={'/'+item.HubId+'/'+item.HospitalId+'/'+innerItem.PatientId} ></CardComponent>
  
  
  
  );
          })}
          </div>
        </div>
      </div>
 
      );
  
        })}
        
      </div>
    </div>
 
  </div>
</div> 
  }
  {  this.state.isDetail &&   <Detail goBack={this.goBack} currentinnerItem={this.state.currentinnerItem} client={this.state.client} currentTopic={this.state.currentTopic} ></Detail>}


              </div>
              {/* End of Main Content */}
              {/* Footer */}
              <footer className="sticky-footer new-background-color">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright ©fourbrick 2019</span>
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
          <div
            className="modal fade"
            id="logoutModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ready to Leave?
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select "Logout" below if you are ready to end your current
                  session.
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <a
                    style={{ color: "#ffffff" }}
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.removeItem("login");
                      this.props.history.push("/");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        
        </div>
                  
      </DashStyled>

    );
                  }


}   export default UserDash;