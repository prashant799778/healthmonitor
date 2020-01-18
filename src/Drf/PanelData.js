import React, { Component } from 'react';
import { PopupStyled } from './PopupStyled';
import axios from 'axios';


export default class PanelData extends Component {
    constructor(props){
        super(props)
        this.state={
            paneldata:"",
            deal_id:"",

        }
    }
    panelApi = (id22)=>{
        axios.get("http://134.209.153.34:5004/getpaneldata?deal_id="+id22)
        .then((response)=> {
            
            if(response && response.data   && response.status === 200 && response.data["Panel Data"] !== null){
                this.setState({paneldata:response.data["Panel Data"]},()=>{
                    localStorage.setItem("prop",this.state.paneldata["Prop Factor"])
                  
                })
            }
       
        })
        
    }

    componentDidUpdate(preProps,preState){
    
        if(preProps.dealId !== this.props.dealId)
       {
        let deal_id = this.props.dealId

        this.panelApi(deal_id)
       }
    }


    render() {

        return (
            <div>
               <div>
                   <PopupStyled>

                   <div className="row">
  
  { this.props.paneldata !== null ? Object.keys(this.props.paneldata !=="" ? this.props.paneldata : {}).map((item,i)=>{
      
  if(item !== "PnlData" && item !== "OwnerData"&& item !== "Approving Authority" && item !== "CM Percent Average"
  ){
  return(
      <div className="col-sm-4 col-md-4">
  <div className="invest-hading" id={i}>
    <h2>{item+":"}</h2>
    <span>{this.props.paneldata[item]}</span>
    </div></div>
  )
  }
  else if(item === "CM Percent Average"){
    return(
        <div className="col-sm-4 col-md-4">
    <div className="invest-hading" id={i}>
      <h2>{item+":"}</h2>
      <span>{this.props.paneldata[item] +"%"}</span>
      </div></div>
    )   
  }

  }) : null }
  </div>


               <div className="row">

{Object.keys(this.props.paneldata !=="" ? this.props.paneldata : {}).map((item,i)=>{

if(item === "OwnerData"){
   
        let item1 = this.props.paneldata[item]
      
        return(
            <div className="col-sm-4 col-md-4 yar-dat">
            <div className="invest-hading" id="abcd">
             <h1 style={{fontSize:"1.5rem"}}>Owner Data</h1>
             <ul className="year-data">
                <li>
                <span>Payback</span> 
            <p>{item1.Payback}</p></li>
            <li>
                <span>Owner Share per Room</span> 
            <p>{item1["Owner Share per Room"]}</p></li>
    
            <li>
                <span>Cash in Hand Per Room</span> 
            <p>{item1[ "Cash in Hand Per Room"]}</p></li>
            <li>
                <span>Annual Yield on Market Value</span> 
            <p>{item1["Annual Yield on Market Value"]}</p></li>
            <li>
                <span>Monthly Yield Per Sq Feet</span> 
            <p>{item1["Monthly Yield Per Sq Feet"]}</p></li>
            <li>
                <span>Upfront Advance & deposit</span> 
            <p>{item1["Upfront Advance & deposit"]}</p></li>
            </ul></div></div>)
}

else if(item == "PnlData"){
    let yeardata = this.props.paneldata[item]
return(
    yeardata.map((item1,j)=>{
return(
    <div className="col-sm-4 col-md-4 yar-dat">
    <div className="invest-hading" id="25">
     <h1 style={{fontSize:"1.5rem"}}>{"Year"+ item1.Year}</h1>
     <ul className="year-data">
     
    <li>
        <span>Total SRNs</span> 
    <p>{item1["Total SRNs"]}</p></li>
    <li>
        <span>Average Annual Occupancy</span> 
    <p>{item1.Average_annual_occupancy}</p></li>
    <li>
        <span>Average Annual ARR</span> 
    <p>{item1.Average_annual_ARR}</p></li>
    <li>
        <span>GMV per month (annualized)</span> 
    <p>{item1["GMV per month (annualized)"]}</p></li>
    <li>
        <span>Effective Owner take (% of NRV)</span> 
    <p>{item1["Effective Owner take (% of NRV)"]}</p></li>
    <li>
        <span>Effective OYO take (% of NRV)</span> 
    <p>{item1["Effective OYO take (% of NRV)"]}</p></li>
    <li>
        <span>Opex</span> 
    <p>{item1["Opex"]}</p></li>
    <li>
        <span>CM before CoC % (cumulative at the Year n)</span> 
    <p>{item1["CM before CoC % (cumulative at the Year n)"]}</p></li>
    <li>
        <span>CM after CoC %  (cumulative at the Year n)</span> 
    <p>{item1["CM after CoC %  (cumulative at the Year n)"]}</p></li>
    <li>
        <span>Payback (no of months)</span> 
    <p>{item1["Payback (no of months)"]}</p></li>
    <li>
        <span>Suggested Lock in period(months)</span> 
    <p>{item1["Suggested Lock in period(months)"]}</p></li>
    </ul>
    </div></div>
)
    })
   
)}


})}
</div>



</PopupStyled>
                   
                   </div> 
            </div>
        )
    }
}
