import React from 'react';
import axios from 'axios';

import { MomStyled } from './momStyled';


class MoM extends React.Component{

  constructor(){
    super()
        this.state={
           clustList:'',
           title:'',
           detail:'',
           cluster:'',
          deal_id:"",
          c_id:"",
           clust:'',
           zoneid1:'',
           hubid1:'',
           cityid1:'',
           zone:'',
           city:'',
           hub:'',
           options :[],
           optionHub:[],
           optionCity:[],
           optionCluster:[],
           value:"",
           clusterid1:"",
           year1:"",
           
        
        }

  }

    dash=()=>{
        this.props.history.push("/home")
      }
      user=()=>{
        this.props.history.push("/user")
      }
      drf=()=>{
        this.props.history.push("/drf")
      }
      role=()=>{
        this.props.history.push("/role")
      }
      report=()=>{
        this.props.history.push("/report")
      }


get=(title,detail)=>{
this.setState({title,detail})
}

selectHandler=(e)=>{
  this.setState({dealName:e.target.value})

}










  

      componentDidMount(){
        // this.callapi()
       
        
        
      }
        getZone=()=>{
          axios.get('http://134.209.153.34:5004/ZoneMaster')
  .then((res) => {
     
    if(res){
    
      if(res && res.data 
        && res.data.status !== "false"
        ){
      
         
       this.setState({zone:res.data.data})
       
    
       for(var j = 0; j < res.data.data.length;j++){
         const obj = {}
       
         obj.key = this.state.zone[j].name;
         obj.text = this.state.zone[j].name;
         obj.value = this.state.zone[j].id
         this.state.options.push(obj)
       }
     
   


      }else{
      
        this.setState({err:res.data.result}) 
      }
    }

  
  })
  .catch( (error)=> {
   
    this.setState({err:"somethimg goes wrong!"}) 
   
  });
}


    render() {
      if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        this.props.history.push("/")
      }
let clustList=[]
let cluster=[]

if(this.props.clustList1!=""){
 clustList=this.props.clustList1;
}

if(this.state.cluster!=""){
  cluster=this.state.cluster;
}
const {value }=this.state

let clusterId1 = this.props.clusterId1

    return(
      <MomStyled>
        
              <div className="container-fluid1">
                <div className="row">
               
                  <div className="col-sm-12 col-md-12">
                    <div className="card shadow mb-4">
                     
                      <div 
                    

                      >
                     
                              </div>
                       
                     
                      <div className="card-body drf-vi">
                        <div className="table-responsive-sm">
                          <table id="example" className="table table-striped table-bordered innr-table" style={{width: '100%'}}>
                            <thead>
                              <tr>
                              <th>Type</th>
                              <th>Deal Id</th>
                                <th>Jan</th>
                                <th>Feb</th>
                                <th>March</th>
                                <th>Apr</th>
                                <th>May</th>
                                <th>Jun</th>
                                <th>July</th>
                                <th>Aug</th>
                                <th>Sept</th>
                                <th>Oct</th>
                                <th>Nov</th>
                                <th>Dec</th>
                              </tr>
                            </thead>
                            <tbody>

                              
{ Array.isArray(clustList) ? clustList.map((item,i)=>{
if((item.Type).includes("Average OCC") || (item.Type).includes("GST") ){
  return(  <tr>
    <td>{item.Type}</td>
    <td>{item.deal_id}</td>
   <td>{item.Jan+"%"}</td>
    <td>{item.Feb+"%"}</td>
    <td>{item.Mar+"%"}</td>
    <td>{item.Apr+"%"}</td>
    <td>{item.May+"%"}</td>
    <td>{item.Jun+"%"}</td>
    <td>{item.Jul+"%"}</td>
    <td>{item.Aug+"%"}</td>
    <td>{item.Sep+"%"}</td>
    <td>{item.Oct+"%"}</td>
    <td>{item.Nov+"%"}</td>
    <td>{item.Dece+"%"}</td> 
    
  
  </tr>)}
  else {
    return(  <tr>
      <td>{item.Type}</td>
      <td>{item.deal_id}</td>
     <td>{item.Jan}</td>
      <td>{item.Feb}</td>
      <td>{item.Mar}</td>
      <td>{item.Apr}</td>
      <td>{item.May}</td>
      <td>{item.Jun}</td>
      <td>{item.Jul}</td>
      <td>{item.Aug}</td>
      <td>{item.Sep}</td>
      <td>{item.Oct}</td>
      <td>{item.Nov}</td>
      <td>{item.Dece}</td> 
      
    
    </tr>)
  }

})


                      :null        }
                             
                            </tbody>
                          
                          </table>
                        </div>
                        <template />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      </MomStyled>
         

    )


    }}


    export default MoM;