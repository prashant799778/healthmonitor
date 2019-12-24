import React from 'react';
import axios from 'axios';
import  {DetailStyled}  from './DetailStyled'
import Grabh from "../Report/grabh"
import backImg from "./image/backimg.png" 
class Detail extends React.Component{

    constructor(){
      super()
    
    
      this.state = {   
         spo2:"-- -- --",
         plsRate:"-- -- --",
         heartRate:"-- -- --",
         rsp:"-- -- --",
         nibp_low:"-- -- --",
         nibp_high:"-- -- --",
         temp:"-- -- --",
         resp:"",
          id:"",
          user:""
    
      }
    
    }

      componentDidMount() {
        if(this.props.client!=""){
    if(this.props.client.connected){
        console.log("messageOne","connect"+this.props.currentTopic)
      this.props.client.subscribe(this.props.currentTopic,  (err)=> {
        console.log("messageOne",err)
        if (!err) {
          console.log("messageOne",err)
          // client.publish('/t1', '')
        }
      })}

     
      this.props.client.on('message', (topic, message) =>{
          // message is Buffer

          if(this.props.currentTopic===topic)
          if(message){
       
            console.log("messageOne1", message.toString()  )
            let jsn=   JSON.parse(message.toString())
            
            this.setState({
             
                temp:(jsn.hasOwnProperty("TEMP")  && jsn.TEMP!=="" )?jsn.TEMP:this.state.temp,
                 id:jsn.PatientId,
                 user:jsn.usercreate,
                 resp:jsn.RESP,
                 spo2: (jsn.hasOwnProperty("SPO2")  && jsn.SPO2.hasOwnProperty('SPO2')  &&  jsn.SPO2['SPO2']!==""  && jsn.SPO2['SPO2']!=127)?jsn.SPO2['SPO2']:this.state.spo2,
                 plsRate:  (jsn.hasOwnProperty("SPO2")   && jsn.SPO2.hasOwnProperty('Pulse Rate')  &&  jsn.SPO2['Pulse Rate']!=="" &&  jsn.SPO2['Pulse Rate']!=255)?jsn.SPO2['Pulse Rate']:this.state. plsRate,
                 heartRate:  (jsn.hasOwnProperty('ECG') && jsn.ECG.hasOwnProperty("Heart Rate")  &&  jsn.ECG["Heart Rate"]!=="")?jsn.ECG["Heart Rate"]:this.state.heartRate,
                  rsp: (jsn.hasOwnProperty('ECG')  && jsn.ECG.hasOwnProperty("Resp Rate")  &&  jsn.ECG["Resp Rate"]!=="")?jsn.ECG["Resp Rate"]:this.state.rsp,
                   nibp_high:(jsn.hasOwnProperty('NIBP')  &&  jsn.NIBP.hasOwnProperty("High") &&  jsn.NIBP["High"]!=="")?jsn.NIBP["High"]:this.state.nibp_high,
                  nibp_low: (jsn.hasOwnProperty('NIBP')  && jsn.NIBP.hasOwnProperty("Low")   &&  jsn.NIBP["Low"]!=="")?jsn.NIBP["Low"]:this.state.nibp_low,
             })
            
            

         
          
          
          }
        })
    }

   }


 

      render(){

        let item=this.props.currentinnerItem  ;

        console.log("detail",item)
return(<DetailStyled>
    
    <div className="container-box innr-card-bg-color">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="uppr-box-card">
                <h2 className="hading-up">home - <span>Patient Details</span></h2>
              </div>
              <div className="wrap-patient" style={{backgroundImage: 'url('+backImg+')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      
      }} >
                <div className="patient-detail">
                  <div className="patient-info border-bottomm">
                  <h2 className="patient-hading" onClick={()=>{this.props.goBack()}} style={{cursor: 'pointer'}}><font color="green">Go Back</font></h2>
                    <h2 className="patient-hading">{item.PatientName}</h2>
<h2 className="patient-hading">{'BloodGroup : '+ item.BloodGroup}</h2>
<h2 className="patient-hading">{'Address : '+item.Address}</h2>
                    <h2 className="patient-hading">{'Bed No : '+ item.Bed_Number}</h2>
                  </div>
                  <div className="patient-box-crd">
                    <div className="patient-box-1">
                      <div className="innr-patient height-box">
                        <h2 className="green-clr">ECG</h2>

                        <Grabh tc="#78A960"  tt="" data={this.state.heartRate!="-- -- --"?this.state.heartRate:0} id="asd"></Grabh>
                      </div>
                      <div className="innr-patient height-box">
                        <h2 className="red-clr">SP02</h2>
                        
  <Grabh tc="#E4352C" tt="" data={this.state.spo2!="-- -- --"?this.state.spo2:0} id="def"></Grabh>
                      </div>
                      <div className="innr-patient height-box rem-boder">
                        <h2 className="orange-clr">RESP</h2>
                        <Grabh  tc="#F0AF19" tt="" data={this.state.rsp!="-- -- --"?this.state.rsp:0}  id="jkl"></Grabh>
                      </div>
                    </div>
                    <div className="patient-box-1">
                      <div className="innr-patient">
                        <h2 className="green-clr">HR (bpm)</h2>
                        <p className="green-clr">{this.state.heartRate}</p>
                      </div>
                      <div className="innr-patient">
                        <h2 className="gray-clr">NIBP (mmHg)</h2>
                        <p className="gray-clr">{this.state.nibp_high+"/"+this.state.nibp_low}</p>
                      </div>
                      <div className="rap-innr-patient">
                        <div className="innr-patient">
                          <h2 className="red-clr">SP02(%)</h2>
                          <p className="red-clr">{this.state.spo2}</p>
                        </div>
                        <div className="innr-patient">
                          <h2 className="red-clr">Pulse Rate(bpm)</h2>
                          <p className="red-clr">{this.state.plsRate}</p>
                        </div>
                      </div>
                      <div className="innr-patient">
                        <h2 className="gray-clr">Temp(o C)</h2>
                        <p className="gray-clr">{this.state.temp}</p>
                      </div>
                      <div className="innr-patient">
                        <h2 className="orange-clr">RESP(brpm)</h2>
                        <p className="orange-clr">{this.state.rsp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    
    
    
    
    </DetailStyled>


)

      }}
      export default Detail;