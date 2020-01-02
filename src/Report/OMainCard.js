import React from "react";



import CardComponent from './CardComponent'

import Pagination from "react-js-pagination";
require("../less/bootstrap.less");

class MainCard extends React.Component {
    constructor() {
 super();
 this.state={
    current:"",
     count:"",
     start:0,
     end:16,
     activePage:12
 }


    }

    handlePageChange=(pageNumber) =>{
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }
  onPrev=()=>{
     this.setState({start:this.state.start-16,end:this.state.end-16})
  }
  onNext=()=>{
    this.setState({start:this.state.start+16,end:this.state.end+16})
}

componentDidMount() {

    if(Array.isArray(this.props.detail))
    this.setState({count:this.props.detail.length})
}
componentWillReceiveProps(){
    

}
    render(){

        console.log("state",this.state)
       let click=this.props.Click;
       let items=this.props.item;
return(
     < React.Fragment>
      <div class="new-box-add">
    {Array.isArray(items.patient_Details) && items.patient_Details.map((innerItem,j)=>{
  
        if(j>=this.state.start && j<this.state.end)
        return(
        
       <CardComponent  onClick={(event)=>click(event,items,innerItem)}  id={innerItem.PatientId} client={this.props.client} item={innerItem} index={j}  topic={'/'+items.HubId+'/'+items.HospitalId+'/'+items.ID+'/'+innerItem.PatientId} ></CardComponent>
        
        
        
        );
                })}
                </div>
        <div className="nxt-pre-btn"> 
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
          </div>


</React.Fragment>

)

    }

}


export default  MainCard;