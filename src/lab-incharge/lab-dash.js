import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import history from '../History';
import {UserStyled} from '../User/UserStyled';
import LabReportStyle from "./lab-dash-style"
import Loader from 'react-loader-spinner';
import $ from 'jquery';
import 'bootstrap';
import LabReportView from "./lab-report-view";
import {Tabs, Tab} from 'react-bootstrap-tabs';
// declare var jQuery;


class LabInchargeDash extends React.Component{
    constructor(){
        super()
        this.state={
            lab: "",
            patients: [],
            userId: "",
            userTypeId: "",
            isPatientUpload: false,
            selectedFile: null, // to store selected file
            handleResponse: null, // handle the API response
            imageUrl: null ,
            reportList: "",
            hubId: "",
            hospitalId: "",
            lab_id: "",
            labName: "",
            diagList: "",
            diagId: "",
            pacList: "",
            pacId: "",
            dicoList: "",
            dicoId: "",
            patientName: "",
            isLabReport: false,
            isDicomReport: false,
            isDiagReport: false,
            isPacReport: false,
            labReport: [],
            dicomReport: [],
            diagReport: [],
            pacReport: [],
            patientId: "",
            reportUploadName: "",
            isPatientView: false,
        }
        $(document).ready(function() {
            $(".tab").click(function () {
                $(".tab").removeClass("active");
                $(this).addClass("active");     
            });
        });
    }

   

      

    componentDidMount(){
        this.setState({
            userId: localStorage.getItem("user_id")
            
        })
        
        this.getPatientDetails()
        this.getReportList()
        // this.labReportApi(0)
        
        
    }
    
    labReportApi(index){
        console.log("iiiitttt", this.state.patientId)
        this.setState({
            labReport: []
        })
        let api
        if(index == 0){
           
             api = "http://159.65.146.25:5053/getlabReportMaster?HubId="+this.state.hubId+"&HospitalId="+this.state.hospitalId+"&DoctorId="+this.state.doctorId+"&PatientId="+this.state.patientId
            
        }else if(index == 1){
            
             api = "http://159.65.146.25:5053/getdicomReportMaster?HubId="+this.state.hubId+"&HospitalId="+this.state.hospitalId+"&DoctorId="+this.state.doctorId+"&PatientId="+this.state.patientId
           
        }else if(index == 2){
             api = "http://159.65.146.25:5053/getdiagReportMaster?HubId="+this.state.hubId+"&HospitalId="+this.state.hospitalId+"&DoctorId="+this.state.doctorId+"&PatientId="+this.state.patientId
        }else{
             api = "http://159.65.146.25:5053/getpacsReportMaster?HubId="+this.state.hubId+"&HospitalId="+this.state.hospitalId+"&DoctorId="+this.state.doctorId+"&PatientId="+this.state.patientId
        }
        axios.get(api).then(resp=>{
            console.log("cheee",resp)
            this.setState({
                labReport: resp['data']['result'],
                reportUploadName: 'Lab Report'
              })
        })
       
       

    }

    getReportList(){
        let api= "http://159.65.146.25:5053/getTestType"
        axios.get(api).then(resp=>{
            console.log(resp)
            console.log("respoorts",this.state.reportList,"respoorts",resp)
            if(resp && resp['data']['status'] == 'true'){
                this.setState({
                    reportList: resp['data']['result'],
                    diagList:  resp['data']['result'],
                    pacList: resp['data']['result'],
                    dicoList: resp['data']['result'],
                })
                
            }
            console.log("respoorts",this.state.reportList)
        })
    }

    getPatientDetails(){
    
          let json = {
            "ID": localStorage.getItem("user_id")
        }
        let api= "http://159.65.146.25:5053/getPatientDetail"
          axios.post(api, json).then(response => {
           console.log(response) 
           if(response && response['data']['status'] == 'True'){
               this.setState({
                patients: response['data']['result']['0']['patient'],
                hubId: response['data']['result']['0']['HubId'],
                hospitalId: response['data']['result']['0']['HospitalId'],
            })
               console.log(this.state.patients)
               
           }
        //    alert(response['data']['result']['0']['patient'])
            
            
        })
        .catch(err => {
            
        });
        // this.getlabReportMasterApi()
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

    onChangeFile = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    uploadPatientDocument=(patient)=>{
        this.setState({
            isPatientUpload: true,
            userId: localStorage.getItem("user_id"),
            doctorId: patient.doctorId,
            patientName: patient.PatientName,
            patientId:patient.PatientId
            // userId: patient.userId,
        })
        this.state.patientId = patient.PatientId
        console.log("iiiitttt",this.state.patientId)
        this.getReportLabData()
        console.log("iiiitttt",this.state.patientId)
    }

    getReportLabData(){
        let api="http://159.65.146.25:5053/getlabReportMaster?patientId="+this.state.patientId
        
        axios.get(api).then(resp=>{
            console.log(resp)
        })
    }

    uploadDocumentlab=(patient)=>{
        let api = "http://159.65.146.25:5053/labReportMaster"
        const formData = new FormData();
        formData.append("reportFile", this.state.selectedFile, this.state.selectedFile.name);
        formData.append("reportInfo",JSON.stringify([{"hubId":this.state.hubId,"hospitalId":this.state.hospitalId,"doctorId":this.state.doctorId,"reportName":"test report","testType":this.state.lab_id,"userId":this.state.userId}]))
        formData.append("patientId",this.state.patientId)
        console.log(formData)
        axios
        .post(api, formData)
        .then(response => {
           console.log(response) 
           this.setState({
            labReport: this.state.labReport.concat({'reportName': 'Xray','report': 'report path'}),
            reportUploadName: 'Lab Report'
          })

          $("#uploadSuccess").modal('show')
          setTimeout(()=>{
            $("#uploadSuccess").modal('hide')
          },2000)  
            
        })
        .catch(err => {
            console.log(formData);
        });
        // this.setState({
            
            this.getReportLabData()  

            //   jQuery()

            // }   
            
    }

    uploadDicomDocument=(patient)=>{
        let api="http://159.65.146.25:5053/dicomReportMaster"
        const formData = new FormData();
        formData.append("reportFile", this.state.selectedFile, this.state.selectedFile.name);
        formData.append("reportInfo",JSON.stringify([{"hubId":this.state.hubId,"hospitalId":this.state.hospitalId,"doctorId":this.state.doctorId,"reportName":"test report","testType":this.state.dicomId,"userId":this.state.userId}]))
        formData.append("patientId",this.state.patientId)
        console.log(formData)
        axios
        .post(api, formData)
        .then(response => {
           console.log(response) 
           this.setState({
            dicomReport: this.state.dicomReport.concat({'reportName': 'Xray','report': 'report path'}),
            reportUploadName: 'Dicom Report'
          })
          $("#uploadSuccess").modal('show')
           setTimeout(()=>{
            $("#uploadSuccess").modal('hide')
          },2000)  
            
        })
        .catch(err => {
            console.log(formData);
        });
        
    }
 

    uploadDiagDocument=(patient)=>{
        let api="http://159.65.146.25:5053/diagReportMaster"
        const formData = new FormData();
        formData.append("reportFile", this.state.selectedFile, this.state.selectedFile.name);
        formData.append("reportInfo",JSON.stringify([{"hubId":this.state.hubId,"hospitalId":this.state.hospitalId,"doctorId":this.state.doctorId,"reportName":"test report","testType":this.state.diaId,"userId":this.state.userId}]))
        formData.append("patientId",1)
        console.log(formData)
        axios
        .post(api, formData)
        .then(response => {
           console.log(response) 
           this.setState({
            diagReport: this.state.diagReport.concat({'reportName': 'Xray','report': 'report path'}),
            reportUploadName: 'Diag Report'
          })
          $("#uploadSuccess").modal('show')   
          setTimeout(()=>{
            $("#uploadSuccess").modal('hide')
          },2000)    
            
        })
        .catch(err => {
            console.log(formData);
        });
       
    }

    uploadPacDocument=(patient)=>{
        let api="http://159.65.146.25:5053/pacsReportMaster"
        const formData = new FormData();
        formData.append("reportFile", this.state.selectedFile, this.state.selectedFile.name);
        formData.append("reportInfo",JSON.stringify([{"hubId":this.state.hubId,"hospitalId":this.state.hospitalId,"doctorId":this.state.doctorId,"reportName":"test report","testType":this.state.pacId,"userId":this.state.userId}]))
        formData.append("patientId",1)
        console.log(formData)
        axios
        .post(api, formData)
        .then(response => {
           console.log(response) 
           this.setState({
            pacReport: this.state.pacReport.concat({'reportName': 'Xray','report': 'report path'}),
            reportUploadName: 'pac Report'
          })
          $("#uploadSuccess").modal('show')   
          setTimeout(()=>{
            $("#uploadSuccess").modal('hide')
          },2000) 
            
            
        })
        .catch(err => {
            console.log(formData);
        });
    }

    goBackButton(){
        this.setState({
            isPatientUpload: false
        })
        
    }

    viewsReports=(item)=>{
        // ,
            // doctorId: item.doctorId
            
        console.log("iiiitttt",item.PatientId)
        this.setState({
            
            patientId: item.PatientId,
            isPatientView: true,
            
        })
        this.state.patientId = item.PatientId
        this.state.doctorId= item.doctorId
        console.log("iiiitttt",this.state.patientId)
        this.labReportApi(0)
       
    }

    

    render() {

        if(localStorage.getItem("user_type","")!="LabInCharge"){ 
            history.push('/')
            window.location.reload();
        }
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
                                    {this.state.isPatientUpload == true && <div className="col-sm-12 col-md-12">
                                        <div className="wrap-had">
                                            <button  style={{ background:'#E96729 !important',   cursor: "pointer"}}  className="clk" onClick={()=>{
                                                this.goBackButton()
                                            }}>
                                
                                        <span style={{color:'#ffffff'}} className="adu">Go Back</span>
                                            
                                            </button>
                                        </div>
                                        </div>
                                    }
                      
                                        <div className="col-sm-12 col-md-12">
                                            {this.state.isPatientUpload == false && this.state.isPatientView == false && <div   style={{background:'#26293B'}} className="card mb-4">
                                                <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                                                    <h6  className="m-0 text-white">Patient List</h6>
                                                </div>
                                                <div className="card-body text-left">
                                                    <div className="table-responsive srt">
                                                        <table style={{color:'aliceblue'}} className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                                                            <thead  style={{background:'#26293B'}}>
                                                                <tr  style={{background:'#1E1E2F',color:'#FFFFFF'}}>
                                                                    <th style={{color:'aliceblue'}}>Sr.no</th>
                                                                    <th style={{color:'aliceblue'}}>Patient Name</th>
                                                                    <th style={{color:'aliceblue'}}>Gender</th>
                                                                    <th style={{color:'aliceblue'}}>Room No.</th>
                                                                    <th style={{color:'aliceblue'}}>Bed No.</th>
                                                                    <th style={{color:'aliceblue'}}>Address</th>
                                                                    <th style={{color:'aliceblue'}}>Blood Group</th>
                                                                    <th style={{color:'aliceblue'}}>Mobile Number</th>
                                                                    <th style={{color:'aliceblue'}}>Email</th>
                                                                    <th style={{color:'aliceblue'}} className="dlt">Upload</th>
                                                                    <th style={{color:'aliceblue'}} className="dlt">View</th>
                                                                </tr>
                                                            </thead>
                                                            
                                                            <tbody>
                                                                <tr></tr>
                                                                {Array.isArray(this.state.patients) ? 
                                                                    this.state.patients.map((item,i)=>{
                                                                
                                                                return(
                                                                    <tr  id={i}>
                                                                        <td>{i+1}</td>
                                                                        <td>{item.PatientName}</td>
                                                                        <td> {this.getGender(item.Gender) } </td>
                                                                        
                                                                        <td>{item.roomNumber}</td>
                                                                        <td>{item.Bed_Number}</td>
                                                                        <td>{item.Address}</td>
                                                                        <td>{item.BloodGroup}</td>
                                                                        <td>{item.PhoneNo}</td>
                                                                        <td>{item.Email}</td>
                                                                        
                                                            
                                                                        <td>
                                                                            <div className="action-bx">
                                                                                <ul>
                                                                                    <li onClick={()=>{this.uploadPatientDocument(item)}}>
                                                                                        <svg className="upload-img" viewBox="0 0 512 512">

<path d="M472,312.642v139c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20v-139H0v139c0,33.084,26.916,60,60,60h392 c33.084,0,60-26.916,60-60v-139H472z"/>

<polygon points="256,0.358 131.716,124.642 160,152.926 236,76.926 236,388.642 276,388.642 276,76.926 352,152.926 
    380.284,124.642"/>

</svg></li>
                                                                                   
                                                                                </ul>
                                                                            </div>  
                                                                        </td>

                                                                        <td>
                                                                            <div className="action-bx">
                                                                                <ul>
                                                                                <li  onClick={()=>{this.viewsReports(item)}} >   <i className="far fa-eye" /></li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>        
                                                                    </tr>

                                                                )
                                                                }) :    
                                                                <div className="loader" style={{marginLeft:"260%"}}>
                                                                <Loader
                                                                    type="ThreeDots"
                                                                    color="#9b2812"
                                                                    height={80}
                                                                    width={80}
                                                                    //3 secs
                                                                    timeout={10000}
                                                                /> 
                                                                </div>}
                                                                
                                                        
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>}



                                            {this.state.isPatientUpload == true && <div>

                                                <div   style={{background:'#26293B'}} className="card mb-4">
                                                    <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                                                        <h6  className="m-0 text-white">Patient Name : {this.state.patientName}</h6>
                                                    </div>
                                                    <LabReportStyle>
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-3">
                                                                <div className="card-body text-left">
                                                                

                                                                    { this.state.reportList && this.state.reportList.length > 0 &&
                                                                    <div className="innr-bx">
                                                                        <label className="title-fom text-white text-white" htmlFor="class-info">
                                                                            Lab Report
                                                                        </label>
                                                                        {console.log("chekc",this.state.reportList)}
                                                                            <select  required  disabled={this.state.isEdit} value={this.state.lab_id} onChange={(e)=>{
                                                                            console.log("eventtt",e.target)
                                                                            this.setState({lab_id: e.target.value},()=>{
                                                                                console.log(this.lab_id)
                                                                                console.log("eventtt",e.target)
                                                                            
                                                                                })}}  className="fom-hit" id="class-info">
                                                                            <option>-- Choose Report --</option>
                                                                            {/* {console.log("vijay",this.state.HList[0])} */}
                                                                            {Array.isArray(this.state.reportList) && this.state.reportList.map((item,i)=>{
                                                                                console.log("vijay",item)
                                                                                //   {item.HList && item.HList[i]
                                                                                    return(<option id={item.ID} value={item.ID} >{item.TestType}</option>)
                                                                                //   }
                                                                                
                                                                            })}
                                                                            </select>
                                                                            
                                                                        </div>
                                                                    }
            
                                                                    <div>
                                                                    <p className="title text-white">Select Image:</p>
                                                                    <div style={{ marginBottom: 10 }}>
                                                                        <input type="file" onChange={this.onChangeFile} />
                                                                    </div>
                                                                    <input type="button" value="Upload" onClick={this.uploadDocumentlab} />
                                                                    

                                                                    
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-3">
                                                                <div className="card-body text-left">
                                                                    { this.state.diagList && this.state.diagList.length > 0 &&
                                                                        <div className="innr-bx">
                                                                            <label className="title-fom text-white" htmlFor="class-info">Dicom Report</label>
                                                                            {console.log("chekc",this.state.diagList)}
                                                                            <select  required  disabled={this.state.isEdit} value={this.state.dicomId} onChange={(e)=>{
                                                                                    console.log("aaaaa",e.target.value)
                                                                                    this.setState({dicomId: e.target.value},()=>{
                                                                                        console.log(this.hosp_id)
                                                                                    
                                                                                    })
                                                                                }}  className="fom-hit" id="class-info">
                                                                                <option>-- Choose Dicom --</option>
                                                                                
                                                                                {Array.isArray(this.state.diagList) && this.state.diagList.map((item,i)=>{
                                                                                    console.log("vijay",item)
                                                                                    return(<option id={item.ID} value={item.ID} >{item.TestType}</option>)
                                                                                })}
                                                                            </select>
                                                                                
                                                                        </div>
                                                                    }
            
                                                                    <div>
                                                                        <p className="title text-white">Select File:</p>
                                                                        <div style={{ marginBottom: 10 }}>
                                                                            <input type="file" onChange={this.onChangeFile} />
                                                                        </div>
                                                                        <input type="button" value="Upload" onClick={this.uploadDicomDocument} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-3">
                                                                <div className="card-body text-left">
                                                                    { this.state.reportList && this.state.reportList.length > 0 &&
                                                                        <div className="innr-bx">
                                                                            <label className="title-fom text-white" htmlFor="class-info">Diag Report</label>
                                                                            {console.log("chekc",this.state.reportList)}
                                                                            <select  required  disabled={this.state.isEdit} value={this.state.diaId} onChange={(e)=>{
                                                                                console.log("aaaaa",e.target.value)
                                                                                this.setState({diaId: e.target.value},()=>{
                                                                                    console.log(this.hosp_id)
                                                                                    
                                                                                    })
                                                                                }}  className="fom-hit" id="class-info">
                                                                                <option>-- Choose Diag --</option>
                                                                                {Array.isArray(this.state.reportList) && this.state.reportList.map((item,i)=>{
                                                                                    console.log("vijay",item)
                                                                                    return(<option id={item.ID} value={item.ID} >{item.TestType}</option>)
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                    }
            
                                                                    <div>
                                                                        <p className="title text-white">Select File:</p>
                                                                        <div style={{ marginBottom: 10 }}>
                                                                            <input type="file" onChange={this.onChangeFile} />
                                                                        </div>
                                                                        <input type="button" value="Upload" onClick={this.uploadDiagDocument} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-3">
                                                                <div className="card-body text-left">
                                                                    { this.state.reportList && this.state.reportList.length > 0 &&
                                                                    <div className="innr-bx">
                                                                        <label className="title-fom text-white" htmlFor="class-info">Pac Report</label>
                                                                        <select  required  disabled={this.state.isEdit} value={this.state.pacId} onChange={(e)=>{
                                                                            this.setState({pacId: e.target.value},()=>{
                                                                            
                                                                            })
                                                                            }}  className="fom-hit" id="class-info">
                                                                            <option>-- Choose hospital --</option>
                                                                            {Array.isArray(this.state.reportList) && this.state.reportList.map((item,i)=>{
                                                                                return(<option id={item.ID} value={item.ID} >{item.TestType}</option>)
                                                                            })}
                                                                        </select>
                                                                    </div>}
            
                                                                    <div>
                                                                        <p className="title text-white">Select Pac:</p>
                                                                        <div style={{ marginBottom: 10 }}>
                                                                            <input type="file" onChange={this.onChangeFile} />
                                                                        </div>
                                                                        <input type="button" value="Upload" onClick={this.uploadPacDocument} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </LabReportStyle>
                                                </div>


                                            
                                            
                                                 
                                                                     
                                                
                                            
                                            
                                            
                                            { this.state.labReport && this.state.labReport.length > 0 &&
                                             <div   style={{background:'#26293B'}} className="card mb-4">
                                                    <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                                                        <h6  className="m-0 text-white"> LabReport</h6>
                                                    </div>
                                                    <LabReportStyle>
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-12">
                                                                <div className="card-body text-left">
                                                                    <div className="table-responsive srt">
                                                                        <table style={{color:'aliceblue'}} className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                                                                            <thead  style={{background:'#26293B'}}>
                                                                                <tr  style={{background:'#1E1E2F',color:'#FFFFFF'}}>
                                                                                    <th style={{color:'aliceblue'}}>Sr.no</th>
                                                                                    <th style={{color:'aliceblue'}}>Report Name</th>
                                                                                    <th style={{color:'aliceblue'}}>Report</th>
                                                                                    <th style={{color:'aliceblue'}}>Action</th>

                                                                                </tr>
                                                                            </thead>
                                                                            
                                                                            <tbody>
                                                                                <tr></tr>
                                                                                {Array.isArray(this.state.labReport) ? 
                                                                                    this.state.labReport.map((item,i)=>{
                                                                                
                                                                                return(
                                                                                    <tr  id={i}>
                                                                                        <td>{i+1}</td>
                                                                                        <td>{item.reportName}</td>
                                                                                        <td>{item.report}</td>
                                                                                       
                                                                                        <td>
                                                                                            <div className="action-bx">
                                                                                                <ul>
                                                                                                    <li onClick={()=>{this.uploadPatientDocument(item)}}><i className="far fa-edit" /></li>
                                                                                                    <li  onClick={()=>{this.deletes(item.userid)}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li>
                                                                                                </ul>
                                                                                            </div>  
                                                                                        </td>
                                                                                    </tr>

                                                                                )
                                                                                }) :    
                                                                                <div className="loader" style={{marginLeft:"260%"}}>
                                                                                <Loader
                                                                                    type="ThreeDots"
                                                                                    color="#9b2812"
                                                                                    height={80}
                                                                                    width={80}
                                                                                    //3 secs
                                                                                    timeout={10000}
                                                                                /> 
                                                                                </div>}
                                                                                
                                                                        
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </LabReportStyle>     
                                                 </div>
                                            }
                                            { this.state.dicomReport && this.state.dicomReport.length > 0 &&
                                             <div   style={{background:'#26293B'}} className="card mb-4">
                                                    <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                                                        <h6  className="m-0 text-white"> Dicom Report</h6>
                                                    </div>
                                                    <LabReportStyle>
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-12">
                                                                <div className="card-body text-left">
                                                                    <div className="table-responsive srt">
                                                                        <table style={{color:'aliceblue'}} className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                                                                            <thead  style={{background:'#26293B'}}>
                                                                                <tr  style={{background:'#1E1E2F',color:'#FFFFFF'}}>
                                                                                    <th style={{color:'aliceblue'}}>Sr.no</th>
                                                                                    <th style={{color:'aliceblue'}}>Report Name</th>
                                                                                    <th style={{color:'aliceblue'}}>Report</th>
                                                                                    <th style={{color:'aliceblue'}}>Action</th>

                                                                                </tr>
                                                                            </thead>
                                                                            
                                                                            <tbody>
                                                                                <tr></tr>
                                                                                {Array.isArray(this.state.labReport) ? 
                                                                                    this.state.labReport.map((item,i)=>{
                                                                                
                                                                                return(
                                                                                    <tr  id={i}>
                                                                                        <td>{i+1}</td>
                                                                                        <td>{item.reportName}</td>
                                                                                        <td>{item.report}</td>
                                                                                       
                                                                                        <td>
                                                                                            <div className="action-bx">
                                                                                                <ul>
                                                                                                    <li onClick={()=>{this.uploadPatientDocument(item)}}><i className="far fa-upload" /></li>
                                                                                                    {/* <li  onClick={()=>{this.deletes(item.userid)}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li> */}
                                                                                                </ul>
                                                                                            </div>  
                                                                                        </td>
                                                                                    </tr>

                                                                                )
                                                                                }) :    
                                                                                <div className="loader" style={{marginLeft:"260%"}}>
                                                                                <Loader
                                                                                    type="ThreeDots"
                                                                                    color="#9b2812"
                                                                                    height={80}
                                                                                    width={80}
                                                                                    //3 secs
                                                                                    timeout={10000}
                                                                                /> 
                                                                                </div>}
                                                                                
                                                                        
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </LabReportStyle>     
                                                 </div>
                                            }
                                            { this.state.diagReport && this.state.diagReport.length > 0 &&
                                             <div   style={{background:'#26293B'}} className="card mb-4">
                                                    <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                                                        <h6  className="m-0 text-white"> Diagonal Report</h6>
                                                    </div>
                                                    <LabReportStyle>
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-12">
                                                                <div className="card-body text-left">
                                                                    <div className="table-responsive srt">
                                                                        <table style={{color:'aliceblue'}} className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                                                                            <thead  style={{background:'#26293B'}}>
                                                                                <tr  style={{background:'#1E1E2F',color:'#FFFFFF'}}>
                                                                                    <th style={{color:'aliceblue'}}>Sr.no</th>
                                                                                    <th style={{color:'aliceblue'}}>Report Name</th>
                                                                                    <th style={{color:'aliceblue'}}>Report</th>
                                                                                    <th style={{color:'aliceblue'}}>Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            
                                                                            <tbody>
                                                                                <tr></tr>
                                                                                {Array.isArray(this.state.labReport) ? 
                                                                                    this.state.labReport.map((item,i)=>{
                                                                                
                                                                                return(
                                                                                    <tr  id={i}>
                                                                                        <td>{i+1}</td>
                                                                                        <td>{item.reportName}</td>
                                                                                        <td>{item.report}</td>
                                                                                       
                                                                                        <td>
                                                                                            <div className="action-bx">
                                                                                                <ul>
                                                                                                    <li onClick={()=>{this.uploadPatientDocument(item)}}><i className="far fa-upload" /></li>
                                                                                                    {/* <li  onClick={()=>{this.deletes(item.userid)}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li> */}
                                                                                                </ul>
                                                                                            </div>  
                                                                                        </td>
                                                                                    </tr>

                                                                                )
                                                                                }) :    
                                                                                <div className="loader" style={{marginLeft:"260%"}}>
                                                                                <Loader
                                                                                    type="ThreeDots"
                                                                                    color="#9b2812"
                                                                                    height={80}
                                                                                    width={80}
                                                                                    //3 secs
                                                                                    timeout={10000}
                                                                                /> 
                                                                                </div>}
                                                                                
                                                                        
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </LabReportStyle>     
                                                 </div>
                                            }
                                            { this.state.diagReport && this.state.diagReport.length > 0 &&
                                             <div   style={{background:'#26293B'}} className="card mb-4">
                                                    <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                                                        <h6  className="m-0 text-white"> Pac Report</h6>
                                                    </div>
                                                    <LabReportStyle>
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-12">
                                                                <div className="card-body text-left">
                                                                    <div className="table-responsive srt">
                                                                        <table style={{color:'aliceblue'}} className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                                                                            <thead  style={{background:'#26293B'}}>
                                                                                <tr  style={{background:'#1E1E2F',color:'#FFFFFF'}}>
                                                                                    <th style={{color:'aliceblue'}}>Sr.no</th>
                                                                                    <th style={{color:'aliceblue'}}>Report Name</th>
                                                                                    <th style={{color:'aliceblue'}}>Report</th>
                                                                                    <th style={{color:'aliceblue'}}>Action</th>

                                                                                </tr>
                                                                            </thead>
                                                                            
                                                                            <tbody>
                                                                                <tr></tr>
                                                                                {Array.isArray(this.state.labReport) ? 
                                                                                    this.state.labReport.map((item,i)=>{
                                                                                
                                                                                return(
                                                                                    <tr  id={i}>
                                                                                        <td>{i+1}</td>
                                                                                        <td>{item.reportName}</td>
                                                                                        <td>{item.report}</td>
                                                                                       
                                                                                        <td>
                                                                                            <div className="action-bx">
                                                                                                <ul>
                                                                                                    <li onClick={()=>{this.uploadPatientDocument(item)}}><i className="far fa-edit" /></li>
                                                                                                    <li  onClick={()=>{this.deletes(item.userid)}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li>
                                                                                                </ul>
                                                                                            </div>  
                                                                                        </td>
                                                                                    </tr>

                                                                                )
                                                                                }) :    
                                                                                <div className="loader" style={{marginLeft:"260%"}}>
                                                                                <Loader
                                                                                    type="ThreeDots"
                                                                                    color="#9b2812"
                                                                                    height={80}
                                                                                    width={80}
                                                                                    //3 secs
                                                                                    timeout={10000}
                                                                                /> 
                                                                                </div>}
                                                                                
                                                                        
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </LabReportStyle>     
                                                 </div>
                                            }


                                            </div>
                                            }

                                            {this.state.isPatientView == true && <div>
                                                <Tabs onSelect={(index, label) =>    this.labReportApi(index)}>
                                                    <Tab id="lab1" label="Lab Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                    <Tab id="lab2" label="Dicom Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                    <Tab id="lab3" label="Diag Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                    <Tab id="lab4" label="Pac Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                </Tabs>
                                                   
                                                <Tabs >
                                                    <Tab label="Lab Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                    <Tab label="Dicom Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                    <Tab label="Diag Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                    <Tab label="Pac Report"><LabReportView dataFromParent = {this.state.labReport}></LabReportView></Tab>
                                                </Tabs>
                                                                                                    
                                                
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> 


                <div class="modal fade" id="uploadSuccess" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        {/* <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div> */}
                        <div class="modal-body">{this.state.reportUploadName} UPLOAD SUCCESSFULL</div>
                        {/* <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="login.html">Logout</a>
                        </div> */}
                    </div>
                    </div>
                </div>


            </UserStyled>)                      
                   
    }    
}  

export default LabInchargeDash