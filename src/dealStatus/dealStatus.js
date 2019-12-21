import React from 'react';
import AppBar from '../AppBar/AppBar'
import SideBar from '../AppBar/Sidebar/SideBar'
import {PopupStyled} from '../Drf/PopupStyled';
import axios from 'axios';
class DealStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data11:""
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
      report=()=>{
        this.props.history.push("/status")
      }

      componentDidMount(){
        axios.get("http://134.209.153.34:5004/all_deal?email=prashant@gmail.com")
       
   .then((res) => {
    if(res && res.status === 200){
this.setState({data11:Object.values(res.data.data)[0]})

    }
   })

  
      }
    render() {
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        this.props.history.push("/")
      }
      return (
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
                  {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Report</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
                  </div> */}
              
                  <template />
                  <template />
                </div>
                <PopupStyled>
              <div className="modal-header">
               <h6>Deal status</h6>
              
              </div>
             
              <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="wrp-tab">
              <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#property1" role="tab" aria-controls="nav-home" aria-selected="true">All Deal</a>
                  <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#property2" role="tab" aria-controls="nav-profile" aria-selected="false" >Approved Deal</a>
                  <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#property3" role="tab" aria-controls="nav-contact" aria-selected="false">Pending Deal</a>
                  <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#property4" role="tab" aria-controls="nav-momcontact" aria-selected="false">MoM Data</a>
</div>
              </nav>
              <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                <div className="tab-pane fade show active" id="property1" role="tabpanel" aria-labelledby="nav-home-tab">
         
                 
                      
                  <div className="row">
                  
     
{ Array.isArray(this.state.data11["Approved"])   ? 
    this.state.data11["Approved"].map((item,j)=>{
      
        let aaa = Object.keys(item)
        let nnn = aaa.length
        
for(var i=0;i<nnn;i++){
  return( <div className="col-sm-4 col-md-4">
  <div className="invest-hading" >
    <h2>{aaa[i]}</h2>
   
    <p>000000</p>
    
  </div>
  </div>)
}





        
        
// return(
//                   <div className="col-sm-4 col-md-4">
//                   <div className="invest-hading" >
//                     <h2>item</h2>
                   
//                     <p>000000</p>
                    
//                   </div>
//                   </div>)
                }):null}
                  
                                      
                                    </div>
                                    <div className="row">
                  
     

                  <div className="col-sm-4 col-md-4">
                  <div className="invest-hading" >
                    <h2>item</h2>
                   
                    <p>000000</p>
                    
                  </div>
                  </div>
                  
                                      
                                    </div>
                                    <div className="row">
                  
     

                  <div className="col-sm-4 col-md-4">
                  <div className="invest-hading" >
                    <h2>item</h2>
                   
                    <p>000000</p>
                    
                  </div>
                  </div>
                  
                                      
                                    </div>
                </div>
                <div className="tab-pane fade" id="property2" role="tabpanel" aria-labelledby="nav-profile-tab">
                
                  
                  <div className="row">
                  
     

<div className="col-sm-4 col-md-4">
<div className="invest-hading" >
  <h2>item+":"</h2>
 
  <p>000000</p>
  
</div>
</div>

                    
                  </div>
                 
                
                </div>

                <div className="tab-pane fade" id="property3" role="tabpanel" aria-labelledby="nav-contact">
                
                  
                <div className="row">
                
   

<div className="col-sm-4 col-md-4">
<div className="invest-hading" >
<h2>item3</h2>

<p>000000</p>

</div>
</div>

                  
                </div>
               
              
              </div>
               
               



              </div>
            </div>
          </div>
        </div>
      </div>
              </PopupStyled>
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
      );
    }
  };


  export default DealStatus;