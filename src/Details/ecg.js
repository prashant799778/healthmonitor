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
  dt=[]
  index=0
    constructor(){
      super()
    }
    componentDidMount() {
      this.convs= document.getElementById(this.props.id);

      this.ctx =  this.convs.getContext('2d')
      this. w =  this.convs.width
      this. h =  this.convs.height 
     this.py =  (this.h * 0.5)
       this.opy = this.py 
       /// plot x and y, old plot x and y, speed and scan bar width
   
   
   this.ctx.strokeStyle = this.props.tc;
   this.ctx.lineWidth = 3;
     
   

  this. dt=[ this.h * 0.5,this.h * 0.5,this.h * 0.5-128,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5+128,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,this.h * 0.5,]
  this. index=0

   this.convs.onmousemove = (e) =>{
    if(this.index<this.dt.length){
        this.index=this.index+1;
        }else{
            this.index=0
        }
    
    if(this.convs!=undefined && this.convs!="" ){
    var r =this.convs.getBoundingClientRect();
    console.log(r)
    this.py = this.dt[this.index];}
}
  this.loop();
    }


componentWillReceiveProps(){
let max=this.props.max;
}


    loop=() =>{
       
        /// move forward at defined speed
        this.px += this.speed;
        
        /// clear ahead (scan bar)
        this.ctx.clearRect(this.px,0, this.scanBarWidth, this.h);
        
        /// draw line from old plot point to new
        this.ctx.beginPath();
        this.ctx.moveTo(this.opx, this.opy);
        this.ctx.lineTo(this.px, this.py);
        this.ctx.stroke();
        
        /// update old plot point
        this.opx = this.px;
        this.opy = this.py;
        
        /// check if edge is reached and reset position
        if (this.opx > this.w) {
            this.px = this.opx = -this.speed;
        }
        
        requestAnimationFrame(this.loop);
        }

 render(){
     return(
        <canvas  id={this.props.id} width="800" height="180" style={{background:"transparent"}}> </canvas>
     
     
     
     );
 }



}


    export default ECG; 