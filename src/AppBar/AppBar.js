import React,{useState} from 'react';
import axios from "axios";
import './style.css';
import i from '../image/turn-off.svg';
import history from '../History';

export default class AppBar extends React.Component{

  active="tab-pane fade show active"
   noactive="tab-pane fade"
   active1="nav-item nav-link active "
   noactive1="nav-item nav-link"
  
  constructor(props){
    super(props)
        this.state={
        }
      }
  //  const [open,setOpen] = useState(true);
  change=()=>{
    
     this.props.Open()
     
   }


   callapi=()=>{
       
  



    let unique_id=localStorage.getItem("unique_id","")
     let email=localStorage.getItem("email","")
    
     let api = `https://smarticuapi.fourbrick.in:5053/session?name=${email}&browserId=${unique_id}`;
          axios.get(api)
        .then((response)=> {
          // handle success
             
          
          console.log("unique",response.data.status)
       
         if(response.data.status!="true"){

          localStorage.removeItem("login")
          localStorage.clear()
          history.push('/')
          window.location.reload();

         }
       
      
    
        
      })
      .catch( (error)=> {
        // handle error
        
        
      })
    
    
    
     
        
      }

        
  componentDidMount(){
    this. callapi()}
   render()
{


    return(
        <nav className="navbar navbar-expand navbar-light topbar mb-4 new-background-color border-bt">
        {/* Sidebar Toggle (Topbar) */}

        <button  onClick={()=>{this.change()}} id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3 up-btn">
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
          {/* <li>     <div className="search-box">
              <span><i className="fa fa-search" aria-hidden="true" /></span>
              <input className="innr-inpt" type="text" name placeholder="search" />
            </div></li> */}
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
          {/* <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-bell fa-fw" />
            
            </a>
         
          </li> */}
          {/* Nav Item - Messages */}
          {/* <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-envelope fa-fw" />
              
            </a>
            
          </li> */}

       

          <div className="topbar-divider d-none d-sm-block" />
          {/* Nav Item - User Information */}

          <li className="nav-item dropdown no-arrow"   onClick={()=>{
            console.log("admin")
                   if(localStorage.getItem("user_type","")!="admin")
                    history.push('/profile')
                    // window.location.reload();


                  }} >
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small sp-c">Admin</span> */}
              <img className="img-profile rounded-circle" src={require("./user.png")} />
            
            </a></li>         
          <li className="nav-item dropdown no-arrow log-out">
            <a className="nav-link dropdown-toggle"  id="userDropdown" role="button"  onClick={()=>{
                    localStorage.removeItem("login")
                    localStorage.clear()
                    history.push('/')
                    window.location.reload();

                  }}  >
            
              <img className="img-profile small" src={i} />
        logout
            </a>
            {/* Dropdown - User Information */}
            <template>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
         
             <h5 className="modal-title" id="exampleModalLabel" style ={{textAlign:"center"}}>Ready to Leave?</h5>
              
              <div className="modal-footer1 logoutc">
                {/* <button className="btn btn-primary" id = "closemodal" type="button" data-dismiss="model" data-target="#">Cancel</button> */}
                <button   className="btn btn-primary"
                style = {{backgroundColor:"#9b2812",border:"none",color:"#ffffff"}}  onClick={()=>{
                    localStorage.removeItem("login")
                    history.push('/')
                    window.location.reload();

                  }} 
                  >Logout</button>
              </div>
             
            </div>
            </template>
          </li>
        </ul>
      </nav>
     
     
    )}
}