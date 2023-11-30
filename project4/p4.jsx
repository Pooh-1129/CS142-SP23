import React from "react";
import ReactDOM from "react-dom";

import States from "./components/States";
import Header from "./components/Header";
import Example from "./components/Example";

class Switching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          switchInfo: "Switch to Example",
        };

    }
    
    handleChange() {
      if(this.state.switchInfo === "Switch to Example")
        this.setState({switchInfo:"Switch to States"});
      else
        this.setState({switchInfo:"Switch to Example"});
    }

    startPlay() {
      if(this.state.switchInfo === "Switch to Example")
        return <States />;
      else  return <Example />;
    }

    render() {
        return (
        <div>
          <button onClick={()=>this.handleChange()}>
            {this.state.switchInfo}
          </button>
          {this.startPlay()}
        </div>
        );
    }
}

ReactDOM.render(
<div> 
  <Header />
  <Switching />
</div>,
 document.getElementById("reactapp"));