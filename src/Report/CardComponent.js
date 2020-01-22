import React from "react";






class CardComponent extends React.Component {
    constructor() {
 super();


 this.state = {
  spo2:"-- --",
  plsRate:"-- --",
  heartRate:"-- --",
  rsp:"-- --",
  nibp_low:"-- --",
  nibp_high:"-- --",
  temp:"-- --",
  resp:"",
      id:"",
      user:"",


      isAlert:false,

  }



}
    

      
      
       componentDidMount() {
        
        console.log("Omessagep",this.props.ids)
           let  Omqtt1 = require('mqtt')
           let  Oclient1  = Omqtt1.connect('ws://3.0.218.219:9001')
         
             Oclient1.on('connect', ( ) =>{
                   Oclient1.subscribe(this.props.ids+"",  (err)=> {
                     console.log("Omessage",this.props.ids+"   on subscribe")
                     if (!err) {
                       //console.log("messageOneSpo",err)
                       // client.publish('/t1', '')
                     }
                   })   
                   
                   Oclient1.on('message', (topic, message) =>{
                    console.log("Omessage0",this.props.id+"  --- "+ topic)
                      // message is Bufferthis.props.topic
                       if(this.props.ids==topic)
                      if(message){
                      console.log("message11",topic)
                     
                      let jsn=   JSON.parse(message.toString())
          
          
                      console.log("Omessage0",this.props.id+"  --- "+ jsn.PatientId)
          
          
             if(this.props.ids==jsn.PatientId)
               { 
          
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
                    
                      
                      
                      }
                    })
                   console.log("Omessage","Omessage on con client");
                 })
           




          //  if(this.props.client!="")
  //       this.props.client.on('message', (topic, message) =>{
  //         console.log("message",this.props.topic+",in props,"+topic)
  //           // message is Bufferthis.props.topic
  //            if(this.props.topic==topic)
  //           if(message){
  //           console.log("message11",topic)
           
  //           let jsn=   JSON.parse(message.toString())





  //  if(this.props.id==jsn.PatientId)
  //    { 

  //     this.setState({
             
  //       temp:(jsn.hasOwnProperty("TEMP")  && jsn.TEMP!=="" )?jsn.TEMP:this.state.temp,
  //        id:jsn.PatientId,
  //        user:jsn.usercreate,
  //        resp:jsn.RESP,
  //        spo2: (jsn.hasOwnProperty("SPO2")  && jsn.SPO2.hasOwnProperty('SPO2')  &&  jsn.SPO2['SPO2']!==""  && jsn.SPO2['SPO2']!=127)?jsn.SPO2['SPO2']:this.state.spo2,
  //        plsRate:  (jsn.hasOwnProperty("SPO2")   && jsn.SPO2.hasOwnProperty('Pulse Rate')  &&  jsn.SPO2['Pulse Rate']!=="" &&  jsn.SPO2['Pulse Rate']!=255)?jsn.SPO2['Pulse Rate']:this.state. plsRate,
  //        heartRate:  (jsn.hasOwnProperty('ECG') && jsn.ECG.hasOwnProperty("Heart Rate")  &&  jsn.ECG["Heart Rate"]!=="")?jsn.ECG["Heart Rate"]:this.state.heartRate,
  //         rsp: (jsn.hasOwnProperty('ECG')  && jsn.ECG.hasOwnProperty("Resp Rate")  &&  jsn.ECG["Resp Rate"]!=="")?jsn.ECG["Resp Rate"]:this.state.rsp,
  //          nibp_high:(jsn.hasOwnProperty('NIBP')  &&  jsn.NIBP.hasOwnProperty("High") &&  jsn.NIBP["High"]!=="")?jsn.NIBP["High"]:this.state.nibp_high,
  //         nibp_low: (jsn.hasOwnProperty('NIBP')  && jsn.NIBP.hasOwnProperty("Low")   &&  jsn.NIBP["Low"]!=="")?jsn.NIBP["Low"]:this.state.nibp_low,
  //    })
              
  //    }
          
            
            
  //           }
  //         })
       }
    
      testAlert=(type,value)=>{


           if(  type &&  value!="-- --" &&  value!="" && type.status=="true" && (Number(type.lower)>Number(value) || Number(type.upper)<Number(value))  )
             { 
                 
              return true;}
              return false;
      }
    
    render(){
      

        
       let item=this.props.item;

        let text=""

       let isAlert=false;

       if(this.testAlert(item.temperature,this.state.temp)){
        isAlert=true;
         
       }
       else if(this.testAlert(item.spo2,this.state.spo2)){
        isAlert=true;
       }
       else if(this.testAlert(item.pulseRate,this.state.plsRate)){
        isAlert=true;
       }
       else if(this.testAlert(item.lowPressure,this.state.nibp_low)){
        isAlert=true;
       }
       else if(this.testAlert(item.highPressure,this.state.nibp_high)){
        isAlert=true;
       }
       else if(this.testAlert(item.heartRate,this.state.heartRate)){
        isAlert=true;
       }
     

    console.log("item",item)

        return(
          

            <div  onClick={this.props.onClick} class="new-box-card innr-card-bg-color border-card">
      
            <div class="card-hading-box border-bottomm">
              <h2 class="text-hading">{item.PatientName}</h2>
              <h2 class="text-hading">{'Room No.- '+item.roomNumber}</h2>
              <h2 class="text-hading">{'Bed No.- '+item.Bed_Number}</h2>
             
              <div className="alrt-bx">
        {isAlert &&    <img style={{cursor:'pointer'}} src={require("./img/alert.gif")}/>   }
              {/* <div className="blink-efc"></div> */}
              <img style={{cursor:'pointer'}} src={require("./img/eye.svg")}/>
              
              </div>
            </div>
            
            <div class="innr-new-card-wrap">
              <div class="innr-new-box-card">
        <h2 class="innr-text-hd">{this.state.spo2}</h2>
                <h3 class="innr-info-text-hd">SPO2(%)</h3>
              </div>
              <div class="innr-new-box-card">
                <h2 class="innr-text-hd">{this.state.plsRate}</h2>
                <h3 class="innr-info-text-hd">Pulse Rate(bpm)</h3>
              </div> 
               <div class="innr-new-box-card">
                <h2 class="innr-text-hd">{this.state.nibp_high+"/"+this.state.nibp_low }</h2>
                <h3 class="innr-info-text-hd">NIBP (mmHg)</h3>
              </div>
              
            
            </div>
            </div>


        );
    }
    
    
    }

 export default CardComponent;