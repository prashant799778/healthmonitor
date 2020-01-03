import React from "react";
import axios from "axios";


import CardComponent from './CardComponent'

import Pagination from "react-js-pagination";
import  "./css/omaincard.css"
 

class MainCard extends React.Component {
     
    constructor() {
 super();
 this.state={
    paitentList:[],
    total:0,
     start:0,
     end:16,
     per_page:16,
     activePage:1,
     client:""
 }


    }

    componentDidMount() {

    //      let tpk="/"+  localStorage.getItem("hub_id", "")+"/"+   localStorage.getItem("hos_id","")+"/+";
    //   let  Omqtt = require('mqtt')
    //   let  Oclient  = Omqtt.connect('ws://139.59.78.54:9001')
    //   this.setState({client:Oclient})
    //     Oclient.on('connect', (
    //     ) =>{
    //           Oclient.subscribe(tpk,  (err)=> {
    //             console.log("Omessage",tpk+"on subscribe")
    //             if (!err) {
    //               //console.log("messageOneSpo",err)
    //               // client.publish('/t1', '')
    //             }
    //           })   
              
           
    //           console.log("Omessage","Omessage on con client");
    //         })

        this.callApiNew(1)
    }

    callApiNew=(page_no) => {
        let jsons={
      "hospital_Id":1,
        "startlimit":((this.state.per_page*page_no) -this.state.per_page)+1,
        "endlimit":this.state.per_page
        }
        axios
          .post(
            `http://159.65.146.25:5053/operationDashboard`, jsons
          )
          .then(res => {
    
            console.log("dashboardNew",res)
            if (res && res.data && res.data.status=="true") {
    
     this.setState({  paitentList:res.data.result,total:res.data.total_patient})
     
    
  
          
           
    
    
            }
          })
          .catch(e => console.log(e));
      }

    handlePageChange=(pageNumber) =>{
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber},()=>{
            this.callApiNew(pageNumber)

        });
      }


componentWillReceiveProps(){
    

}
    render(){

        console.log("state",this.state)
       let click=this.props.Click;
   
       
return(
     < React.Fragment>
      <div class="new-box-add">
    {Array.isArray(this.state. paitentList) && this.state. paitentList.map((innerItem,j)=>{
  
  let ids=innerItem.ID 
        return(
        
       <CardComponent  ids={ids}  onClick={(event)=>click(event,{"hospital_name":innerItem.hospital_Name},innerItem)}  id={innerItem.PatientId} client={this.state.client} item={innerItem} index={j}  topic={innerItem.ID} ></CardComponent>
        
        
        
        );
                })}
                </div>
        <div className="nxt-pre-btn"> 
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.per_page}
          totalItemsCount={this.state.total}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
          </div>


</React.Fragment>

)

    }

}


export default  MainCard;