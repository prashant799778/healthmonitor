import React from 'react';
import axios from 'axios';
import  {WaveStyled}  from './WaveStyled'
import Grabh from "../Report/grabh"

class Detail extends React.Component{

    constructor(){
      super()
    

    
    }

      componentDidMount() {
        var canvas = document.getElementById('c');
        var ctx    = canvas.getContext('2d');
        
        var lines = 4;
        
        for (var i = 0; i < lines; i ++) {
           this. drawLine(ctx, i * (canvas.height / lines), canvas.height / lines);
        }
     }

    drawLine=(ctx, y, h)=> {
    
        function randHeight(position) {
            var change  = h * (2/7);
            var padding = h * (1/4);
            var range   = h - (padding * 2);
            if (!position) position = (Math.random() * range) + padding;
            return clip(position + (Math.random() * (change * 2) - change), padding + y, range + padding + y);
        }
        
        function clip(number, min, max) {
            return Math.min(Math.max(number, min + (Math.random() * (max-min) * 0.2)), max - (Math.random() * (max-min) * 0.2));
        }
        
        ctx.globalCompositeOperation = 'source-over';
        
        ctx.fillRect(0, y, ctx.canvas.width, h);
        
        ctx.globalCompositeOperation = 'destination-out';
        
        ctx.beginPath();
        var lastPosition = randHeight();
        ctx.moveTo(0, lastPosition);
        for (var i = 0; i < ctx.canvas.width; i++) {
            ctx.lineTo(i += Math.random() * 5, lastPosition = randHeight(lastPosition));
        }
        ctx.stroke();
        
    }
 



      render(){

      

          
return(<WaveStyled>
    
  
    <canvas id="c" width="500" height="200"></canvas>
    
    
    
    
    
    </WaveStyled>


)

      }}
      export default Detail;