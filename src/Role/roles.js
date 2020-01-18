import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import {DashStyled} from './DashStyled';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


class User extends React.Component{

  constructor(){
    super()
        this.state={
          isList:true,
          err:'',
          email:'',
         name:'',
         userid:'',
         pass:'',
         gen:'',error1:"",
         type:'',
         id:"",
         res:'',
         err:'',
         rolename:'',
         roletype:'',
          desc:'',
isValid:true,
          
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
  submitapi=()=>{
   
   let api="http://134.209.153.34:5004/rolecreation"
   let json={
     "role":this.state.role,
     "desc":this.state.desc,
     "Role Type":this.state.type
   }
   
    axios.post(api,json)
  .then((response)=> {
    
   
    if(response){
     
      if(response && response.data && response.data.status==="True"){
      

        this.setState({res:response.data.result,err:''}) 
        alert("Role Created Successfully")
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

  edit=(item)=>{

    this.setState({
      isList:false,
      isEdit:true,
      id:item._id?item._id:"",
      role:item.role?item.role:"",
      type:item["Role Type" ]?item["Role Type"]:"",
      desc:item.desc?item.desc:"",
   
    })

  }

  dash=()=>{
    this.props.history.push("/home")
  }
  user=()=>{
    this.props.history.push("/user")
  }
  drf=()=>{
    this.props.history.push("/drf")
  }
  role=()=>{
    this.props.history.push("/role")
  }
  report=()=>{
    this.props.history.push("/report")
  }


  componentDidMount(){
    this.callapi()
   
  }
  uploadHandler=(e)=>{
    e.preventDefault()
    if(this.state.isEdit){
      this.updatetapi()
    }
    else{
      this.submitapi()
    }
  } 

  reset=()=>{

    this.setState({
        err:'',
        role:'',
         desc:'',
    })
  }
     callapi=()=>{
       
       this.setState({isList:true,isEdit:false})
      let api="http://134.209.153.34:5004/getrole"
       axios.get(api)
     .then((response)=> {
       // handle success
        
       if(response){
         
         if(response && response.data && response.data.data && response.data.data[0] && response.data.status==="true"){
         
          
          
      
 
          this.setState({userList:response.data.data})
         }else{
         
           
         }
       }
   
      
     })
     .catch( (error)=> {
       // handle error
       
     })
   
   
   
    
       
     }
   
     
  

    updatetapi=()=>{
      
     let api="http://134.209.153.34:5004/editrole"
     let json={
        "_id":this.state.id,
       "role":this.state.role,
       "desc":this.state.desc,
       "Role Type":this.state.type,
      
     }
     
      axios.post(api,json)
    .then((response)=> {
      // handle success
    
     
      if(response){
        
        if(response && response.data && response.data.status==="true"){
        
          alert("Data Updated Successfully")
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
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        this.props.history.push("/")
      }
     let users=""
       if(this.state.userList!==""){
         users=this.state.userList
       }
  let types=[]
  if(this.state.typeList!==""){
    types=this.state.typeList
  } 
      return (
        <DashStyled>
        <div>
          {/* Page Wrapper */}
          <div id="wrapper">
            {/* Sidebar */}
            {  this.props.isOpen &&     <SideBar></SideBar>}
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
               <AppBar Open={this.props.Open} ></AppBar>
                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="wrap-had">
                        <a style={{    cursor: "pointer"}} className="clk" onClick={()=>{this.setState({
                           role:'',
                           desc:'',
                           err:'',
                   type:"",
                          isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})}}>
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add Role</span>}
            
            {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
          {!this.state.isList &&     <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="adduser fadeInLeft animated"> {/* Card user */}              
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                            Add Role
                          </h6>
                          {/* <ul>
                            <li><i className="fas fa-chevron-down" /></li>
                            <li><i className="fas fa-sync" /></li>
                            <li><i className="fas fa-times" /></li>
                          </ul> */}
                        </div>
                        <div className="info-headding">
                          <h6 className="m-0 text-black">Role Information</h6>
                          <span className="line" />
                        </div>
                        <form onSubmit={this.uploadHandler} >
                        <div className="col-sm-12 col-md-12  ">
                          <div className="container form-box">
                            <div className="row main-b">
                           
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Role Name</label>
                                <input required  onChange={(e)=>{
                                 
                                  this.setState({role: e.target.value}
                                 
                                  )
                              }} 
                             value={this.state.role}  className="fom-wd" type="text" name placeholder="Role Name" />
                              </div>
                              
                               <div class="form-group col-md-3">
      <label className="title-fom" for="inputState">Role Type</label>
      <select id="inputState" class="form-control" required value={this.state.type} onChange={(e)=>{
        this.setState({type:e.target.value},()=>{
        
        })

      }} >
      <option value="">Select Role Type</option>
      <option value="Admin">Admin</option>
      <option value="Non-Admin">Non-Admin</option>
      </select>
    </div>
                       
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Description</label>
                                <textarea  rows="4" cols="50"  onChange={(e)=>{
                                  
                                  this.setState({desc: e.target.value}
                                 
                                  )
                                  }}  value={this.state.desc}   name placeholder="description" />
                             
                              </div>
                             
                         
                              <div className="clearfix" />
                              <div className="col-sm-12 col-md-12">
                                <p style={{color:'red'}}>{this.state.err}</p>
                              </div>
                              <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                  { <button   style={{background:"blue"}} type="submit" className="form-btn save-btn" >{this.state.isEdit ? "update":"Save"}</button>}
                                 
                    
                                 {!this.state.isEdit &&   <button style={{background:"#c54242"}} type="reset" className="form-btn save-btn"  onClick={()=>{this.reset()}}>Reset</button>
                                 }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div></form>
                      </div>{/* End Card user */}
                    </div>
                  </div>
                </div>
               
                            }
               
               
               {/* table data */}
               {this.state.isList &&     <div className="container-fluid tbl-b animated--grow-in adduserr">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="card mb-4">
                        <div className="card-header py-3 d-flex justify-content-between">
                          <h6 className="m-0 text-black">Role Data</h6>
                          
                        </div>
                        <div className="card-body drf-vi">
                          <div className="table-responsive srt">
                            <table className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                              <thead>
                                <tr>
                                  <th style={{textAlign:"center"}}>Role</th>
                                  <th style={{textAlign:"center"}}>Roletype</th>
                                  <th style={{textAlign:"center"}}>Desc</th>
                                  <th style={{textAlign:"center"}} className="dlt">Action</th>
                                </tr>
                              </thead><tbody>
                               
                              {Array.isArray(users) ?
                              users.map((item,i)=>{
                               
                                return(
<tr id={i}>
                                  <td>{item.role}</td>
                                  <td>{item["Role Type"]}</td>
                                  <td>{item.desc}</td>
                                 
                                  <td>
                                    <div className="action-bx">
                                      <ul>
                                       
                                        <li onClick={()=>{this.edit(item)}}><i style={{color:"#858796"}} className="far fa-edit" /></li>
                                       
                                      </ul>
                                    </div>  
                                  </td>
                                </tr>

                                )
                              }):     <div className="loader" style={{marginLeft:"150%"}}>
                              <Loader
	     type="ThreeDots"
	     color="#9b2812"
	     height={70}
	     width={70}
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
                <div className="modal-body">Select "Delete" below if you are ready to delete role.</div>
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
                    this.props.history.push("/")
                    window.location.reload();

                  }}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </DashStyled>


      );
    }
  };


  export default User;