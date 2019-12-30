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
      user:""

  }



}
    

      
      
       componentDidMount() {
           console.log("topic",this.props.topic);
    
           
           if(this.props.client!="")
        this.props.client.on('message', (topic, message) =>{
          console.log("message",this.props.topic+",in props,"+topic)
            // message is Bufferthis.props.topic
             if(this.props.topic==topic)
            if(message){
            console.log("message11",topic)
           
            let jsn=   JSON.parse(message.toString())
   if(this.props.id==jsn.PatientId)
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
       }
    

    
    render(){

        
       let item=this.props.item;
        return(
          

            <div  onClick={this.props.onClick} class="new-box-card innr-card-bg-color border-card">
      
            <div class="card-hading-box border-bottomm">
        <h2 class="text-hading">{item.PatientName}</h2>
              <img src={require("./img/eye.svg")}/>
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