import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar//USidebar';
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

  let api="https://digitologyhealthcare.com:5053/hubMaster"
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

     let jsons={"Email":localStorage.getItem("email", "")}

        let api="https://digitologyhealthcare.com:5053/doctorLoginHospital"
         axios.post(api,jsons)
       .then((response)=> {
         // handle success
            
         
         console.log("doctorLoginHospital",response)
      

          if(response.data && response.statusText && response.statusText=="OK"){
            console.log("hubMaster",response)
                  if(Array.isArray(response.data.result)){
                  
                    this.setState({hubs: response.data.result})


                  }
            
          }
     
   
       
     })
     .catch( (error)=> {
       // handle error
       
       
     })
   
   
   
    
       
     }
   
  
  
   
      
    // }
    submitapi=()=>{
    

      
     let api="https://digitologyhealthcare.com:5053/insertHubMaster"
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
      
     
     let api="https://digitologyhealthcare.com:5053/allPatient"
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
                    {/* <div className="col-sm-12 col-md-12">
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
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Hospital</span>}
            
            {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
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
                          <h6 className="m-0 text-black"><font color="white">Hospital Information</font></h6>
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
               
               
               {/* table data */}

              {/* add new section */}
              <div class="container-box">
    <div class="container">
      <div class="row">
      { Array.isArray(this.state.hubs)  && this.state.hubs.map((item,i)=>{

return (
        <div class="col-sm-6 col-md-3 col-12">
          <div class="box-container box-bg-color">
            <div class="innr-box-info border-bottomm">
              <h2 class="box-hadingg">{item.hospital_name}</h2>
              <img src={require("../image/eye.svg")}/>
            </div>
            <div class="innr-box-info">
              <p class="text-hading">Patients</p>
              <h3 class="lg-hading">  {item.patient_count}</h3>
            </div>
          </div>
        </div>)})}

      
      
      
      
      </div>
    </div>
  </div>
              {/* End New Section */}

           
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