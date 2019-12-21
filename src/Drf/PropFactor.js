import React from 'react';
import { PropStyled } from './propstyled';

import history from '../History'


class PropFactor extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            prop1:"",
            dealName:"",
            propValue:"",
            paneldata:"",
            propF1:"",
            prop:"",
            deal_id:""
          
           
        }
    
    }

componentDidUpdate(prevProps,prevState){
  if(prevProps.dealId !== this.props.dealId ){
    this.setState({deal_id:this.props.dealId},()=>{
      
    })

}
if(prevProps.blank!=this.props.blank){
  this.setState({prop:""})
}
  
}

inputHandler=(e)=>{
  
  if(e.target.value < e.target.max && e.target.value.length < 4){
    this.setState({prop:e.target.value})
    
    
  }
}




submitHandler=(e)=>{
    e.preventDefault()
    let prop = this.state.prop
    this.setState({propF1:prop},()=>{
    this.props.click(this.state.propF1,this.state.deal_id)
    }
    )    
}

    render() {
        if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
        this.props.history.push("/drfs")

      }else if(localStorage.getItem("login","no")!=="yes"){

        history.push("/")
      }
     
    
  
      return (
          <PropStyled>
        <div>
          {/* Page Wrapper */}
          <div id="wrapper1">
            {/* Sidebar */}
            <div id="content-wrapper" className="d-flex flex-column">
          
              <div id="content">
             
                <div className="container-fluid">
                  {/* Page Heading */}
                 <div className="propf">
                    
           
  <p>Prop Factor</p>
                     
                    
                    <input disabled value={this.props.propF+"%"} max="200" maxLength="3"></input>
                 </div>
                 <div className="dealname">
                    <p>Deal Name</p>
            
                    
   
<input className="del-inp"  disabled  value= {this.props.dealId}/>

 
    
<input className="del-inp" type="number"   placeholder="Prop Factor(in %)"
                    onChange={this.inputHandler} value={this.state.prop !== ""? this.state.prop: this.props.propF} max="200" maxLength="3" /> 
              
                    <button className="sbmt-btn" type="button" onClick={this.submitHandler}>Submit</button>
                
                 </div>
              
                  
                </div>
              </div>
            </div>
          </div>
       
      
        </div></PropStyled>
      );
    }
  };
  export default PropFactor