import React from "react";



import CardComponent from './CardComponent'


class MainCard extends React.Component {
    constructor() {
 super();
 this.state={
    current:"",
     count:"",
     start:0,
     end:16,
 }


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
          let ids=innerItem.PatientId
        if(j>=this.state.start && j<this.state.end)
        return(
        
       <CardComponent  ids={ids} onClick={(event)=>click(event,items,innerItem)}  id={innerItem.PatientId} client={this.props.client} item={innerItem} index={j}  topic={'/'+items.HubId+'/'+items.HospitalId+'/'+items.ID+'/'+innerItem.PatientId} ></CardComponent>
        
        
        
        );
                })}
                </div>
        <div className="nxt-pre-btn"> 
          {(this.state.count>=this.state.end) &&
          
          <button  onClick={this.onNext} class="nxt-btn">next</button>}
          {(this.state.start>=16) &&      <button  onClick={this.onPrev} class="pre-btn" >prev</button>}
          </div>


</React.Fragment>

)

    }

}


export default  MainCard;