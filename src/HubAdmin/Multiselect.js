import React, { Component } from 'react';
import  MultiSelectReact  from 'multi-select-react';
 
class MyComponent extends Component {
  constructor() {
        super();
        this.state = {
            multiSelect: ["asd","wert","asd","wert","asd","wert","asd","wert"]
        };
    }
  render() {
        const selectedOptionsStyles = {
            color: "#ffffff",
            backgroundColor: "#1E1E2F"
        };
        const optionsListStyles = {
            color: "#1E1E2F",
            backgroundColor: "#1E1E2F"
        };
    return (
      <MultiSelectReact 
      options={this.state.multiSelect}
      optionClicked={this.optionClicked.bind(this)}
      selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
      selectedOptionsStyles={selectedOptionsStyles}
      optionsListStyles={optionsListStyles} />
    );
  }
 
  optionClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
  }
  selectedBadgeClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
  }
 
}



export default  MyComponent; 