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
     per_page:12,
     activePage:1,
     client:""
 }


    }

    componentDidMount() {

    //      let tpk="/"+  localStorage.getItem("hub_id", "")+"/"+   localStorage.getItem("hos_id","")+"/+";
    //   let  Omqtt = require('mqtt')
    //   let  Oclient  = Omqtt.connect('ws://139.59.78.54:8083')
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

       
    }

  

    


componentWillReceiveProps(){
    

}
    render(){

        console.log("state",this.state)
       let click=this.props.Click;
	   let st=false;
         if(Array.isArray(this.props. paitentList)){
			   if(this.props. paitentList.length==0){
				   st=true;
			   }
		 }
       
return(
     < React.Fragment>
        <div className="nxt-pre-btn"> 
        <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={this.props.per_page}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={5}
          onChange={this.props.handlePageChange}
        />
          </div>
      <div class="new-box-add">
    {Array.isArray(this.props. paitentList) && this.props. paitentList.map((innerItem,j)=>{
         
  let ids=innerItem.ID 
        return(
        
       <CardComponent  ids={ids}  onClick={(event)=>click(event,{"hospital_name":innerItem.hospital_Name},innerItem)}  id={innerItem.PatientId} client={this.state.client} item={innerItem} index={j}  topic={innerItem.ID} ></CardComponent>
        
        
        
        );
                })}
				{(!Array.isArray(this.props.paitentList) || st ) && <div> No Data Found </div>}
               
                </div>
     


</React.Fragment>

)

    }

}


export default  MainCard;