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
  axios.get(`https://smarticuapi.fourbrick.in:5053/Patient_Vital_master_select`)
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
    console.log(this.state.spo)
  return (
    <React.Fragment >
   <p style={{color:"#FFFFFF"}}>Patient Name: {this.state.PatientName}</p>
<div className="container" style={{background:"#000000"}}>
  <div className="row">
    <div className="col-8">
<div className="row">
  <div className="col-12">
    <Grabh tc="#78A960"  tt="ECG" data={this.state.ECG['Heart Rate']?this.state.ECG['Heart Rate']:0} id="asd"></Grabh>
  </div>
  <hr></hr>
  <div className="col-12">
  <Grabh tc="#E4352C" tt="SPO2" data={this.state.spo['SPO2']?this.state.spo['SPO2']:0} id="bsd"></Grabh>
  </div>
  <hr></hr>
  <div className="col-12">
  <Grabh  tc="#F0AF19" tt="RESP" data={this.state.ECG['Resp Rate']?this.state.ECG['Resp Rate']:0}  id="csd"></Grabh>
  </div>
  <hr></hr>
</div>
    </div>
    <div className="col-4">
    <div className="col-12">
    <h3 style={{color:"#78A960"}}>HR(bpm)</h3>
  <h3 style={{color:"#78A960"}}>{this.state.ECG['Heart Rate']?this.state.ECG['Heart Rate']:"--"}</h3>


    </div>
    <div className="col-12">
    <h3 style={{color:"#FFFFFF"}}>NIBP(mmHg)</h3>
  <h3 style={{color:"#FFFFFF"}}>{this.state.nibp.High?this.state.nibp.High:"--"}/{this.state.nibp.Low?this.state.nibp.Low:"--"}</h3>
    </div>
    <div className="col-12">
    <h3 style={{color:"#E4352C"}}>SPO2(%)</h3>
    <h3 style={{color:"#E4352C"}}>{this.state.spo['SPO2']?this.state.spo['SPO2']:"--"}</h3>
    <h3 style={{color:"#E4352C"}}>PR(bPm)</h3>
    <h3 style={{color:"#E4352C"}}>{this.state.spo['Pulse Rate']?this.state.spo['Pulse Rate']:"--"}</h3>
    </div>
    <div className="col-12">
    <h3   style={{color:"#FFFFFF"}} >Temp(celcius)</h3>
  <h3 style={{color:"#FFFFFF"}}>{this.state.temp?this.state.temp:"--"}</h3>


    </div>
    <div className="col-12">
    <h3 style={{color:"#F0AF19"}}>RESP(bpm)</h3>
    <h3 style={{color:"#F0AF19"}}>{this.state.ECG['Resp Rate']?this.state.ECG['Resp Rate']:"--"}</h3>


    </div>
    </div>
  </div>
</div>

    </React.Fragment>
  );
} }

export default App;
