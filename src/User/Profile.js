import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar//USidebar';
import history from '../History';
import {UserStyled} from './UserStyled';
import {Profilestyled} from './Profilestyled';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { withTheme } from 'styled-components';

class User extends React.Component{

  constructor(){
    super()
        this.state={
          
         hub_count:"",
         hospital_count:"",
         patient_count:"",
         name:"",
         age:"",
         gender:"",
         Address:"",
         Contact:"",
         email:""




        }
  }
 
 
  
  
 



  componentDidMount(){
    this.callapi()
   
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
  callapi=()=>{
       
    this.setState({isList:true,isEdit:false})



     let api="http://159.65.146.25:5053/doctorProfile"
     let jssn={"Email": localStorage.getItem("email","") }
      axios.post(api,jssn)
    .then((response)=> {
      // handle success
        
        
      console.log("doctorProfile",response) 
   
   

       if(response.data && response.data.status=="true" &&  response.data.result   &&  Array.isArray(response.data.result) &&  response.data.result[0]   ){
         console.log("doctorProfile",response)
           
                 let rs=response.data;
                 let rsA= response.data.result[0]
         this.setState({
          hub_count:rs.hospital_count,
          hospital_count:rs.hospital_count,
          patient_count:rs.patient_count,
          name:rsA.doctorName,
          age:"",
          gender: this.getGender(rsA.gender),
          Address:"",
          Contact:"",
          email:rsA.Email
         })


               
         
       }
  

    
  })
  .catch( (error)=> {
    // handle error
    
    
  })



 
    
  }
   
  
  
   
      
    // }
    submitapi=()=>{
    

      
      let api="http://159.65.146.25:5053/patient_master"
      let json={
        "PatientName":this.state.name,
        "DeviceMac":this.state.device_allocate,
        "Bed_Number":this.state.bed_no,
        "Usertype_id":localStorage.getItem("user_type_id",""),
        "hospital_Name":this.state.hospital_name,
        "startdate":this.state.start_date,
        "enddate":this.state.end_date,
        "usercreate":localStorage.getItem("user_id","")
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
                <Profilestyled >
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="uppr-home-hading">
                            <h2>HOME - <span> My Profile</span></h2>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="profile-card">
                            <div className="profile-img-box"></div>
      <h3>{this.state.name}</h3>
                            <h4>{this.state.gender}</h4>
                            <div className="profile-info-sec border-op">
                                <h2>Email Id</h2>
      <h2 className="text-right">{this.state.email}</h2>
                                <h2>Contact</h2>
                                <h2 className="text-right">+91-094 04X X90X</h2>
                                <h2>Address</h2>
                                <h2 className="text-right">Address line 1 <br></br> line 2</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <div className="wrap-profile-doc">
                        <div className="info-card side-bg-color">
					            <div className="box-1 line-spc">
                                <img src={require("./img/dropper.svg")} />
					                <h2 className="box-title">Patients</h2>
					            </div>
					            <div className="box-1 text-center" >
					              <h3 className="number-title">{this.state.patient_count}</h3>
					            </div>
					          </div>
                              <div className="info-card side-bg-color">
					            <div className="box-1 line-spc">
                                <img src={require("./img/hospital_new.svg")} />
					                <h2 className="box-title">Hospitals</h2>
					            </div>
					            <div className="box-1 text-center" >
					              <h3 className="number-title">{this.state.hospital_count}</h3>
					            </div>
					          </div>
                              <div className="info-card side-bg-color">
					            <div className="box-1 line-spc">
                                <img src={require("./img/lifeline.svg")}  />
					                <h2 className="box-title">Hubs</h2>
					            </div>
					            <div className="box-1 text-center" >
					              <h3 className="number-title">{this.state.hub_count}</h3>
					            </div>
					          </div>
                        </div>
                        {/* update section */}

                        <div className="update-section-card">
                            <h2 className="update-hading">update</h2>
                        </div>

                        {/* End Update Section */}


                    </div>
                    </div>                 




                </div>
                </Profilestyled>
               
               {/* table data */}
            
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