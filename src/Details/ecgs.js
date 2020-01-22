import React from 'react';



class ECG extends React.Component{
     ctx=""
    speed = 3
     px = 0
 opx = 0
   py =0
   h=0
   opy = 0
   convs=""
  scanBarWidth = 20;
   buffer=[];
   bufferIndex=0
  bufferSize=1;
  dt=[]
  index=0
  latPoint=null

  lWidth=1;
  test=1;

    constructor(){
      super()
    }
    componentDidMount() {
      this.convs= document.getElementById(this.props.id);

      this.ctx =  this.convs.getContext('2d')
      this. w =  this.convs.width
      this. h =  this.convs.height*0.95  
     this.py =  (this.h * 2)
       this.opy = this.py 
       /// plot x and y, old plot x and y, speed and scan bar width
   
   
   this.ctx.strokeStyle = this.props.tc;
   this.ctx.lineWidth = this.lWidth;
   
  this. buffer= new Array(this. bufferSize);
this. bufferIndex = 0;

//   this. dt=[113,120,126,130,119,121,132,124,121,126,127,124,117,129,122,127,126,123,120,120,122,129,122,130,137,126,114,126,122,120,123,122,132,132,118,98,134,122,122,126,121,110,94,90,106,88,100,100,108,112,126,123,123,137,123,122,121,122,131,124,128,132,117,120,117,122,127,119,124,122,138,122,133,133,120,132,124]
//   this. dt=[61, 38, 38, 70, 29,27,42, 18, 64, 82, 12, 48,79,6, 26, 63, 91, 22, 42,71, 46,26,68,33,37, 84, 86,27, 27, 67, 61, 24, 61, 38, 38, 70, 29,27,42, 18, 64, 82, 12, 48,79,6, 26, 63, 91, 22, 42,71, 46,26,68,33,37, 84, 86,27, 27, 67, 61, 24]
  this. index=0


  
     
///////////////////
var mqtt1 = require('mqtt')
var client1  = mqtt1.connect('mqtts://smarticumqtt.fourbrick.in:9001')

 this.setState({client1: client1 },()=>{
  client1.on('connect', (
      

  ) =>{
    client1.subscribe(this.props.topic+"/ecg",  (err)=> {
      console.log("messageOneecg",this.props.topic+"/ecg on subscribe")
      if (!err) {
        //console.log("messageOneSpo",err)
        // client.publish('/t1', '')
      }
    })   
    
    client1.on('message', (topic, message) =>{
        // message is Buffer
        
        console.log("messageOneecg", (topic)+","+ this.props.topic+"/ecg on messgae" )
        if((this.props.topic+"/ecg")=== topic){

              console.log("asd",topic +" --" +  message.toString() )
            this.loop( message.toString());
        }
      
      
         })
    console.log("messageOneecg","ecg on con client");
  })
 })




  ///////////
  console.log("messageOneecg","ecg in client"+this.props.client);
//  if(this.props.client!=""){
//     console.log("messageOneecg","ecg in client");
   
// this.props.client.on('message', (topic, message) =>{
//     // message is Buffer
    
//     console.log("messageOneecg", (topic)+","+ this.props.topic+'/'+this.props.level )
//     if((this.props.topic+'/'+this.props.level)=== topic)
//     this.loop( message.toString());
  
//      })
  
//     }
    }

componentWillReceiveProps(){


}

    loop=(amp) =>{
        if(this.convs==""){
            this.bufferIndex=0
            return;
        }


        if(this.lastPoint == null){
            this.lastPoint ={};
            this.lastPoint.x = 0;
            this.lastPoint.y = Number(this.h - (this.h /this.props.max )* amp);
            return;
        }
       this.buffer[this.bufferIndex] = amp;
       this.bufferIndex=this.bufferIndex+1

      



       if(  this.bufferIndex >= this. bufferSize){
        this.bufferIndex = 0;
       let  points = Number ((this.w -this.lastPoint.x) /this.test);

        points = points > this. bufferSize? this. bufferSize : points;

        let  xRight = Number(  this.lastPoint.x+this.test*points);
       
        if(this.ctx == "") return;

        // this.ctx.rect(this.lastPoint.x, 0, Number (xRight + 2*2), Number (this.h+this.lWidth));

        //console.log("buffer",points) 
        for(let i = 0; i < points; i++){
            let point={}
            point.x = Number  (this.lastPoint.x + this.test);
            point.y = Number (this.h - (this.h/this.props.max )* this.buffer[i]);

            this.ctx.clearRect(this.lastPoint.x,0, 10,this.h/0.92);
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
            this.ctx.lineTo(point.x,point.y);
            this.ctx.lineJoin='round'
            this.ctx.lineCap='round'    
            this.ctx.stroke();
              this.lastPoint = point;
        }
             
      
               //console.log("chhh",Number(( this.w -this.lastPoint.x) / 2))
        if(Number(( this.w -this.lastPoint.x) / this.test) < 1){
            this.lastPoint.x = 0;
           
        }
        if(points <this. bufferSize){
         
            //Log.e(TAG, "addAmp: "+points);
           this.bufferIndex = this. bufferSize - points;
            for(let i = 0; i < this.bufferIndex; i++){
               this.buffer[i] = this.buffer[points + i];
            }
            this.lastPoint.x = 0;

            //Log.i(TAG, "drawLine mDataBthufferIndex:" + mDataBufferIndex + " Points:" + points);
        }
    }



        // /// move forward at defined speed
        // this.px += this.speed;
        
        // /// clear ahead (scan bar)
        // this.ctx.clearRect(this.px,0, this.scanBarWidth, this.h);
        
        // /// draw line from old plot point to new
        // this.ctx.beginPath();
        // this.ctx.moveTo(this.opx, this.opy);
        // this.ctx.lineTo(this.px, this.py);
        // this.ctx.lineJoin='round'
        // this.ctx.lineCap='round'
        // this.ctx.stroke();
        
        // /// update old plot point
        // this.opx = this.px;
        // this.opy = this.py;
        
        // /// check if edge is reached and reset position
        // if (this.opx > this.w) {
        //     this.px = this.opx = -this.speed;
        // }
        // requestAnimationFrame(this.loop)

       
        }

 render(){
     return(
        <canvas  id={this.props.id} width="800" height="100" style={{background:"transparent"}}> </canvas>
     
     
     
     );
 }



}


    export default ECG; 