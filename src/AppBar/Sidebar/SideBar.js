import React from 'react';
import history from '../../History';
import '../style.css';
import {withRouter} from 'react-router-dom';
import dashimg from '../../image/dashboard.svg';

import { Link } from "react-router-dom";
import logo from './web_icon.png';
class SideBar extends React.Component{

  constructor(){
    super()
        this.state={
          active:null,
        }
        
  }
  // myColor=(position)=> {
  //   if (this.state.active === position) {
  //     return "blue"
  //   }
  //   return "";
  // }
  componentDidMount(){
   
   if(window.location.pathname == "/dash"){
   
    let element = document.getElementById('side11');
    element.classList.add("active");
   }
   else if(window.location.pathname == "/hospital"){
   
    let element = document.getElementById('side22');
  
    element.classList.add("active");
  }
  else if(window.location.pathname == "/patient"){
   
    let element = document.getElementById('side33');
   
    element.classList.add("active");
  }
  else if(window.location.pathname == "/hubs"){
   
    let element = document.getElementById('side44');
   
    element.classList.add("active");
  }
  else if(window.location.pathname == "/doctor"){
   
    let element = document.getElementById('side55');
   
    element.classList.add("active");
  }
  else if(window.location.pathname == "/nurse"){
   
    let element = document.getElementById('side66');
   
    element.classList.add("active");
  }
  

}
  
   dash=()=>{
     history.push("/home")
      }
        user=(position)=>{
          setTimeout(()=>{
        history.push("/user")
    
        },20)}
  drf=(position)=>{
   setTimeout(()=>{
    history.push("/drf")
   
   },20)
        

      }
      role=(position)=>{
        setTimeout(()=>{
        history.push("/role")
       
       },20) }
      report=(position)=>{
        setTimeout(()=>{
         history.push("/report")
     
      },20)}
      smart=(position)=>{
        setTimeout(()=>{
        history.push("/smart")
      
        
        },20)
     }
  

newDetails=(position)=>{
  history.push("/add_new_fields")
}
newDetails22=(position)=>{
  history.push("/add2")
}

   render(){


return(
  <div className="">
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion  bck-clr" id="accordionSidebar">
    <a className="sidebar-brand d-flex align-items-center justify-content-center border-bt">
      <div className="sidebar-brand-icon">
      </div>
      <div className="sidebar-brand-text mx-3">
      <img src={logo}></img>   
        
      </div>
    </a>
    <li className="nav-item">
    <Link to="/dash" id="side11" className="nav-link  ">
        <img src={dashimg}/>Home
      </Link>
    </li>

    <li className="nav-item">
    <Link to="/hubs" id="side44" className="nav-link  ">
        <img src=""/>Hubs
      </Link>
    </li>
   
    <li  className="nav-item">
      <Link to="/hospital"   id="side22" className="nav-link">
        <img src=""/>Hospitals
      </Link>
    </li>
    <li    className="nav-item">
      <Link   id="side55"  to="/doctor" className="nav-link">
        <img src=""/>Doctors
      </Link>
    </li>
    <li    className="nav-item">
      <Link   id="side66"  to="/nurse" className="nav-link">
        <img src=""/>Nurses
      </Link>
    </li>
    <li    className="nav-item">
      <Link   id="side33"  to="/patient" className="nav-link">
        <img src=""/>Patients
      </Link>
    </li>



    {/* <li className="nav-item">
      <a href="#" className="nav-link active">
        <img src=""/>dashboard
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link active">
        <img src=""/>dashboard
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link active">
        <img src=""/>dashboard
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link active">
        <img src=""/>dashboard
      </a>
    </li> */}

    {/* <li className="nav-item active" id="side1" onClick={()=>{this.user(0)}}>
    <a className="nav-link sudo " id="side11">
      
       <span className="myside"> <i className="far fa-user" />
       BD</span>
       </a>
    </li>
    <li className="nav-item active" id="side2"  onClick={()=>{this.drf(1)}}>
        
        <a className="nav-link  " id="side22">
       <span className="myside"> <i className="far fa-user" />
       DRF</span></a>
    </li>
    <li className="nav-item active " id="side3"  onClick={()=>{this.role(2)}}>
    <a className="nav-link" id="side33" >
       <span className="myside"> <i className="far fa-user" />
        Role Master </span></a>
    </li>
    <li className="nav-item active" id="side4" onClick={()=>{this.report(3)}}>
    <a className="nav-link" id="side44" >
        <span className="myside"><i className="far fa-user" />
      Home</span></a>
    </li>
    <li className="nav-item active" id="side5" onClick={()=>{this.smart(4)}}>
    <a className="nav-link"id="side55" >
       <span className="myside"> <i className="far fa-user" />
        Smart Data</span>
        </a>
    </li>
    <li className="nav-item active" id="side7" onClick={()=>{this.newDetails22(6)}}>
    <a className="nav-link"id="side77" >
       <span className="myside"> <i className="far fa-user" />
        Add Fields</span>
        </a>
    </li> */}
    <hr className="sidebar-divider d-none d-md-block" />
    <div className="text-center d-none d-md-inline dwn-btn">
      <button className="rounded-circle border-0" id="sidebarToggle" />
    </div>
  </ul>
</div>
);

 }   }
 export default SideBar;