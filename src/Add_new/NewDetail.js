import React, { Component } from 'react';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar'
import {UserStyled} from '../User/UserStyled';
import plus from './plus.svg';
import minus from './negative.svg';

export default class NewDetail extends Component {
    constructor(){
super()
this.state={
    Area:"",
    label:"",
    type:"",values:["123"],openDrop:false,openText:false,newInput:["abcd"]
}
    }


// Adding New Fields
addInputField=(e)=>{
    e.preventDefault()
    let values = [...this.state.values]
values.push("")
this.setState({values})
console.log(this.state.values)
}
removeInputField=(e)=>{
    e.preventDefault()
    let values = [...this.state.values]
values.pop()
this.setState({values})
console.log(this.state.values)
}
// Storing Input Values
addInputvalues=(e,i)=>{
    console.log(e.target.value,i)
let values = [...this.state.values]
values[i]= e.target.value
this.setState({values},()=>{
    console.log(this.state.values)
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
    
    selectType=(e)=>{
this.setState({type:e.target.value},()=>{
    console.log("2222",this.state.type)
    if(this.state.type=="text"){
        this.setState({openText:true,openDrop:false,values:[""]})
    }
    else if(this.state.type=="dropdown"){
this.setState({openDrop:true,openText:false})
    }
})

    }
    
    render() {
        if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
            this.props.history.push("/add_new_fields")
    
          }else if(localStorage.getItem("login","no")!=="yes"){
    
            this.props.history.push("/")
          }
          console.log(this.state.values)
        return (
            <UserStyled>
            <div>
          {/* Page Wrapper */}
          <div id="wrapper">
            {/* Sidebar */}
            {  this.props.isOpen &&   <SideBar></SideBar>}
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
               <AppBar  Open={this.props.Open} ></AppBar>
                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                  {/* Page Heading */}
                 
              
                </div>
            
      
              <div>
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                     <form onSubmit={this.uploadHandler}> <div className="adduser fadeInLeft animated"> {/* Card user */}              
                        <div className="icon-bx pd">
                          <h6 className="m-0 text-black">
                            Add New Fields
                          </h6>
                      
                        </div>
                        {/* <div className="info-headding">
                          <h6 className="m-0 text-black">BD Information</h6>
                          <span className="line" />
                        </div> */}

                        <div className="col-sm-12 col-md-12  ">
                          <div className="container form-box">
                            <div className="row">
                            <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info">Input Area</label>
                                <select    className="form-control fom-hit" id="gender-info">
                                  <option value="">Choose Fields </option>
                                  <option>Property Basic Detail</option>
                                  <option>Property and Owner Info</option>
                                  <option>Investment and Finance</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Label Name</label>
                                <input required  className="fom-wd" type="text" name placeholder="Label Name" />
                               
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div>
                               <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom" htmlFor="gender-info">Input Type</label>
                                <select    className="form-control fom-hit" value={this.state.type} onChange={this.selectType}
                               id="gender-info"  >
                                  <option value="">Choose Type</option>
                                  <option value="text">Text</option>
                                  <option value ="dropdown">Dropdown</option>
                             
                                </select>
                              </div>
                              <div className="clearfix" />
                             

                            </div>
                            
                                {this.state.openText && 
                                <div className="row">
                                <div className="col-sm-12 col-md-3 innr-bx">
                                <label className="title-fom">Dropdown values</label>
                                <input required  className="fom-wd" type="text" name placeholder="Values..." onChange={(e)=>{this.addInputvalues(e,0)}} />
                               </div>
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                              
                               <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                <button type="submit"  className="form-btn sbmtbtn" style={{background:"#4e72df",borderColor:"#4e72df"}} > Add </button>
                                  </div></div>
                               </div>}

                               {this.state.openDrop && 
                                 <div className="row">
                                     { this.state.values.map((item,i)=>{
return(
    <div className="col-sm-12 col-md-3 innr-bx" id={i}>
                                     <label className="title-fom">Dropdown value:{i+1}</label>
    <input required  className="fom-wd" type="text" name placeholder="Values..."  onChange={(e)=>{this.addInputvalues(e,i)}} />
   
   </div>
)
                                     })}
                               
                                <div className="col-sm-12 col-md-3 news ">
                                <div className="btn-bx-add">
                                <button type="button" style={{background:"transparent",border:"none",outline:"none"}} onClick={this.addInputField}><img className="plus-img" src={plus}style={{width:"25px"}} alt=""></img></button>
                                <button type="button" style={{background:"transparent",border:"none",outline:"none"}} onClick={this.removeInputField}><img className="plus-img"  src={minus} style={{width:"25px"}}alt=""></img></button>
                               {/* <span className="error" style={{color:"red",fontSize:"1rem"}}>{this.state.error1["name"]}</span> */}
                               </div></div>
                               <div className="col-sm-12 col-md-12">
                                <div className="btn-bx">
                                <button type="submit"  className="form-btn sbmtbtn" style={{background:"#4e72df",borderColor:"#4e72df"}} >Add </button>
                                  </div></div>
                               

                              </div> }

                              
                            

                          </div>
                        </div>
                      </div> </form>{/* End Card user */}
                    </div>
                  </div>
                </div>
              </div>
       
    
                {/* /.container-fluid */}
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
                  <a style={{color:"#ffffff"}} className="btn btn-primary"  onClick={()=>{
                    localStorage.removeItem("login")
                    this.props.history.push("/")
                    window.location.reload();

                  }}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </UserStyled>
        )
    }
}
