import React from 'react';
import axios from 'axios';
import moment   from 'moment';
import AppBar from '../AppBar/AppBar';
import SideBar from '../AppBar/Sidebar/SideBar';
import {StyledDrf} from './styledDrf';
import { PopupStyled } from './PopupStyled';
import 'font-awesome/css/font-awesome.min.css';
import MoM from './Mom';
import history from '../History'
import DropDown from './dropDown/dropdown';
import { PropStyled } from './propstyled';
import PropFactor from './PropFactor'
import PanelData from './PanelData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { saveAs } from 'file-saver';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

// import './drf.css';
// function download(){
//   const blob = new Blob(['This is a new File'],{type:"text/plain"})
  
// }


 

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

class Drf extends React.Component{

  active="tab-pane fade show active"
   noactive="tab-pane fade"
   active1="nav-item nav-link active "
   noactive1="nav-item nav-link"
  
  constructor(){
    super()
        this.state={
           drfList:'',
           title:'',
           detail:'',
           title1:'',
           title2:'',
           detail1:{},
           detail2:'',
           infoState:1,picture:[],report:"",
           wantEdit: false,
           clusterId:"",
          //  yeardata:[],
          propvalue:"100%",
          dealName:"",
          propValue:"100",
          clusterId1:" ",
          dealId:"",
          paneldata:"",
          propF:"",isEditBar:true,
          blank:""
          
        
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
      report=()=>{
        this.props.history.push("/add2")
      }



      selectHandler=(e)=>{
        this.setState({dealName:e.target.value})
    
    }
    inputHandler=(e)=>{
        this.setState({propValue:e.target.value})
    }
    submitHandler=(e)=>{
        e.preventDefault()
        
    }


   

editHandler=(e)=>{
this.setState({wantEdit:!this.state.wantEdit},()=>{
 
})


}
closeHandler = (e)=>{
  
  var element = document.getElementById('nav-home-tab');
  element.classList.add("active")
  var elementP1 = document.getElementById('property1');
  elementP1.classList.add("show" ,"active")
  this.setState({wantEdit:false})
  var element1 = document.getElementById("nav-profile-tab");
  element1.classList.remove("active");
  
  var element2 = document.getElementById("nav-contact-tab");
  element2.classList.remove("active");
  var element3 = document.getElementById("nav-contact-tab1");
  element3.classList.remove("active");
  var element4 = document.getElementById("nav-contact-tab2");
  element4.classList.remove("active");
  var element5 = document.getElementById("nav-contact-tab3");
  element5.classList.remove("active");
  var elementP2 = document.getElementById('property2');
  elementP2.classList.remove("active")
  var elementP3 = document.getElementById('property3');
  elementP3.classList.remove("active")
  var elementP4 = document.getElementById('property4');
  elementP4.classList.remove("active")
  var elementP5 = document.getElementById('property5');
  elementP5.classList.remove("active")
  var elementP6 = document.getElementById('property6');
  elementP6.classList.remove("active")
}
findCluster=()=>{
  if(this.state.detail2 !== " "){
  
  this.setState({clusterId:this.state.detail2["Cluster ID"]},()=>{

  })
}

}
updateHandler =(e)=>{
  this.setState({wantEdit:false},()=>{
    
  })
}


panelApi=(dealId)=>{
  if(dealId !== null || dealId != undefined ){
  axios.get("http://134.209.153.34:5004/getpaneldata?deal_id="+dealId)
  .then((response)=> {
     if(response && response.data   && response.status === 200 && response.data["Panel Data"] != null ){
          this.setState({paneldata:response.data["Panel Data"],propF:response.data["Panel Data"]["Prop Factor"]},()=>{
              
             
          })
      }
     
 
  })}
}
get=(title1,title2,title,detail1,detail2,detail,dealId,picture,report)=>{
 
  
this.setState({title,detail,title1,detail1,title2,detail2,dealId:dealId,picture:picture,report:report},()=>{
  this.panelApi(this.state.dealId)
  this.momApi(this.state.detail2["Cluster ID"],this.state.dealId)
 
})


}



      componentDidMount(){
        this.callapi()
      
    
      }

      momApi=(id,id22)=>{
        
        let api="http://134.209.153.34:5004/getmomdata?clusterid="+id+"&deal_id="+id22

         axios.get(api)
       .then((response)=> {
         // handle success
          
         if(response && response.data && response.data.status !== "false"
          // &&  Array.isArray(response.data.result) && response.statusText=="OK"
          ){
           this.setState({clustList:response.data["result"]},()=>{
             
            
           })
            


         }else{
          this.setState({clustList:[]})
         }
       
        
       })
       .catch( (error)=> {
         // handle error
         this.setState({isLogin:false,err:'connection error!'})
        
       })
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
         
         }) }
         newProp=(dataFromProp,id)=>{
          if(dataFromProp == ""){
            alert("Please,Modify the prop value")
                       }
          else {
           this.propApi(dataFromProp,id)
           
          this.callapi()
           
                       }

         }
         propApi = (pro,id)=>{
         
           
          axios.get("http://134.209.153.34:5004/PropFactor?propfactor="+pro+"&deal_id="+id)
          .then((response)=> {
             if(response && response.data != 0   && response.status === 200){
                  this.setState({paneldata:response.data,deal:response.data["Deal Id"],prop:response.data["Prop Factor"]},()=>{
                      
                      alert("Prop Factor Updated Successfully")
              
                      this.panelApi(id)
                      this.momApi(this.state.detail2["Cluster ID"],id)
                      
                  })
              }
              else
              {
                alert("Something went wrong.")
              }
         
          })
          .catch((err)=>{
  
          })
          
      }
  blankProp=()=>{
    this.setState({blank:"",isEditBar:true})
  }
  blankProp2=()=>{
    this.setState({blank:"",isEditBar:false})
  }
  blankProp1=()=>{
    this.setState({blank:"1",isEditBar:false})
    
  }
   
  dwnldFile=(item)=>{
    var FileSaver = require('file-saver');
    FileSaver.saveAs("http://134.209.153.34:5004"+item[0],Object.values(item[1]));
  
    
  }
  
    render() {
      
      var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        history.push('/')
      }
let drfs=[]

if(this.state.drfList!=""){
  drfs=this.state.drfList;
}

// if(this.state.drfList === ""){
//   return(
// 	  <Loader
// 	     type="Puff"
// 	     color="#00BFFF"
// 	     height={100}
// 	     width={100}
// 	     timeout={3000} //3 secs

// 	  />
// 	 );
// }

    return(
      <StyledDrf>
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
               <AppBar Open={this.props.Open}></AppBar>
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex justify-content-between drf-list-had">
                        <h2 className="m-0 text-black">drf listing</h2>
                        
                      </div>
                      <div className="card-body drf-vi">
                        <div className="table-responsive-sm">
                          <table id="example" className="table table-striped table-bordered innr-table" style={{width: '100%'}}>
                            <thead>
                              <tr>
                                
                               <th>BD</th>
                                <th>Deal ID</th> 
                                <th>Raise Date & Time</th>
                                <th>Property Name</th>
                                <th>RaiseTo</th>
                                
                               
                                <th>Status</th>
                               
                               
                                <th>Details</th>
                              </tr>
                            </thead>
                            <tbody>
{/* <tr></tr> */}
                              {this.state.drfList !== ""?
drfs.map((item,i)=>{
  return( <tr>
    <td style={{textTransform:"lowercase"}}>{item.email}</td>
    <td>
{item["Deal ID"]}
    </td>
    <td>{moment(item.datecreate).format('DD/MM/YYYY hh:mm:ss')}</td>

<td>
    {item.Property_And_Owner_Info["Property Name"]}
    </td>
<td className = "autho" style={{textTransform:"lowercase"}}><span>{Array.isArray(item["Approving Authority"]) ? item["Approving Authority"].toString(): null}</span></td>

 
    
    
<td className="status">
      
      {item.status==1 ? <p style={{ background: "#7bbe84",border: "1px solid #7bbe84",textAlign:"center"}} >Approved</p> : item.status==0 ? <p style={{ background: "#d27260",border: "1px solid #d27260",textAlign:"center"}}>Pending</p>: null }
    </td>
    <td>
      <button   onClick={()=>{this.get("property basic detail","property and owner info","inverstment and finance",
        item.Property_Basic_Details,item.Property_And_Owner_Info,item.Investment_Info,item["Deal ID"],item["Filename"],item["Upload Report"])
        }}type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        view
      </button>
    </td>
    
  </tr>)
})


                              : 
                              <div className="loader" style={{marginLeft:"300%"}}>
                              <Loader
	     type="ThreeDots"
	     color="#9b2812"
	     height={80}
	     width={80}
	      //3 secs
        timeout={10000}
	  /> 

    

    </div>}
    <span style={{color:"red"}}>{this.state.err}</span> 
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
       
        {/* Modal */}
        <div className="modal fade tbs-st"  data-backdrop="static" data-keyboard="false" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{padding:"0px"}}>
          <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: "1200px"}}>
            <div className="modal-content" style={{position:"absolute",top:"0"}}>
            <PopupStyled>
              <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLongTitle">details</h5> */}

             {this.state.isEditBar &&   <button className="edit-bt" onClick = {this.editHandler}>
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>}
                
                <button type="button" className="close" id="closeId" data-dismiss="modal" onClick = {this.closeHandler} aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              
              </div>
             
              <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="wrp-tab">
              <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a className={this.active1} default id="nav-home-tab" data-toggle="tab" href="#property1" role="tab" aria-controls="nav-home" 
                  aria-selected="true" 
                  onClick={this.blankProp}>Property Basic Detail</a>
                  <a className={this.noactive1} id="nav-profile-tab" data-toggle="tab" href="#property2" role="tab" 
                  onClick={this.blankProp} aria-controls="nav-profile"
                    aria-selected="false" >Property and Owner Info</a>
                  <a className={this.noactive1}id="nav-contact-tab" data-toggle="tab" href="#property3" role="tab" aria-controls="nav-contact" 
                  aria-selected="false" onClick={this.blankProp}
                  >Investment and Finance</a>
                  <a className={this.noactive1} id="nav-contact-tab2" data-toggle="tab" href="#property4" role="tab" aria-controls="nav-momcontact"
                    aria-selected="false" 
                  onClick={this.blankProp2} >MoM Data</a>

                  <a className={this.noactive1} id="nav-contact-tab3" data-toggle="tab" href="#property5" role="tab" aria-controls="nav-panel"
                  onClick={this.blankProp2} >Panel View</a>

                  <a className={this.noactive1} id="nav-contact-tab1" data-toggle="tab" href="#property6" role="tab" aria-controls="nav-momcprop"
                  onClick={this.blankProp1} aria-selected="false" >Prop Factor</a>
                </div>
              </nav>
              <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                <div className={this.active} id="property1" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div className="row">
                 
                  {Object.keys(this.state.detail1!==""?this.state.detail1:{}).map((item,i)=>{
         
if(item !== "YearData" && item !== "Property Picture Link" && item !== "Upload Report"
){

return(


<div className="col-sm-4 col-md-4 spc-rw">
  
<div className="invest-hading" id={i}>
  <h2>{item+":"}</h2>
  
  {this.state.wantEdit ? <input defaultValue = {this.state.detail1[item]} onChange={(e)=>{
this.setState({[item]:e.target.value})}}/>
  :<p>{this.state.detail1[item]}</p>}
</div>
</div>
)}

  })}
  {
    this.state.report != ""  &&  this.state.report != undefined ?   
    <div className="col-sm-4 col-md-4 spc-rw">
  
<div className="invest-hading" id="report">
  <h2>{"Report:"}</h2>
    <p><button className="dwnld" onClick={()=>{this.dwnldFile(this.state.report)}} download>
      
      {Object.values(this.state.report[1])}</button></p>
  
 
</div>
</div>
 : null }
  
  </div>
  <div className="row" >

{
Object.keys(this.state.detail1!==""?this.state.detail1:{}).map((item,i)=>{

if(item === "YearData"){ 
 let yeardata = Object.values(this.state.detail1[item])
 
 let yearb = Object.keys(this.state.detail1[item])

  return (

     yeardata.map((data,j)=>{
       
       
       return(
      <div className="col-sm-4 col-md-4 yar-dat">
      <div className="invest-hading" id="88">
        <h1>{yearb[j]}</h1>
      <ul className="year-data">
        <li>
        <span>January</span>
     

        {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.January} onChange={(e)=>{
          
this.setState({"January":e.target.value})}}  type="number"/>
  :<p>{data.January}</p>}
        </li>
        <li>
          <span>February</span>
     
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.February} onChange={(e)=>{
this.setState({"February":e.target.value})}} type="number"/> 
  :<p>{data.February}</p>}
        </li>
        <li>
          <span>March</span>
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.March} onChange={(e)=>{
this.setState({"March":e.target.value})}}/> 
  :<p>{data.March}</p>}
        </li>
        <li>
          <span>April</span>
     
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.April} onChange={(e)=>{
this.setState({"April":e.target.value})}}/>
  :<p>{data.April}</p>}
        </li>
        <li>
          <span>May</span>
      
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.May} onChange={(e)=>{
this.setState({"May":e.target.value})}}/> 
  :<p>{data.May}</p>}
        </li>
        <li>
          <span>June</span>
         
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.June} onChange={(e)=>{
this.setState({"June":e.target.value})}}/> 
  :<p>{data.June}</p>}
        </li>
        <li>
          <span>July</span>
       
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.July} onChange={(e)=>{
this.setState({"July":e.target.value})}}  type="number"/>
  :<p>{data.July}</p>}
        </li>
        <li>
          <span>August</span>
    
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.August} onChange={(e)=>{
this.setState({"August":e.target.value})}}/>
  :<p>{data.August}</p>}
        </li>
        <li>
          <span>September</span>
         
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.September} onChange={(e)=>{
this.setState({"September":e.target.value})}}/>
  :<p>{data.September}</p>}
        </li>
        <li>
          <span>October</span>
          
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.October} onChange={(e)=>{
this.setState({"October":e.target.value})}}/> 
  :<p>{data.October}</p>}
        </li>
        <li>
          <span>November</span>
          
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.November} onChange={(e)=>{
this.setState({"November":e.target.value})}}/>
  :<p>{data.November}</p>}
        </li>
        <li>
          <span>December</span>
         
          {this.state.wantEdit ? <input className= "input-box" defaultValue = {data.December} onChange={(e)=>{
            
this.setState({"December":e.target.value})}}/> 
  :<p>{data.December}</p>}
        </li>
      </ul>
        </div></div>
        )

    }) 
    


)
  }


})}
                 
                   
                  </div>
                 
                    
      

                  {this.state.wantEdit === true &&
              <button className="update-btn" onClick = {this.updateHandler}>
                 Update
                </button>}
                <br />
                </div>
                <div className={this.noactive} id="property2" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div className="row">
                  
                  {Object.keys(this.state.detail2!=""?this.state.detail2:{}).map((item,i)=>{

return(

<div className="col-sm-4 col-md-4">
<div className="invest-hading" id={i}>
  <h2>{item+":"}</h2>
 
  {this.state.wantEdit ? <input defaultValue = {this.state.detail2[item]}  onChange={(e)=>{
this.setState({item:e.target.value})


  }}/>
  :<p>{this.state.detail2[item]}</p>}
  
</div>
</div>
)
})}

 

                  </div>
                  <br />
            
            {this.state.picture.length !== 0  ?  
            <div className="property">
             
              <p className="propar">Property Pictures</p>    
            <div className="img-car">
           

<Slider {...settings}>
{
                  Array.isArray(this.state.picture) ? this.state.picture.map((item22,i)=>{

var item1 = "http://134.209.153.34:5004"+item22

  return (
  
    <div >
  
      <img className = "img-car" src={item1} id = {i+1} alt= ""/>
    </div>  

  )
}
): <span></span>} 

</Slider>
            </div>
              </div> :null}
          <br/>
                  {this.state.wantEdit === true &&
              <button className="update-btn" onClick = {this.updateHandler}>
                 Update
                </button>}
                </div>
          
                <div className={this.noactive} id="property3" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <div className="row">


                  {Object.keys(this.state.detail!=""?this.state.detail:{}).map((item,i)=>{

return(


<div className="col-sm-4 col-md-4">
<div className="invest-hading" id={i}>
  <h2>{item+":"}</h2>
  
  {this.state.wantEdit ? <input defaultValue = {this.state.detail[item]}

   onChange={(e)=>{
    this.setState({[item]:e.target.value})
    
    
      }} />
  :<p>{this.state.detail[item]}</p>}
</div>
</div>
)
})}
                
                   
                
                  </div>
                  <br/>
                  {this.state.wantEdit === true &&
              <button  className="update-btn" onClick = {this.updateHandler}>
                 Update
                </button>}
                </div>
                <div className={this.noactive} id="property4" role="tabpanel" aria-labelledby="nav-momcontact-tab">
                
                  <MoM  clustList1 = {this.state.clustList} />
                  <br />
                </div>
                <div className={this.noactive} id="property5" role="tabpanel" aria-labelledby="nav-panel">
                <div>
                  <PanelData paneldata = {this.state.paneldata} />
                  <br />
                </div>
              </div>



              <div className={this.noactive} id="property6" role="tabpanel" aria-labelledby="nav-momcprop">
             <PropFactor dealId = {this.state.dealId} propF = {this.state.propF} click={this.newProp} blank={this.state.blank}/>
              
             <br />
              </div>
        
              </div>
            </div>
          </div>
        </div>
      </div>
              </PopupStyled>
              <div className="modal-footer">
              
                {/* <button type="button" className="btn btn-primary">ok</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </StyledDrf>

    );


    }}


    export default Drf;