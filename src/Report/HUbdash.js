import React, { useState, useEffect } from "react";
import axios from "axios";
import { Connector } from 'mqtt-react';

 

import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/USidebar";
import { DashStyled } from "./DashStyled";
import Device1 from "./device1";
import Device2 from "./device2";
import CardComponent from './CardComponent'
import MainCard from './OMainCard'
import history from '../History';

import PatientId1 from "./patientId1";
import PatientId2 from "./patientId2";
import PatientId3 from "./patientId3";
import {subscribe} from 'mqtt-react';
import Detail from '../Details'
   
class UserDash extends React.Component {
  constructor() {
    super();
    this.state = {
        cHname:"",
        cId:"",
      isHub:true, 
      hospitalList:"",
totalHospitalCount:"",
totalPatientCount:"",
totalHubCount:"",
currentTopic:"",
currentinnerItem:"",
currentItem:"" ,
  client:"",
  isDetail:false,
  activePage:1,
  paitentList:[],
  total:0,

   per_page:12,
    }}
    MessageContainer=""
    // 3.0.218.219

    handlePageChange=(pageNumber) =>{
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber},()=>{
          this.callApiNew(pageNumber)
         
      });
    }

    callApi=() => {
        this.setState({paitentList:""})
        let jsons={
      "Email":"hubdoctor@gmail.com",
        
        }
        axios
          .post(
            `https://api.digitologyhealthcare.com/hubdoctorLoginDashboard`, jsons
          )
          .then(res => {
    
            console.log("dashboardHub",res)
            if (res && res.data && res.data.status=="true") {
                let data=res.data;
                console.log("dashboardHub",data.totalHub)
     this.setState({ totalHospitalCount:  data.totalHospitals,totalPatientCount:data.totalpatients,totalHubCount:data.totalHub,hospitalList:data.result})
     
    
  
          
           
    
    
            }
          })
          .catch(e => console.log(e));
      }
    callApiNew=(page_no) => {
      this.setState({paitentList:""})
      let jsons={
    "hospital_Id":this.state.cId,
      "startlimit":((this.state.per_page*page_no) -this.state.per_page)+1,
      "endlimit":this.state.per_page
      }
      axios
        .post(
          `https://api.digitologyhealthcare.com/operationDashboard`, jsons
        )
        .then(res => {
  
          console.log("dashboardNew",res)
          if (res && res.data && res.data.status=="true") {
  
   this.setState({  paitentList:res.data.result,total:res.data.total_patient})
   
  

        
         
  
  
          }
        })
        .catch(e => console.log(e));
    }
    componentDidMount() {
        this.callApi()

   


    }
    goBack=()=>{
      this.setState({isDetail:false})
  }
 
 


  handleClick=(e,item,innerItem)=>{

    console.log("click")
    this.setState({isDetail:!this.state.isDetail,currentinnerItem:innerItem,currentTopic:innerItem.ID+"",currentItem:item})
  }
  setId=(id,name)=>{
      this.setState({cId:id,isHub:false,cHname:name},()=>{
        this.callApiNew(this.state.activePage)
      })
     
  }

  go=()=>{
    this.setState({isHub:true});
  }
  render(){
      
    
    
    if(localStorage.getItem("user_type_id","")!=5)
  { history.push('/')
   window.location.reload();}
let totalHubCount=this.state.totalHubCount;
 let totalHospitalCount=this.state.totalHospitalCount;
 let totalPatientCount=this.state.totalPatientCount;
 let  hospitalList=this.state.HospitalList
  let arr=[]


  console.log("dashboardHub",totalHubCount)

    return (
     
   <DashStyled>
        
           
        <div>
       
          {/* Header */}
          <div id="wrapper">
            {/* {this.props.isOpen && <SideBar></SideBar>} */}
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
              {/* <h2>Dashboard </h2>
              <h3>Monitoring </h3> */}
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-12">
            <div class="info-card box-bg-color">
              <div class="box-1 line-spc">
                <img src={require("./img/lifeline.svg")}/>
                  <h2 class="box-title">Hubs</h2>
              </div>
              <div class="box-1">
    <h3 class="number-title">{totalHubCount}</h3>
              </div>
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
       (
       
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
 
{/* start hub */}
{ this.state.isHub && 

<div className="hub-card-container">
<div className="container">
  <div className="row">
    <div className="col-sm-12 col-md-12">
      <div className="hub-card-box side-bg-color">
        <h2 className="hub-hading">hub</h2>
        <div className="hub-innnr-box-wrap">

            {Array.isArray(this.state. hospitalList) &&  this.state. hospitalList.map((item,i)=>{

return( <div className="hub-show">
            <h3   className="innr-hub-txt">{item.HubName}</h3>
<div className="wrap-wrap">
  <div className="hb-wrap-box">
 
  {Array.isArray(item.Hospitals) &&   item.Hospitals.map((itm,j)=>{return(<div onClick={()=>this.setId(itm.HospitalId,itm.hospital_name)}  style={{cursor:'pointer'}} className="hb-box">
  <h4 style={{cursor:'pointer',background:'#1E1E2F'
 }}>{itm.hospital_name}</h4>
    </div>
   )})}

     
  
  
  </div>
  {/* <div className="btn-wrap-pagenation">
    <button type="button"><img src="right.svg" className="left" /></button>
    <button type="button"><img src="right.svg" /></button>
  </div> */}
</div>
</div>
)

            })
         
            }
        
        </div>
      </div>
    </div>
  </div>
</div>
</div>

}
 {/* end hub */}
        
{ !this.state.isHub &&   <div class="row">
  
       
        
        <div class="col-12 col-sm-12 col-md-12"  >
        <div class="new-box box-bg-color">
          <div class="up-side-box">

      <h2 class="text-hd">{this.state.cHname}</h2>
      <h2  style={{cursor:'pointer',color:'red'}}  onClick={()=>{this.go()}} class="text-hd">Go Back</h2>
            {/* <h2 class="text-hd">{'Pateints :'+item.total_patient}</h2> */}
          </div>
         
        
       
  
      

  
 <MainCard  paitentList={this.state.paitentList} activePage={this.state.activePage}  total={this.state.total} per_page={this.state.per_page} handlePageChange={this.handlePageChange} Click={(event,item,innerItem)=>this.handleClick(event,item,innerItem)}  ></MainCard>
  
  
  

        

          
        </div>
      </div>
 
    
        
      </div>
  }
  
  </div> 
 
  </div>
</div> 
  }
  {  this.state.isDetail &&   <Detail goBack={this.goBack} currentItem={this.state.currentItem} currentinnerItem={this.state.currentinnerItem} client={this.state.client} currentTopic={this.state.currentTopic} ></Detail>}


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