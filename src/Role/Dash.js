import React from 'react';
import axios from 'axios';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar'
import history from '../History';
class Dash extends React.Component{
  constructor(){
    super()
        this.state={
           res:'',
          err:'',
          role:'',
           desc:''
        }
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


      reset=()=>{

        this.setState({
          err:'',
          role:'',
           desc:''
        
        })
      }
      submitapi=()=>{
        
       let api="http://134.209.153.34:5004/rolecreation"
       let json={
         "role":this.state.role,
         "desc":this.state.desc,
       }
   
        axios.post(api,json)
      .then((response)=> {
        // handle success
        
       
        if(response){
          
          if(response && response.data && response.data.status==="True"){
          
  
            this.setState({res:response.data.result,err:''}) 
  
  
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

        history.push("/")
      }
      return (
        <div>
          {/* Page Wrapper */}
          <div id="wrapper">
            {/* Sidebar */}
            { this.props.isOpen &&   <SideBar></SideBar>}
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
               <AppBar   Open={this.props.Open}></AppBar>
              
                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                  {/* Page Heading */}
                  {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Role</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
                  </div> */}
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="adduser  fadeInLeft animated"> {/* Card user */}              
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                            Add Role
                          </h6>
                          <ul>
                            <li><i className="fas fa-chevron-down" /></li>
                            <li><i className="fas fa-sync" /></li>
                            <li><i className="fas fa-times" /></li>
                          </ul>
                        </div>
                        <div className="info-headding">
                          <h6 className="m-0 text-black">Role Information</h6>
                          <span className="line" />
                        </div>
                        <div className="col-sm-12 col-md-12   ">
                          <div className="container form-box">
                            <div className="row">
                            <div className="col-sm-12 col-md-3 innr-bx"></div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Role</label>
                                <input  onChange={(e)=>{this.setState({role: e.target.value})}}  value={this.state.role}  className="fom-wd" type="text" name placeholder="role" />
                              </div>
                              <div className="col-sm-12 col-md-4 innr-bx">
                                <label className="title-fom">Description</label>
                                <textarea   onChange={(e)=>{this.setState({desc: e.target.value})}}  value={this.state.desc}   name placeholder="description" />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx"></div>
                              {/* <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="class-info">class</label>
                                <select className="form-control fom-hit" id="class-info">
                                  <option>-- Choose Class --</option>
                                  <option>Class 1</option>
                                  <option>Class 2</option>
                                  <option>Class 3</option>
                                  <option>Class 4</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                               <label className="title-fom" htmlFor="section-info">section</label>
                                <select className="form-control fom-hit" id="section-info">
                                  <option>-- Choose Section --</option>
                                  <option>Section A</option>
                                  <option>Section B</option>
                                  <option>Section C</option>
                                  <option>Section D</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info">Gender</label>
                                <select className="form-control fom-hit" id="gender-info">
                                  <option>-- Choose --</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">date of borth</label>
                                <input className="fom-date" id="datepicker" placeholder="dd/mm/yyyy" />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">roll</label>
                                <input className="fom-wd" type="text" name placeholder />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">addmission</label>
                                <input className="fom-wd" type="text" name placeholder />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">religon</label>
                                <input className="fom-wd" type="text" name placeholder />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">E-Mail</label>
                                <input className="fom-wd" type="text" name placeholder />
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="upload-file">upload image</label>
                                <input type="file" className="form-control-file" id="upload-file" />
                              </div> */}
                              <div className="clearfix" />
                              <div className="col-sm-12 col-md-12">
                              <p style={{color:'green'}}>{this.state.res}</p>
                                <p style={{color:'red'}}>{this.state.err}</p>
                              </div>
                              <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                  <a href="#" className="form-btn" onClick={()=>{this.submitapi()}}>save</a>
                                  <a href="#" className="form-btn" onClick={()=>{this.reset()}}>reset</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{/* End Card user */}
                    </div>
                  </div>
                </div>
                {/* table data */}
                  <template />
                  <template />
                </div>
               
                {/* /.container-fluid */}
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
        </div>
      );
    }
  };


  export default Dash;