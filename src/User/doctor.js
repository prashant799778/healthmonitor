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
doctors:"",
 hubs:"",
 hospitals:"",
          isList:true,
          err:'',
          isBar:true,
          email:'',
          gen:'',
          password:'',
         name:'',
         hub_id:"",
         hospital_id:"",
         userid:'',
         pass:'',
         
         type:'',
isValid:true,emailError:false,

         typeList:'',
         userList:'',
         isEdit:false,
         deleteid:''
        }
  }
  deletes=(id)=>{
    this.setState({deleteid:id})
  }
  delete=()=>{
    let api="http://134.209.153.34:5004/deleteUser?userid="+this.state.deleteid
    axios.get(api)
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
    
      name:item.DoctorName?item.DoctorName:"",
      userid:item.ID?item.ID:"",
      email:'',
      gen:'',
     hub_id:item.HubName?item.HubName:"",
     hospital_id:item.hospital_name?item.hospital_name:"",
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



 
    
  }
      

  getHospitals=()=>{
       
   



     let api="http://159.65.146.25:5053/hospitalMaster"

     let json={
      "HubId":this.state.hub_id,
     
    }
      axios.post(api,json)
    .then((response)=> {
      // handle success
         
      
      console.log("hubs",response)
   

       if(response.data && response.statusText && response.statusText=="OK"){
         console.log("hubs",response)
               if(Array.isArray(response.data.result)){
               
                 this.setState({hospitals: response.data.result})


               }
         
       }
  

    
  })
  .catch( (error)=> {
    // handle error
    
    
  })



 
    
  }
      
  callapi=()=>{
       
    this.setState({isList:true,isEdit:false})



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
   
  
  
   
      
    // }
    submitapi=()=>{
    

      
      let api="http://159.65.146.25:5053/addDoctor"
      let json={
        "HospitalId":this.state.hospital_id,
        "DoctorName":this.state.name,
        "Email":this.state.email,
        "Gender":this.state.gen,
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
      
     
     let api="http://134.209.153.34:5004/edituser"
     let json={
       "username":this.state.name,
       "email":this.state.email,
       "password":this.state.pass,
       "usertype":this.state.type,
       "gender":this.state.gen,
       "userid":this.state.userid
     }
   
      axios.post(api,json)
    .then((response)=> {
      // handle success
        
     
      if(response){
       
        if(response && response.data && response.data.status==="true"){
        
          alert("Data Updated Successfully")
          this.setState({err:""})
          this.callapi()


        }else{
          alert("aa")
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
                          isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})
                          }}>
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Doctor</span>}
            
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
                          <font color="white">Add Doctor</font>
                            
                          </h6>
                      
                        </div>


                        <div style={{background:'#26293B'}}   className="info-headding">
                          <h6 className="m-0 text-black"><font color="white">Doctor Information</font></h6>
                          <span className="line" />
                        </div>

                        <div className="col-sm-12 col-md-12  ">
                          <div style={{background:'#26293B'}}  className="container form-box">
                            <div className="row">

                            <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="class-info"><font color="white">Hub</font></label>
                                <select  required  value={this.state.hub_id} onChange={(e)=>{
                                 
                                  this.setState({hub_id: e.target.value},()=>{
                                   
                                    this.getHospitals()})}}  className="form-control fom-hit" id="class-info">
                                  <option>-- Choose Type --</option>
                                  {Array.isArray(this.state.hubs) && this.state.hubs.map((item,i)=>{
                                    return(<option id={item.ID} value={item.ID} >{item.HubName}</option>)
                                  })}
                                </select>
                              </div>

                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="class-info"><font color="white">Hospital</font></label>
                                <select  required  value={this.state.hospital_id} onChange={(e)=>{
                                 
                                  this.setState({hospital_id: e.target.value})}}  className="form-control fom-hit" id="class-info">
                                  <option>-- Choose Type --</option>
                                  {Array.isArray(this.state.hospitals) && this.state.hospitals.map((item,i)=>{
                                    return(<option id={item.ID} value={item.ID} >{item.hospital_name}</option>)
                                  })}
                                </select>
                              </div>
                             
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom"><font color="white">Doctor name</font></label>
                                <input required   onChange={(e)=>{
                               
                                if(e.target.value.length < 25){
                                  this.setState({name: e.target.value},()=>{
                                 
                                    
                                  })
                                  }}}  value={this.state.name} className="fom-wd" type="text" name placeholder="Name" />
                               
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div>
                             
                               <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info"><font color="white">Gender</font></label>
                                <select   value={this.state.gen} onChange={(e)=>{
                              
                                  this.setState({gen: e.target.value}
                                  )}
                                  }  className="form-control fom-hit" id="gender-info">
                                  <option>-- Choose --</option>
                                  <option value="1">Male</option>
                                  <option value="0" >Female</option>
                                  <option value="2">Others</option>
                                </select>
                              </div>
                              
                             
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom"><font color="white">E-mail</font></label>
                                <input required  onChange={(e)=>{
                                  let errors = {}
                                if(e.target.value.length < 40){
                                  this.setState({email: e.target.value},()=>{
                                    if(typeof this.state.email !== "undefined"){
                                      let lastAtPos = this.state.email.lastIndexOf('@');
                                      let lastDotPos = this.state.email.lastIndexOf('.');
                                      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                                       
                                        this.setState({emailError:true})
                                      }
                                      else {
                                        this.setState({emailError:false})
                                      }
                                  }
                                
                                }
                                    
                                   
                                 
                                  )}}
                                  }  value={this.state.email} className="fom-wd" type="email" name placeholder="email" />
                              
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
                          <h6  className="m-0 text-white">Doctor List</h6>
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
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Doctor ID</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Doctor Name</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Gender</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Hub</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>Hospital(s) Allocated</th>
                                  <th style={{textAlign:"center",color:'aliceblue'}}>No. Of Patient</th>
           
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
                              <tbody>
                                <tr></tr>
                                {Array.isArray(this.state.doctors) ? 
                             this.state.doctors.map((item,i)=>{
                                
                                return(
<tr  id={i}>
                                  <td>{item.ID}</td>
                                  <td>{item.DoctorName}</td>
                                  <td> </td>
                                  <td>{item.HubName}</td>
                                  
                                  <td>{item.hospital_name}</td>
                                  <td>{item.patient}</td>
                                 
                    
                                  <td>
                                    <div className="action-bx">
                                      <ul>
                                       
                                        <li onClick={()=>{this.edit(item)}}><i className="far fa-edit" /></li>
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
            <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ready to Delete?</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Select "Delete" below if you are ready to delete BD.</div>
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