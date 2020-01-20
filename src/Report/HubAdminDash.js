import React, { useState, useEffect } from "react";
import axios from "axios";
import { Connector } from 'mqtt-react';


import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/HubSideBar";
import { DashStyled } from "./DashStyled";
import Device1 from "./device1";
import Device2 from "./device2";
import CardComponent from './CardComponent'
import history from '../History';

import PatientId1 from "./patientId1";
import PatientId2 from "./patientId2";
import PatientId3 from "./patientId3";
import {subscribe} from 'mqtt-react';
import Detail from '../Details'
import Hub from '../User/hubNew'
class UserDash extends React.Component {
  constructor() {
    super();
    this.state = {
        hubs:"", 
totalHospitalCount:"",
totalPatientCount:"",
totalHubsCount:"",
totalDoctorCount:"",
totalNurseCount:"",
    totalOperationCount:"",
hubName:""


  
    }}
 
    componentDidMount() {
     
    
  this.callApi()

 
    }


   
   callApi=() => {
    let jsons={
      "Email":localStorage.getItem("email",""),
      "HubId":localStorage.getItem("hub_id","")
    }
    axios
      .post(
        `http://3.0.218.219:5053/hubadminPannel`, jsons
      )
      .then(res => {

        console.log("dashboard",res)
        if (  res && res.data && res.data.status=="true") {
            console.log("dashboard",res)

            let rs=res.data.result;
 this.setState({totalHospitalCount:rs.totalHospital[0].count,totalPatientCount:rs.totalPatient[0].count,
  
    totalDoctorCount:rs.totalDoctor[0].count,
    totalNurseCount:rs.totalNurse[0].count,
    totalOperationCount:rs.totalOperation[0].count,
    hubName:rs.Hub.HubName 

});
        }}).catch(e => console.log(e));
  }




  render(){
    console.log("ttt",localStorage.getItem("user_type",""))
    if(localStorage.getItem("user_type","")!="HubAdmin")
   { history.push('/')
    window.location.reload();}



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
     



                <div className="container-box">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="page-hadding">
                <h2>Dashborad</h2>
                <h3>Hub-{this.state.hubName} </h3>
              </div>
            </div>
          
            <div className="col-sm-6 col-md-3 col-12">
              <div className="info-card box-bg-color">
                <div className="box-1 line-spc">
                  <img src={require("./img/dropper.svg")} />
                  <h2 className="box-title">Patients</h2>
                </div>
                <div className="box-1">
                  <h3 className="number-title">{this.state.totalPatientCount}</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-12">
              <div className="info-card box-bg-color">
                <div className="box-1 line-spc">
                  <img src={require("./img/doctor_new.svg")} />
                  <h2 className="box-title">Doctors</h2>
                </div>
                <div className="box-1">
                  <h3 className="number-title">{this.state.totalDoctorCount}</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-12">
              <div className="info-card box-bg-color">
                <div className="box-1 line-spc">
                  <img src={require("./img/hospital_new.svg")} />
                  <h2 className="box-title">Hospitals</h2>
                </div>
                <div className="box-1">
                  <h3 className="number-title">{this.state.totalHospitalCount}</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-12">
              <div className="info-card box-bg-color">
                <div className="box-1 line-spc">
                  <img src={require("./img/hospital_new.svg")} />
                  <h2 className="box-title">Operations</h2>
                </div>
                <div className="box-1">
                  <h3 className="number-title">{this.state. totalOperationCount}</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-12">
              <div className="info-card box-bg-color">
                <div className="box-1 line-spc">
                  <img src={require("./img/hospital_new.svg")} />
                  <h2 className="box-title">Nurses</h2>
                </div>
                <div className="box-1">
                  <h3 className="number-title">{this.state.totalNurseCount}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12">
            <div className="container-box innr-card-bg-color">
        <div className="container">
          <div className="row">
            
               <div className="col-sm-12 col-md-12">
              
                
          
              
             
            </div>
          </div>
        </div>
      </div>}
            
            </div>
          </div>
     
     
        </div>
      </div>


              </div>
              {/* End of Main Content */}
              {/* Footer */}
              <footer className="sticky-footer new-background-color">
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