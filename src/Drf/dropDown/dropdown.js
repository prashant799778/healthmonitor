import React, { Component } from 'react';
import { Container ,Dropdown } from "semantic-ui-react"
import { DrpStyled } from './drpStyled';
const App = ({ children }) => (
  <DrpStyled>
  <Container style={{ margin: 0 }}>
    {children}
  </Container></DrpStyled>
);

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default class DropDown extends Component {

    constructor(props){
        super(props)
        this.state = {
         
        options :[],
        value:""

        }}
  render() {

    
    return (
      <DrpStyled>
      <div id="root"><App>
      <Dropdown
  required={true}
    placeholder={this.props.placeholder}
    // fluid
    // multiple
   
    search
    selection
    options= {this.props.options}
  onChange={this.props.onChange}
   id ="dropDown"
   defaultValue={this.props.defaultValue}
 
   value={this.props.value}
   
  /></App>
     
    
      </div></DrpStyled>
    )
  }
}
