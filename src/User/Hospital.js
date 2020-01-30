import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import history from '../History';
import {UserStyled} from './UserStyled';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { withTheme } from 'styled-components';

class User extends React.Component{

  constructor(){
    super()
        this.state={

          hospitals:"",
          hubs:"",
          

          isList:true,
          err:'',
          email:'',isBar:true,
         name:'',
         hub_name:'',
         address:'',
         hub_id:'',
         userid:'',
         pass:'',
         gen:'',
         type:'',
isValid:true,emailError:false,

         typeList:'',
         userList:'',
         isEdit:false,
         deleteid:''
        }
  }
  deletes=(id,HubId)=>{
    this.setState({deleteid:id,HubId:HubId})
  }
  delete=()=>{
    let api="https://api.digitologyhealthcare.com/deleteHospital"
    let jsn={
      "ID":this.state.deleteid,
       "HubId":this.state.HubId
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
    this.setState({
      isList:false,
      isEdit:true,
     
      userid:item.ID?item.ID:"",
      name:item.hospital_name?item.hospital_name:'',
        //  hub_name:item.HubName?item.HubName:'',
         hub_name:item.HubId?item.HubId:'',
         address:item.Address?item.Address:'',
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
      type:''
    })
  }
  callapi=()=>{
       
    this.setState({isList:true,isEdit:false})



     let api="https://api.digitologyhealthcare.com/allHospital"
      axios.post(api)
    .then((response)=> {
      // handle success
         
      
      console.log("hospitalMaster",response)
   

       if(response.data && response.statusText && response.statusText=="OK"){
         console.log("hospitalMaster",response)
               if(Array.isArray(response.data.data)){
               
                 this.setState({hospitals: response.data.data})


               }
         
       }
  

    
  })
  .catch( (error)=> {
    // handle error
    
    
  })



 
    
  }
  
  getHubs=()=>{
       
    this.setState({isList:true,isEdit:false})



     let api="https://api.digitologyhealthcare.com/hubMaster"
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



 
    
  }
      
    // }
    submitapi=()=>{
    

      
      let api="https://api.digitologyhealthcare.com/insertHospitalMaster"
      let json={
        "hospital_name":this.state.name,
        "HubId":Number(this.state.hub_name),
        "Address":this.state.address,
     "usercreate": localStorage.getItem("user_id",""),
      
      }
      
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
      
     
     let api="https://api.digitologyhealthcare.com/updateHospitalmaster"
     let json={
       "ID":this.state.userid,
      "hospital_name":this.state.name,
      "HubId":this.state.hub_name ,
    
      "Address":this.state.address,
      "UserUpdate": localStorage.getItem("user_id",""),
    
    }
   
      axios.post(api,json)
    .then((response)=> {
      // handle success
        
      console.log("hosup",response)
      console.log("hosup",json)
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
  //     if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
  //       this.props.history.push("/drfs")

  //     }else if(localStorage.getItem("login","no")!=="yes"){

  //       history.push("/")
  //     }
  //    let users=""
  //      if(this.state.userList!=""){
  //        users=this.state.userList
  //      }
  // let types=[]
  // if(this.state.typeList!=""){
  //   types=this.state.typeList
  // }
      
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
                            hub_name:"",
                            address:'', 
                          isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})
                          }}>
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Hospital</span>}
            
            {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
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
                          <font color="white">Add Hospital</font>
                            
                          </h6>
                      
                        </div>


                        <div style={{background:'#26293B'}}   className="info-headding">
                          <h6 className="m-0 text-black"><font color="white">Hospital Information</font></h6>
                          <span className="line" />
                        </div>

                        <div className="col-sm-12 col-md-12  ">
                          <div style={{background:'#26293B'}}  className="container form-box">
                            <div className="row">

                            <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="class-info"><font color="white">Hub</font></label>
                                <select  required  value={this.state.hub_name} onChange={(e)=>{
                                 
                                  this.setState({hub_name: e.target.value,hub_id:e.target.id})}}  className="form-control fom-hit" id="class-info">
                                  <option>-- Choose Type --</option>
                                  {Array.isArray(this.state.hubs) && this.state.hubs.map((item,i)=>{
                                    return(<option value={item.ID}>{item.HubName}</option>)
                                  })}
                                </select>
                              </div>
                             
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom"><font color="white">Hospital name</font></label>
                                <input required   onChange={(e)=>{
                               
                                if(e.target.value.length < 25){
                                  this.setState({name: e.target.value},()=>{
                                 
                                    
                                  })
                                  }}}  value={this.state.name} className="fom-wd" type="text" name placeholder="Name" />
                               
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div>
                             
                               <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom"><font color="white">Address</font></label>
                                <input required   onChange={(e)=>{
                               
                                if(e.target.value.length < 25){
                                  this.setState({address: e.target.value},()=>{
                                 
                                    
                                  })
                                  }}}  value={this.state.address} className="fom-wd" type="text" name placeholder="Name" />
                               
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div>
                             
                           
                             
                            
                             
                              <div className="clearfix" />
                              <div className="col-sm-12 col-md-12">
                                <p style={{color:'red'}}>{this.state.err}</p>
                              </div>
                              <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                  { <button type="submit"  className="form-btn sbmtbtn" style={{background:"#4FA746",borderColor:"#4e72df"}} > {this.state.isEdit ? "update" :"save" } </button>}
                                  
                                 {!this.state.isEdit &&   <button style={{background:'#DC3545',borderColor:"#cc7564"}}  className="form-btn sbmtbtn" type="reset" onClick={()=>{this.reset()}}>Reset</button>
                                 }
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div> </form>{/* End Card user */}
                    </div>
                  </div>
                </div>
               
                            }
               
               
               {/* table data */}
               {this.state.isList &&     <div className="container-fluid tbl-b animated--grow-in adduserr">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div   style={{background:'#26293B'}} className="card mb-4">
                        <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#26293B'}}>
                          <h6  className="m-0 text-white">Hospital List</h6>
                          {/* <div className="icon-bx">
                            <ul>
                              <li><i className="fas fa-chevron-down" /></li>
                              <li><i className="fas fa-sync" /></li>
                              <li><i className="fas fa-times" /></li>
                            </ul>
                          </div> */}
                        </div>
                        <div className="card-body">
                          <div className="table-responsive srt">
                            <table style={{color:'aliceblue'}} className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                              <thead  style={{background:'#26293B'}}>
                                <tr  style={{background:'#1E1E2F',color:'#FFFFFF'}}>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Hospital ID</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Hospital Name</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Hub Name</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Address</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>No. of Doctor</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>No. of Patient</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}} className="dlt">Action</th>
                                </tr>
                              </thead>
                              {/* <tfoot>
                                <tr>
                                  <th>Name</th>
                                  <th>Position</th>
                                  <th>Office</th>
                                  <th>Age</th>
                                  <th>Start date</th>
                                  <th>Action</th>
                                </tr>
                              </tfoot> */}
                              <tbody >
                                <tr></tr>
                             {Array.isArray(this.state.hospitals) ? 
                             this.state.hospitals.map((item,i)=>{
                                
                                return(
<tr  id={i}>
                                  <td>{item.ID}</td>
                                  <td>{item.hospital_name}</td>
                                  <td>{item.HubName}</td>
                                  <td>{item.Address}</td>
                                  <td>{item.total_doctor}</td>
                                  <td>{item.total_patient}</td>
                                 
                    
                                  <td>
                                    <div className="action-bx">
                                      <ul>
                                       
                                        <li onClick={()=>{this.edit(item)}}><i className="far fa-edit" /></li>
                                        <li  onClick={()=>{this.deletes(item.ID,item.HubId)}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li>
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
                  </div>
                </div>
               }
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
                <div className="modal-body">Select "Delete" below if you are ready to delete Hospital.</div>
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
  };


  export default User;