import React from 'react';
import axios from 'axios';
import moment   from 'moment';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar';
import history from '../History';

class Drf extends React.Component{

  constructor(){
    super()
        this.state={
           drfList:'',
           title:'',
           detail:'',
        isState:1,
        }
  }
    dash=()=>{
        history.push("/home")
      }
      user=()=>{
        history.push("/drfs")
      }
      drf=()=>{
        history.push("/drf")
      }
      role=()=>{
        history.push("/role")
      }
      report=()=>{
        history.push("/report")
      }


get=(title,detail)=>{

  

  this.setState({title,detail})
}



      componentDidMount(){
        this.callapi()
      }
         
         callapi=()=>{
         
          let api="http://134.209.153.34:5004/DrfData"
           axios.get(api)
         .then((response)=> {
           // handle success
            
          
           if(response){
             if(response && response.data && response.data.data && response.data.data[0] && response.data.status==="true"){
         
          
              this.setState({drfList:response.data.data})
             }else{
             
               
             }
           }
       
         })
         .catch( (error)=> {
           // handle error
           this.setState({isLogin:false,err:'connection error!'})
          
         })
       
       
       
        
           
         }
   
    render() {

      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")==="ADMIN"){
        history.push("/user")

      }else if(localStorage.getItem("login","no")!=="yes"){

        history.push("/")
      }
let drfs=[]

if(this.state.drfList!==""){
  drfs=this.state.drfList;
}


    return(
        <div>
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div className="sidebar-brand-icon">
                <img src="img/oyo-rooms.svg" />
              </div>
              <div className="sidebar-brand-text mx-3">
                <img src="img/oyo-text.svg" />
              </div>
            </a>
            {/* Divider */}
            {/* Nav Item - Dashboard */}
            {/* <li className="nav-item active" onClick={()=>{this.dash()}}>
                <span className="nav-link" >
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span className="left-menu">Dashboard</span></span>
              </li> */}
              <li className="nav-item active" onClick={()=>{this.user()}}>
              <span className="nav-link" >
                  <i className="far fa-user" />
                  <span className="left-menu">Home</span></span>
              </li>
              {/* <li className="nav-item active" onClick={()=>{this.drf()}}>
              <span className="nav-link" >
                  <i className="far fa-user" />
                  <span className="left-menu">DRF</span></span>
              </li>
              <li className="nav-item active" onClick={()=>{this.role()}}>
              <span className="nav-link" >
                  <i className="far fa-user" />
                  <span className="left-menu">Role</span></span>
              </li>
              <li className="nav-item active" onClick={()=>{this.report()}}>
              <span className="nav-link" >
                  <i className="far fa-user" />
                  <span className="left-menu">Report</span></span>
              </li> */}
            <template />
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline dwn-btn">
              <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
          </ul>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top ">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3 up-btn">
                  <i className="fa fa-bars" />
                </button>
                {/* Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  {/*  <div class="input-group">
              <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div> */}
                </form>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - Search Dropdown (Visible Only XS) */}
                  <li>     <div className="search-box">
                      <span><i className="fa fa-search" aria-hidden="true" /></span>
                      <input className="innr-inpt" type="text" name placeholder="search" />
                    </div></li>
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-search fa-fw" />
                    </a>
                    {/* Dropdown - Messages */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  {/* Nav Item - Alerts */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-bell fa-fw" />
                     {/* Counter - Alerts *
                      <span className="badge badge-danger badge-counter">3+</span> */}
                    </a>
                    {/* Dropdown - Alerts */}
                    {/* <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                      <h6 className="dropdown-header">
                        Alerts Center
                      </h6>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 12, 2019</div>
                          <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 7, 2019</div>
                          $290.29 has been deposited into your account!
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 2, 2019</div>
                          Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                      </a>
                      <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                 */}
                
                  </li>
                  {/* Nav Item - Messages */}
                  <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw" />
                        {/* Counter - Messages 
                        <span className="badge badge-danger badge-counter">7</span> */}
                      </a>
                    {/* Dropdown - Messages */}
                    {/* <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                      <h6 className="dropdown-header">
                        Message Center
                      </h6>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                          <div className="small text-gray-500">Emily Fowler · 58m</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                          <div className="status-indicator" />
                        </div>
                        <div>
                          <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                          <div className="small text-gray-500">Jae Chun · 1d</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                          <div className="status-indicator bg-warning" />
                        </div>
                        <div>
                          <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                          <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div>
                          <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                          <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                      </a>
                      <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                   */}
                  </li>
                  <div className="topbar-divider d-none d-sm-block" />
                  {/* Nav Item - User Information */}
                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small sp-c">Admin</span> */}
                      <img className="img-profile rounded-circle" src="img/logo.PNG" />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                      {/* <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                      </a> */}
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
           
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex justify-content-between drf-list-had">
                        <h2 className="m-0 text-black">drf listing</h2>
                        {/*  <div class="icon-bx">
                <ul>
                  <li><a href="#">view all</a></li>
                  <li><i class="fas fa-chevron-down"></i></li>
                  <li><i class="fas fa-sync"></i></li>
                  <li><i class="fas fa-times"></i></li>
                </ul>
              </div> */}
                      </div>
                      <div className="card-body drf-vi">
                        <div className="table-responsive-sm">
                          <table id="example" className="table table-striped table-bordered innr-table" style={{width: '100%'}}>
                            <thead>
                              <tr>
                                <th>user</th>
                                <th>date</th>
                                <th>property basic detail</th>
                                <th>property and owner info</th>
                                <th>inverstment &amp; finance</th>
                               
                              </tr>
                            </thead>
                            <tbody>
<tr></tr>
                              {
drfs.map((item,i)=>{
  let d=localStorage.getItem("user","")
  let y=d===item.userid
   
  if(y!==true){
   return <tr></tr>
  }else{
    return( 
  
 
      <tr>
        <td>{item.userid}</td>
        <td>{moment(item.datecreate).format('DD/MM/YYYY hh:mm:ss')}</td>
        <td>
          <button  onClick={()=>{this.get("property basic detail",item.Property_Basic_Details)}}  type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            view
          </button>
        </td>
        <td>
          <button onClick={()=>{this.get("property and owner info",item.Property_And_Owner_Info)}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            view
          </button>
        </td>
        <td>
          <button   onClick={()=>{this.get("inverstment and finance",item.Investment_Info)}}type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            view
          </button>
        </td>
      </tr>)
  }
 
})


                              }
                             
                            </tbody>
                            {/* <tfoot>
                              <tr>
                                <th>user</th>
                                <th>date</th>
                                <th>property info</th>
                                <th>inverstment &amp; finance</th>
                                <th>owner info</th>
                              </tr>
                            </tfoot> */}
                          </table>
                        </div>
                        <template />
                      </div>
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
                <a className="btn btn-primary"  style={{color:"#ffffff"}} onClick={()=>{
                    localStorage.removeItem("login")
                  history.push("/")
                    window.location.reload();

                  }}>Logout</a>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{this.state.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="card-body drf-vi">
                        <div className="table-responsive-sm">
                          <table id="example" className="table table-striped table-bordered innr-table" style={{width: '100%'}}>
                            
{Object.keys(this.state.detail!==""?this.state.detail:{}).map((item,i)=>{

  return(

    <tr id={i}>
    <th>{item}</th>
    <td>{this.state.detail[item]}</td>
    
  </tr>
  )
})}


                            <tbody>
                              
                              
                              
                              </tbody></table></div></div>
              </div>
              <div className="modal-footer">
              <button type="button" className=" btn btn-primary  " data-dismiss="modal" aria-label="Close">
                 ok
                </button>
                {/* <button type="button" className="btn btn-primary">ok</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>


    )


    }}


    export default Drf;