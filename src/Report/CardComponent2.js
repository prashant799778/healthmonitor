import React from "react";






class CardComponent extends React.Component {
    constructor() {
 super();


 this.state = {
    ecg:"",
     spo:"",
     nibp:"",
     temp:"",
      id:"",
      user:""

  }



}
    

      
      
       componentDidMount() {
           console.log("topic",this.props.topic);
    
           console.log("message","in props")
           if(this.props.client!="")
        this.props.client.on('message', (topic, message) =>{
            // message is Buffer
            if(message){
            console.log("message11",message.toString())
           
              let jsn=   JSON.parse(message.toString())
   if(this.props.id==jsn.PatientId)
     {

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
        <h2 class="innr-text-hd">{this.state.ecg!=""?this.state.ecg["Heart Rate"]:"--"}</h2>
                <h3 class="innr-info-text-hd">HR (bpm)</h3>
              </div>
               <div class="innr-new-box-card">
                <h2 class="innr-text-hd">{this.state.nibp!=""?this.state.nibp["High"]+"/"+this.state.nibp["Low"]:"--/--"}</h2>
                <h3 class="innr-info-text-hd">NIBP (mmHg)</h3>
              </div>
               <div class="innr-new-box-card">
                <h2 class="innr-text-hd">{this.state.ecg!=""?this.state.ecg["Resp Rate"]:"--"}</h2>
                <h3 class="innr-info-text-hd">RESP(bpm)</h3>
              </div>
            
            </div>
            </div>


        );
    }
    
    
    }

 export default CardComponent;