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
import {Tabs, Tab} from 'react-bootstrap-tabs';
// import labReport from "./lab-dash"
// declare var jQuery;


class LabReportView extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return (

            


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
                                                    <th style={{color:'aliceblue'}}>Date</th>
                                                    <th style={{color:'aliceblue'}}>Action</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                <tr></tr>
                                                {console.log("cheee",this.props.dataFromParent)}
                                                {Array.isArray(this.props.dataFromParent) ? 
                                                    this.props.dataFromParent.map((item,i)=>{
                                                
                                                return(
                                                    <tr  id={i}>
                                                        <td>{i+1}</td>
                                                        <td>{item.TestType}</td>
                                                        <td>{item.ReportName}</td>
                                                        <td>{item.DateCreate}</td>
                                                        
                                                        
                                                        <td>
                                                            <div className="action-bx">
                                                                <ul>
                                                                    <li onClick={()=>{this.uploadPatientDocument(item)}}><i className="far fa-eye" /></li>
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
        )
    }
}
export default LabReportView            