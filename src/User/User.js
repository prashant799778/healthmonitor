import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import history from '../History';
import {UserStyled} from './UserStyled';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

class User extends React.Component{

  constructor(){
    super()
        this.state={
          isList:true,
          err:'',
          email:'',isBar:true,
         name:'',
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
      email:item.email?item.email:"",
      name:item.username?item.username:"",
      userid:item.userid?item.userid:"",
      pass:item.password?item.password:"",
      gen:item.gender?item.gender:"",
      type:item.usertype?item.usertype:"",
    })

  }



  componentDidMount(){
    this.callapi()
    this.getTypeapi()
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
      let api="http://134.209.153.34:5004/userlist"
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
   
  
  
   
      
    // }
    submitapi=()=>{
    

      
     let api="http://134.209.153.34:5004/createUser"
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
        
        if(response && response.data && response.data.status==="True"){
        
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
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        history.push("/")
      }
     let users=""
       if(this.state.userList!=""){
         users=this.state.userList
       }
  let types=[]
  if(this.state.typeList!=""){
    types=this.state.typeList
  }
      
      return (
        <UserStyled>
        <div>
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
                        <button  style={{    cursor: "pointer"}}  className="clk" onClick={()=>{this.setState({
                            email:'',
                            name:'',
                            userid:'',
                            pass:'',
                            gen:'',
                            type:'',
                            error1:'',err:"",emailError:false,
                          isList:this.state.isList?false:true,isEdit:this.state.isList?false:this.state.isEdit})
                          }}>
            {this.state.isList && <span style={{color:'#ffffff'}} className="adu"><i className="fas fa-plus" />Add BD</span>}
            
            {!this.state.isList &&  <span style={{color:'#ffffff'}} className="adu">Cancel</span>}
                         
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
          {!this.state.isList &&     <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                     <form onSubmit={this.uploadHandler}> <div className="adduser fadeInLeft animated"> {/* Card user */}              
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                            Add BD
                          </h6>
                      
                        </div>
                        <div className="info-headding">
                          <h6 className="m-0 text-black">BD Information</h6>
                          <span className="line" />
                        </div>

                        <div className="col-sm-12 col-md-12  ">
                          <div className="container form-box">
                            <div className="row">
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">BD name</label>
                                <input required   onChange={(e)=>{
                               
                                if(e.target.value.length < 25){
                                  this.setState({name: e.target.value},()=>{
                                 
                                    
                                  })
                                  }}}  value={this.state.name} className="fom-wd" type="text" name placeholder="Name" />
                               
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">E-mail</label>
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
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">BD Id</label>
                                <input required disabled={this.state.isEdit} onChange={(e)=>{
                                // json["userid"]=e.target.value
                                
                                if(e.target.value.length < 15){
                                  this.setState({userid: e.target.value}
                                  
                                  )}}
                                  }  value={this.state.userid}  className="fom-wd" type="text" name placeholder="User Id" />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Password</label>
                                <input  required onChange={(e)=>{
                              
                                if(e.target.value.length < 25){
                                  this.setState({pass: e.target.value}
                                    )}}
                                  }  value={this.state.pass} className="fom-wd" type="password" name placeholder="Password" />
                         {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["pass"]}</span>      */}
                                  </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info">Gender</label>
                                <select   value={this.state.gen} onChange={(e)=>{
                              
                                  this.setState({gen: e.target.value}
                                  )}
                                  }  className="form-control fom-hit" id="gender-info">
                                  <option>-- Choose --</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  <option>Others</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="class-info">Type</label>
                                <select  required  value={this.state.type} onChange={(e)=>{
                                 
                                  this.setState({type: e.target.value})}}  className="form-control fom-hit" id="class-info">
                                  <option>-- Choose Type --</option>
                                  {types.map((item,i)=>{
                                    return(<option id={i}>{item}</option>)
                                  })}
                                </select>
                              </div>
                             
                              <div className="clearfix" />
                              <div className="col-sm-12 col-md-12">
                                <p style={{color:'red'}}>{this.state.err}</p>
                              </div>
                              <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                  { <button type="submit"  className="form-btn sbmtbtn" style={{background:"#4e72df",borderColor:"#4e72df"}} > {this.state.isEdit ? "update" :"save" } </button>}
                                  
                                 {!this.state.isEdit &&   <button style={{background:"#cc7564",borderColor:"#cc7564"}}  className="form-btn sbmtbtn" type="reset" onClick={()=>{this.reset()}}>Reset</button>
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
                      <div className="card mb-4">
                        <div className="card-header py-3 d-flex justify-content-between">
                          <h6 className="m-0 text-black">BD Data</h6>
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
                            <table className="table table-striped table-bordered innr-table" id="dataTable" width="100%" cellSpacing={0}>
                              <thead>
                                <tr >
                                  <th style={{textAlign:"center"}}>User ID</th>
                                  <th style={{textAlign:"center"}}>User Name</th>
                                  <th style={{textAlign:"center"}}>E-mail</th>
                                  <th style={{textAlign:"center"}}>Password</th>
                                  <th style={{textAlign:"center"}}>Gender</th>
                                  <th style={{textAlign:"center"}}>Type</th>
                                  <th style={{textAlign:"center"}} className="dlt">Action</th>
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
                              {Array.isArray(users) ? 
                              users.map((item,i)=>{
                                
                                return(
<tr id={i}>
                                  <td>{item.userid}</td>
                                  <td>{item.username}</td>
                                  <td style={{textTransform:"lowercase"}}>{item.email}</td>
                                  <td style={{textTransform:"unset"}}>{item.password }</td>
                                  <td>{item.gender}</td>
                                  <td>{item.usertype}</td>
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