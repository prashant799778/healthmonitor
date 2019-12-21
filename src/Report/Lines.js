
import React from 'react';
import ReactApexChart  from 'react-apexcharts'
import ApexCharts from 'apexcharts'


  
class LineChart extends React.Component {
 data=[]
constructor(props) {
  super(props);

  this.state = {
    options: {
      chart: {
          id: this.props.id,
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: this.props.tc,
          width: 2,
          dashArray: 0,      
      }
        ,

        title: {
          text: this.props.tt,
          align: 'left',
          style: {
            fontSize:  '16px',
            color:  this.props.tc
          },
        },
        markers: {
          size: 0
        },
      
        grid: {
          show: false,
          
          },   
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (value) {
              return  "";
            }
          },
          
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return  "";
            }
          },
        },
        legend: {
          show: false
        }
    },
    series: [{
      data: this.data.slice()
    }],
  }
}

componentDidMount() {

 
  
}

componentWillReceiveProps(){
 
  let x= Date.now();
  let y=this.props.data;

  if(this.data.length>30){
    this.data=this.data.slice(this.data.length - 10, this.data.length);;
  
  }
  this.data.push({x,y})

 
  ApexCharts.exec(this.props.id, 'updateSeries', [{
    data: this.data.slice()
  }])
  console.log("data",this.props.data);

}


  


render() {
  
 
       
  return (
    

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="150" />
      </div>

  );
}

}

export default LineChart;