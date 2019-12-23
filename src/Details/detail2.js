import React from 'react';
import axios from 'axios';
import  {DetailStyled}  from './DetailStyled'
import Grabh from "../Report/grabh"
import backImg from "./image/backimg.png" 
class Detail extends React.Component{

    constructor(){
      super()
    
    
      this.state = {
        ecg:"",
         spo:"",
         nibp:"",
         temp:"",
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
          if(message){
          console.log("messageOne",message.toString())
         
            let jsn=   JSON.parse(message.toString())

            this.setState({
             
                temp:jsn.TEMP,
                 id:jsn.PatientId,
                 user:jsn.usercreate,
                 resp:jsn.RESP
  
  
             },()=>{

                if(jsn && jsn.NIBP && jsn.NIBP["High"] &&  jsn.NIBP["High"]!=""  && jsn.NIBP["Low"] &&  jsn.NIBP["Low"]!=""){
                    this.setState({
                        temp:jsn.TEMP,
                       nibp:jsn.NIBP,
                    })
                    }
                    if(jsn && jsn.SPO2 && jsn.SPO2['SPO2']  &&  jsn.SPO2['SPO2']!=""  && jsn.SPO2['Pulse Rate'] &&  jsn.SPO2['Pulse Rate']!=""){
                       this.setState({
                        temp:jsn.TEMP,
                           spo:jsn.SPO2,
                       })
                       }
               
                       if(jsn && jsn.ECG && jsn.ECG["Heart Rate"]  &&  jsn.ECG["Heart Rate"]!=""  && jsn.ECG['Resp Rate'] &&  jsn.ECG['Resp Rate']!=""){
                           this.setState({
                            temp:jsn.TEMP,
                               ecg:jsn.ECG,
                           })
                           }
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

                        <Grabh tc="#78A960"  tt="" data={this.state.ecg['Heart Rate']?this.state.ecg['Heart Rate']:0} id="asd"></Grabh>
                      </div>
                      <div className="innr-patient height-box">
                        <h2 className="red-clr">SP02</h2>
                        
  <Grabh tc="#E4352C" tt="" data={this.state.spo['SPO2']?this.state.spo['SPO2']:0} id="def"></Grabh>
                      </div>
                      <div className="innr-patient height-box rem-boder">
                        <h2 className="orange-clr">RESP</h2>
                        <Grabh  tc="#F0AF19" tt="" data={this.state.ecg['Resp Rate']?this.state.ecg['Resp Rate']:0}  id="jkl"></Grabh>
                      </div>
                    </div>
                    <div className="patient-box-1">
                      <div className="innr-patient">
                        <h2 className="green-clr">HR (bpm)</h2>
                        <p className="green-clr">{this.state.ecg!=""?this.state.ecg["Heart Rate"]:"-- -- --"}</p>
                      </div>
                      <div className="innr-patient">
                        <h2 className="gray-clr">NIBP (mmHg)</h2>
                        <p className="gray-clr">{this.state.nibp!=""?this.state.nibp["High"]+"/"+this.state.nibp["Low"]:"--/--"}</p>
                      </div>
                      <div className="rap-innr-patient">
                        <div className="innr-patient">
                          <h2 className="red-clr">SP02(%)</h2>
                          <p className="red-clr">{this.state.spo['SPO2']?this.state.spo['SPO2']:"-- -- --"}</p>
                        </div>
                        <div className="innr-patient">
                          <h2 className="red-clr">Pulse Rate(bpm)</h2>
                          <p className="red-clr">{this.state.spo['Pulse Rate']?this.state.spo['Pulse Rate']:"-- -- --"}</p>
                        </div>
                      </div>
                      <div className="innr-patient">
                        <h2 className="gray-clr">Temp(o C)</h2>
                        <p className="gray-clr">{this.state.temp!=""?this.state.temp:"-- -- --"}</p>
                      </div>
                      <div className="innr-patient">
                        <h2 className="orange-clr">RESP(brpm)</h2>
                        <p className="orange-clr">{this.state.ecg!=""?this.state.ecg["Resp Rate"]:"-- -- --"}</p>
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