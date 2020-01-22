import React from 'react';
import axios from 'axios';
import  {DetailStyled}  from './DetailStyled'
import Grabh from "../Report/grabh"
import ECG from "./ecgs"
import  RESP  from "./resp"
import SPO from "./spo"
import backImg from "./image/backimg.png"
import alertimg from "./image/alrt.gif" 
class Detail extends React.Component{
  client=""
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
          user:"",
         

          w_ecg:0,
          w_spo:0,
          w_resp:0,

          client1 :"",

          isAlert:false,
          alertText:"patient Temparature is low  !!"
    
      }
    
    }


    byteArrayToLong =(array)=> {
      var view = new DataView(new ArrayBuffer(8));
      array.forEach(function (b, i) {
          view.setUint8(i, b);
      });
      return view.getUint8(0);
  }


    subscribeForWave=(type)=>{

    }
  
      componentDidMount() {


        let  Omqtt1 = require('mqtt')
        let  Oclient1  = Omqtt1.connect('wss://smarticumqtt.fourbrick.in:9001')
        this.client=Oclient1
          Oclient1.on('connect', ( ) =>{
                Oclient1.subscribe(this.props.currentTopic +"",  (err)=> {
                  console.log("Omessage1",this.props.currentTopic+"   on subscribe")
                  if (!err) {
                    //console.log("messageOneSpo",err)
                    // client.publish('/t1', '')
                  }
                })   
                
                Oclient1.on('message', (topic, message) =>{
                 console.log("Omessage1",topic+"  --- "+ message)
                   // message is Bufferthis.props.topic
                    if(this.props.currentTopic+""==topic)
                    if(message){
       
                      console.log("messageOne19", message.toString()  )
                      let jsn=   JSON.parse(message.toString())
                      
                      this.setState({
                         w_ecg:(jsn.hasOwnProperty("waveData")   && jsn.waveData.hasOwnProperty('Ecg')  &&  jsn.waveData['Ecg']!=="" &&  jsn.waveData['Ecg']!=128)?jsn.waveData['Ecg']:this.state.w_ecg,
                         w_spo:(jsn.hasOwnProperty("waveData")   && jsn.waveData.hasOwnProperty('Spo2')  &&  jsn.waveData['Spo2']!=="" &&  jsn.waveData['Spo2']!=128)?jsn.waveData['Spo2']:this.state.w_spo,
                         w_resp:(jsn.hasOwnProperty("waveData")   && jsn.waveData.hasOwnProperty('Resp')  &&  jsn.waveData['Resp']!=="" &&  jsn.waveData['Resp']!=128)?jsn.waveData['Resp']:this.state.w_resp,
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
                console.log("Omessage","Omessage on con client");
              })


  
 
// client1.on('connect', function () {
//   console.log("clientNew","connect")
//   client1.subscribe('presence', function (err) {


//       console.log("clientNew",err)
//     if (!err) {
//       // client1.publish('presence', 'Hello mqtt')
//     }
//   })
// })
 
// client1.on('message', function (topic, message) {
//   // message is Buffer
//   console.log("clientNew",message.toString())
 
// })
        // this.props.currentTopic
        if(this.props.client!=""){
   

          console.log("messageOne19", this.props.currentTopic  )
      this.props.client.on('message', (topic, message) =>{
          // message is Buffer
          // //console.log("messageOne1",message.toString() )

          // this.setState({w_spo:message.toString()})
          //   //console.log("messageOne1",this. byteArrayToLong ( message))
          console.log("messageOne19", this.props.currentTopic  )
          if(this.props.currentTopic==topic)
          if(message){
       
            console.log("messageOne19", message.toString()  )
            let jsn=   JSON.parse(message.toString())
            
            this.setState({
               w_ecg:(jsn.hasOwnProperty("waveData")   && jsn.waveData.hasOwnProperty('Ecg')  &&  jsn.waveData['Ecg']!=="" &&  jsn.waveData['Ecg']!=128)?jsn.waveData['Ecg']:this.state.w_ecg,
               w_spo:(jsn.hasOwnProperty("waveData")   && jsn.waveData.hasOwnProperty('Spo2')  &&  jsn.waveData['Spo2']!=="" &&  jsn.waveData['Spo2']!=128)?jsn.waveData['Spo2']:this.state.w_spo,
               w_resp:(jsn.hasOwnProperty("waveData")   && jsn.waveData.hasOwnProperty('Resp')  &&  jsn.waveData['Resp']!=="" &&  jsn.waveData['Resp']!=128)?jsn.waveData['Resp']:this.state.w_resp,
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


   testAlert=(type,value)=>{


    if(  type &&  value!="-- -- --" &&  value!="" && type.status=="true" && (Number(type.lower)>Number(value))  )
      { return true;}
       return false;
}
testAlert1=(type,value)=>{
  
  console.log("testplsmmm",type.upper+"---"+this.state.plsRate)
  if(  type &&  value!="-- -- --" &&  value!="" && type.status=="true" && (Number(type.upper)<Number(value))  )
    { 
      
      console.log("testplsmmm",type.upper<value+"ggg" + type.lower+"--"+type.upper+"---"+this.state.plsRate)
      
      return true;}
     return false;
}
  
      render(){

        let currentinnerItem=this.props.currentinnerItem  ;
         let currentItem = this.props.currentItem
        //console.log("detail",item)


        let isAlert=false;
       
        let textTemp=""
        let textspo2=""
        let textpulseRate=""
        let textlowPressure=""
        let texthighPressure=""
        let textheartRate=""
         
 
       
      if(this.testAlert(currentinnerItem.spo2,this.state.spo2)){
      
         isAlert=true;
         textspo2= "patient Spo2 is  too low  !!"
        }
      
        else if(this.testAlert1(currentinnerItem.spo2,this.state.spo2)){
          
          isAlert=true;
          textspo2= "patient Spo2 is  too high  !!"

         }
         
       if(this.testAlert(currentinnerItem.pulseRate,this.state.plsRate)){
        console.log("testpls0", currentinnerItem.pulseRate.lower+"--"+currentinnerItem.pulseRate.upper+"---"+this.state.plsRate)
         isAlert=true;
         textpulseRate= "patient PulseRate is  too low  !!"
        }
        else if(this.testAlert1(currentinnerItem.pulseRate,this.state.plsRate)){
          console.log("testpls1", currentinnerItem.pulseRate.lower+"--"+currentinnerItem.pulseRate.upper+"---"+this.state.plsRate)
          isAlert=true;
          textpulseRate= "patient  PulseRate is  too  highs  !!"
         }
       if(this.testAlert(currentinnerItem.lowPressure,this.state.nibp_low)){
         isAlert=true;
         textlowPressure= "patient Low Pressure is  too low  !!"
        }
        else if(this.testAlert1(currentinnerItem.lowPressure,this.state.nibp_low)){
          isAlert=true;
          textlowPressure= "patient Low Pressure is  too high  !!"
         }
       if(this.testAlert(currentinnerItem.highPressure,this.state.nibp_high)){
         isAlert=true;
         texthighPressure= "patient High Pressure is  too low  !!"
        }
        else if(this.testAlert1(currentinnerItem.highPressure,this.state.nibp_high)){
          isAlert=true;
          
          texthighPressure= "patient High Pressure is  too high !!"
        
         }
        if(this.testAlert(currentinnerItem.heartRate,this.state.heartRate)){
         isAlert=true;
         textheartRate= "patient Heart Rate is  too low  !!"
        } else if(this.testAlert1(currentinnerItem.heartRate,this.state.heartRate)){
          isAlert=true;
          textheartRate= "patient Heart Rate  is  too  high  !!"
         } if(this.testAlert(currentinnerItem.temperature,this.state.temp)){
          isAlert=true;
          textTemp= "patient Temparature is too low  !!"
         }else if(this.testAlert1(currentinnerItem.temperature,this.state.temp)){
           isAlert=true;
           textTemp= "patient Temparature is too high  !!"
          }

   let filter=[];
  

   console.log("testtemp",textTemp)

return(<DetailStyled>
    
    <div className="container-box innr-card-bg-color ">
      {/* <div className="back-fl">
      <div className="alrt-bx-txt">
        <img src={alertimg} className="imgaiert"/>
        <h2 className="txt-hd">patient bP is low  !!</h2>
    </div>
    </div> */}
    {/* <ECG tc="#78A960"  tt="" data={this.state.heartRate!="-- -- --"?this.state.heartRate:0} id="asd"></ECG> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-12">
      
              <div className="uppr-box-card flx-brk">
                <h2 className="hading-up text-left">home - <span>Patient Details</span></h2>
              {isAlert &&   <img src={alertimg} className="imgaiert"/>}
                  <div className="msg-dc">
  {textTemp!="" &&     <h3 className="erroe-mssh" style={{background:'green'}}>{textTemp}</h3>}
  {textspo2!="" &&       <h3 className="erroe-mssh">{textspo2}</h3>}
  {textpulseRate!="" &&    <h3 className="erroe-mssh" style={{background:'blue'}}>{textpulseRate}</h3>}
  { textlowPressure!="" &&    <h3 className="erroe-mssh" style={{background:'red'}}>{textlowPressure}</h3>}
               {texthighPressure!="" &&   <h3 className="erroe-mssh" style={{background:'#eb8c25'}}>{texthighPressure}</h3>}
               { textheartRate!="" &&    <h3 className="erroe-mssh" style={{background:'#b030b0'}} >{textheartRate}</h3>}
                </div>
				<a href="#" class="side-button-pis">prescribe medicine</a>
              </div>
              <div className="wrap-patient  alrt-dt" style={{backgroundImage: 'url('+backImg+')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      
      }} >
              <div className="back-fl">
     {isAlert  &&  <div className="alrt-bx-txt">
        {/* <img src={alertimg} className="imgaiert"/> */}
    </div>}
    </div>
                <div className="patient-detail">
                  <div className="patient-info border-bottomm">
                    <h2 className="patient-hading" onClick={()=>{this.props.goBack()}} style={{cursor: 'pointer'}}><font color="green">Go Back</font></h2>
                    <h2 className="patient-hading">{currentinnerItem.PatientName}</h2>
                    <h2 className="patient-hading">{'Blood Group: '+ currentinnerItem.BloodGroup}</h2>
                    <h2 className="patient-hading">{'Hospital Name : '+currentItem.hospital_name }</h2>
                    <h2 className="patient-hading">{'Address : '+currentinnerItem.Address}</h2>
                    <h2 className="patient-hading">{'Bed No : '+ currentinnerItem.Bed_Number}</h2>
                  </div>
                  <div className="patient-box-crd">
                    <div className="patient-box-1">
                      <div className="innr-patient height-box">
                        <h2 className="green-clr">ECG</h2>

                        <ECG  level="ecg" topic={this.props.currentTopic}  client={this.state.client1} tc="#489114"  max='250' tt="" data={this.state.w_ecg} id="asd"></ECG>
                      </div>
                      <div className="innr-patient height-box">
                        <h2 className="red-clr">SP0<sub>2</sub></h2>
                        
  <SPO  level="spo2"  topic={this.props.currentTopic} client={this.props.client} tc="#E4352C"    max='100'  tt="" data={this.state.w_spo} id="def"></SPO>
                      </div>
                      <div className="innr-patient height-box rem-boder">
                        <h2 className="orange-clr">RESP</h2>
                        <RESP   level="resp"  topic={this.props.currentTopic}    client={this.props.client} tc="#F0AF19"   max='250' tt="" data={this.state.w_resp}  id="jkl"></RESP>
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
                        <div className="innr-patient remo-bord">
                          <h2 className="red-clr">SP0<sub>2</sub>(%)</h2>
                          <p className="red-clr">{this.state.spo2}</p>
                        </div>
                        <div className="innr-patient remo-bord">
                          <h2 className="red-clr">Pulse Rate(bpm)</h2>
                          <p className="red-clr">{this.state.plsRate}</p>
                        </div>
                      </div>
                      <div className="innr-patient">
                        <h2 className="gray-clr">Temp(<sup>o</sup>C)</h2>
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