
import React from 'react';
import ReactApexChart  from 'react-apexcharts'
import ApexCharts from 'apexcharts'



class grabh extends React.Component {
  lastDate = 0;
   data = []
    TICKINTERVAL = 86400000
   XAXISRANGE = 777600000
    getDayWiseTimeSeries=(baseval, count, yrange)=> {
        var i = 0;
        while (i < count) {
            var x = baseval;
            var y = 0;
    
            this.data.push({
                x, y
            });
            this.lastDate = baseval
            baseval += this.TICKINTERVAL;
            i++;
        }
    }
    
    
    
 getNewSeries=(baseval, y)=> {
        var newDate = baseval + this.TICKINTERVAL;
        this.lastDate = newDate
    
        for(var i = 0; i< this.data.length - 10; i++) {
            // IMPORTANT
            // we reset the x and y of the data which is out of drawing area
            // to prevent memory leaks
            this.data[i].x = newDate -this. XAXISRANGE - this.TICKINTERVAL
            this.data[i].y = 0
        }
        
        this.data.push({
            x: newDate,
            y: y
        })
        
    }
    
  resetData=()=>{
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
        this.data = this.data.slice(this.data.length - 10, this.data.length);
    }
    
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
        },

       
        title: {
            text: this.props.tt,
            align: 'left',
            style: {
            
              fontWeight:600,
              fontSize:  '14px',
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
          range: this.XAXISRANGE,
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
    this.getDayWiseTimeSeries(Date.now(), 10, {
        min: 10,
        max: 90
    })
}
componentWillReceiveProps(){
  
        this.getNewSeries(this.lastDate,this.props.data)
        
        ApexCharts.exec(this.props.id , 'updateSeries', [{
          data: this.data
        }])
    
}






render() {

  return (
    

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="120" />
      </div>

  );
}

}

export default grabh;