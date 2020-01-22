import React from 'react';
import axios from 'axios';

import Lines from './Lines';
import Grabh from "./grabh"

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {test:0,ECG:{},PatientName:"",PatientId:"",brand: "",temp:"",hr:"",nibp:"",spo:{},pr:"",temp:"",resp:""};
  }

componentDidMount() {
  // window.setInterval(() => {
  //   this.getData()
 
  // }, 1000)

}



getData=()=>{
  axios.get(`http://smarticuapi.fourbrick.in:5053/Patient_Vital_master_select`)
  .then(res => {
     
       console.log(res)
      if(res.data.status=="true"){
        let rs=res.data.result;
       

        this.setState({PatientName:rs.PatientName,  ECG:rs.ECG,
          DeviceMac:rs.DeviceMac,
        temp:rs.TEMP,nibp:rs.NIBP,spo:rs.SPO2,resp:rs.RESP,PatientId:rs.PatientId})


      }



  })
}
  render(){
    
  return (
    <React.Fragment >
   <p style={{color:"#FFFFFF"}}>Patient Name: {this.state.PatientName}</p>
<div className="container" style={{background:"#26293B"}}>
  <div className="row">
      
      
      
    


  <div className="col-12">
    <Grabh tc="#78A960"  tt="ECG" data={this.state.ECG['Heart Rate']?this.state.ECG['Heart Rate']:0} id={this.props.ecg}></Grabh>
  </div>
  <hr></hr>
  <div className="col-12">
  <Grabh tc="#E4352C" tt="SPO2" data={this.state.spo['SPO2']?this.state.spo['SPO2']:0} id={this.props.spo}></Grabh>
  </div>
  <hr></hr>
  <div className="col-12">
  <Grabh  tc="#F0AF19" tt="RESP" data={this.state.ECG['Resp Rate']?this.state.ECG['Resp Rate']:0}  id={this.props.rsp}></Grabh>
  </div>
  <hr></hr>


      </div></div>      


    </React.Fragment>
  );
} }

export default App;
