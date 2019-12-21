import React,{useState} from 'react';
import history from '../../History';
import '../style.css';
//  const myColor = (position)=>{
//   if (this.state.active === position) {
//     return "blue";
//   }
//   return "";
// };

 export default function rct(props){
//  const [color,setColor] = useState("#b12f16");

   let  dash=()=>{
     history.push("/home")
      }
      let    user=(position)=>{
      //   if (this.state.active === position) {
      //     this.setState({active : null})
      //   } else {
      //     this.setState({active : position})
      //   }
        history.push("/user")
        // document.getElementById('myside0').classList.add("changeColors");
        // setColor("#9b2812")
      }
     
      let    drf=(position)=>{
        // if (this.state.active === position) {
        //   this.setState({active : null})
        // } else {
        //   this.setState({active : position})
        // }
        // var side = document.getElementById("myside1")
        // side.classList.add("changeColors");
        // document.getElementById('myside0').classList.remove("changeColors");
        // setColor("#9b2812")
        history.push("/drf")
       
      }
      let    role=()=>{
        history.push("/role")
      }
      let    report=()=>{
      history.push("/report")
      }
      let    smart=()=>{
        history.push("/smart")
     }
  //    let    status=()=>{
  //     history.push("/status")
  //  }
   
return(
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    {/* Sidebar - Brand */}
    <a className="sidebar-brand d-flex align-items-center justify-content-center" >
      <div className="sidebar-brand-icon">
        <img src="img/oyo-rooms.svg" />
      </div>
      <div className="sidebar-brand-text mx-3">
        <img src="img/oyo-text.svg" />
      </div>
    </a>
    {/* Divider */}
    {/* Nav Item - Dashboard */}
    {/* <li className="nav-item active" onClick={()=>{dash()}}>
      <span className="nav-link" >
        <i className="fas fa-fw fa-tachometer-alt" />
        <span className="left-menu">Dashboard</span></span>
    </li> */}
    <li className="nav-item "      onClick={()=>{user()}}>
    <span className="nav-link active" >
        <i className="far fa-user" />
        <span className="left-menu">BD</span></span>
    </li>
    <li className="nav-item " onClick={()=>{drf()}}>
    <span className="nav-link"  >
        <i className="far fa-user" />
        <span className="left-menu">DRF</span></span>
    </li>
    <li className="nav-item " id="myside2" onClick={()=>{role()}}>
    <span className="nav-link"  >
        <i className="far fa-user" />
        <span className="left-menu">Role Master</span></span>
    </li>
    <li className="nav-item " id="myside3" onClick={()=>{report()}} >
    <span className="nav-link" >
        <i className="far fa-user" />
        <span className="left-menu">Report</span></span>
    </li>
    <li className="nav-item  sudo" id="myside4" onClick={()=>{smart()}}>
    <span className="nav-link" >
        <i className="far fa-user" />
        <span className="left-menu">Smart Data</span></span>
    </li>
    {/* <li className="nav-item active" onClick={()=>{status()}}>
    <span className="nav-link" >
        <i className="far fa-user" />
        <span className="left-menu">Deal Status</span></span>
    </li> */}
    <template />


    {/* add side bar */}

    <li>
          <a href>
            <img src="image/home.svg" />dashboard
          </a>
        </li>
        <li>
          <a href>
            <img src="image/hub.svg" />hubs
          </a>
        </li>
        <li>
          <a href>
            <img src="image/hospital.svg" />hospital
          </a>
        </li>
        <li>
          <a href>
            <img src="image/doctor.svg" />doctor
          </a>
        </li>
        <li>
          <a href>
            <img src="image/patient.svg" />patients
          </a>
        </li>

    {/* End Side bar */}








    {/* Divider */}
    <hr className="sidebar-divider d-none d-md-block" />
    {/* Sidebar Toggler (Sidebar) */}
    <div className="text-center d-none d-md-inline dwn-btn">
      <button className="rounded-circle border-0" id="sidebarToggle" />
    </div>
  </ul>
 
 

);

 }





