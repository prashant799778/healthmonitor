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

        hubs:"",



          isList:true,
          err:'',
          email:'',isBar:true,
         name:'',
         userid:'',
         pass:'',
         gen:'',
         type:'',
isValid:true,emailError:false,
         temparr:[1,2,3,4],
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
    let api="https://api.digitologyhealthcare.com/deleteHub"
    let jsn={
      "ID":this.state.deleteid,
      
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

  let api="https://api.digitologyhealthcare.com/hubMaster"
   axios.get(api)
 .then((response)=> {
   // handle success
      
    console.log("hubMaster",response)
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
     
      name:item.HubName?item.HubName:"",
      userid:item.ID?item.ID:"",
     
    })

  }



  componentDidMount(){
      this.callapi()
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



        let api="https://api.digitologyhealthcare.com/hubMaster"
         axios.get(api)
       .then((response)=> {
         // handle success
            
         
         console.log("hubMaster",response)
      

          if(response.data && response.statusText && response.statusText=="OK"){
            console.log("hubMaster",response)
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
    

      
     let api="https://api.digitologyhealthcare.com/insertHubMaster"
     let json={
       "HubName":this.state.name,
     
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
      
     
     let api="https://api.digitologyhealthcare.com/updatehubmaster"
     let json={
      "HubName":this.state.name,
       "ID":this.state.userid
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
       console.log("array",this.state.hubs)
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
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Hub</span>}
            
            {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              {/* add new css */}

              {!this.state.isList &&        <div className="container-box">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="page-hadding">
                <h2>HOME</h2>
                <h3>Hubs / Add Hub </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="add-hospital-section box-bg-color">
                <div className="add-inner-box">
                  <h2 className="box-hading">Add Hub</h2>
                </div>
                
                  <div className="info-box">
                    <div className="form-group text-left">
                      <label className="label-sz">Hub Name</label>
                      <input    onChange={(e)=>{
                               
                               if(e.target.value.length < 25){
                                 this.setState({name: e.target.value},()=>{
                                
                                   
                                 })
                                 }}}  value={this.state.name} type="email" className="form-control" placeholder="..." />
                    </div>
                  </div>
                <div className="btn-section box-bg-color spc-bottom-1-padding">
                {!this.state.isEdit &&    <button type="reset" onClick={()=>{this.reset()}} className="add-btn spc-right">Reset</button>}
                                {!this.state.isEdit && <button type="button"  onClick={()=>{this.submitapi()}} className="add-btn">{"save" } </button>  }
                                {this.state.isEdit && <button type="button"  onClick={()=>{this. updatetapi()}} className="add-btn">{ "update"} </button>  }
                             
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

                                }

              {/* end new css */}



<template>


          {!this.state.isList &&     <div style={{background:'#26293B'}}   className="container-fluid" >
                  <div className="row" style={{background:'#1E1E2F'}}  >
                    <div className="col-sm-12 col-md-12">
                     <form onSubmit={this.uploadHandler} style={{background:'#26293B'}}  > <div className="adduser fadeInLeft animated" style={{background:'#26293B'}}  > {/* Card user */}              
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                          <font color="white">Add Hub</font>
                            
                          </h6>
                      
                        </div>
                        <div style={{background:'#26293B'}}   className="info-headding">
                          <h6 className="m-0 text-black"><font color="white">Hub Information</font></h6>
                          <span className="line" />
                        </div>

                        <div className="col-sm-12 col-md-12  ">
                          <div style={{background:'#26293B'}}  className="container form-box">
                            <div className="row">
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom"><font color="white">Hub name</font></label>
                                <input required   onChange={(e)=>{
                               
                                if(e.target.value.length < 25){
                                  this.setState({name: e.target.value},()=>{
                                 
                                    
                                  })
                                  }}}  value={this.state.name} className="fom-wd" type="text" name placeholder="Name" />
                               
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
               
               </template>
               {/* table data */}

              {/* add new section */}
              {this.state.isList &&  
              <div className="container-box innr-card-bg-color">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="uppr-box-card">
                <h2 className="hading-up">home - <span>Hubs</span></h2>
              </div>
            </div>
               <div className="col-sm-12 col-md-12">
              <div className="main-card innr-card-bg-color">
                <div className="card-box">
                  <h2 className="text-hd">All Hubs</h2>
                </div>
                <div className="card-wrap-box">
                { Array.isArray(this.state.hubs)  && this.state.hubs.map((item,i)=>{

return (


                  <div className="card-hub box-bg-color">
                    <div className="id-info border-bottomm">
                      <h3> {item.HubName}</h3>
                      <ul>
                        {/* <li>
                          <button type="button" className="act-button"><img src={require("./img/eye.svg")} /></button>
                        </li> */}
                        <li onClick={()=>{this.edit(item)}}>
                          <button type="button" className="act-button"><img src={require("./img/edit.svg")} /></button>
                        </li>
                        <li  onClick={()=>{this.deletes(item.ID)}} data-toggle="modal" data-target="#deleteModal">
                          <button type="button" className="act-button"><img src={require("./img/delete.svg")} /></button>
                        </li>
                      </ul>
                    </div>
                    <div className="num-box">
                      <div className="count-box">
                        <h2 className="innr-text-hd text-center"> {item.total_hospital}</h2>
                        <p className="info-doc">Hospital</p>
                      </div>
                      <div className="count-box">
                        <h2 className="innr-text-hd text-center"> {item.total_doctor}</h2>
                        <p className="info-doc">Doctor</p>
                      </div>
                    </div>
                  </div>            
              
)})}
              
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
            
            
            
              {/* add new section */}









<template>
               {this.state.isList &&     <div className="container-fluid tbl-b animated--grow-in adduserr">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div   style={{background:'#1E1E2F'}} className="card mb-4">
                        <div className="card-header py-3 d-flex justify-content-between"  style={{background:'#1E1E2F'}}>
                          <h6  className="m-0 text-white">All Hubs</h6>
                          {/* <div className="icon-bx">
                            <ul>
                              <li><i className="fas fa-chevron-down" /></li>
                              <li><i className="fas fa-sync" /></li>
                              <li><i className="fas fa-times" /></li>
                            </ul>
                          </div> */}
                        </div>
                        <div className="card-body">
                            <div class="container-fluid"  >
                              <div  style={{background:'#1E1E2F'}} class="row">
                            { Array.isArray(this.state.hubs)  && this.state.hubs.map((item,i)=>{

                        return (


                             <div class="col-2 hubs">
                                   <div class="row" style={{marginLeft: '3px' ,  display: 'flex'
    ,justifyContent: 'space-between'}}>
                                   <div class="">
                                      {item.HubName}
                                   </div>
                                <div class="">
                                <div className="action-bx">
                                      <ul>
                                       
                                        <li onClick={()=>{this.edit(item)}}><i className="far fa-edit" /></li>
                                        <li  onClick={()=>{this.deletes(item.ID)}} data-toggle="modal" data-target="#deleteModal">   <i className="far fa-trash-alt" /></li>
                                      </ul>
                                    </div> 
                                  </div> 
                                   </div>
                                   <div class="row  hubsLine">
                                       <hr></hr>
                                   </div>
                                   <div class="row">
                                   <div class="">
                                   <div class="col hubsNumber">
                                  {item.total_hospital}
                                       </div>
                                       <div class="col text10">
                                     Hospitals
                                       </div>
                                   </div>
                                <div class="" style={{    marginLeft: '38px'}}>
                                <div class="col hubsNumber">
                              {item.total_doctor}
                                       </div>
                                       <div class="col text10">
                                      Doctors  
                                       </div></div> 
                                   </div>
                            
                                  </div>
                         ); 
                            })     }
                {/*  */}
                                 </div>

                            </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               }

</template>
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
  };


  export default User;