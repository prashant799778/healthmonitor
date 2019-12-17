import React from 'react';
import { connect } from 'react-redux';

class Second extends React.Component{


 increment=()=>{
   this.props.dispatch({type:'IN',payload:1})

}
decrement=()=>{
  this.props.dispatch({type:'DEC',payload:1})
}

  render(){
return(
  <React.Fragment>
    
    <h1>count : {this.props.count}</h1>
    <button onClick={this.increment} >increment</button>
    <button onClick={this.decrement} >decrement</button>
  </React.Fragment>
);

  }
}
function mapStateToProps(state) {
  return {
    count: state.count
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Second);