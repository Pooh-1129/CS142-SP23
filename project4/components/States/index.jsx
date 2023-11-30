import React from "react";
import "./styles.css";

/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.cs142models.statesModel()",
      window.cs142models.statesModel()
    );
    this.state = {
      allStates: window.cs142models.statesModel(),
      query:"",
    }
    this.handleChangeQ = event=>this.handleChange(event);
  }
  
  handleChange(event){
    this.setState({query:event.target.value});
  }

  generate(prompt){
    const ans = [];
    for(let i=0;i<this.state.allStates.length;i++){
      let curState = this.state.allStates[i];
      if(curState.toLowerCase().includes(prompt.toLowerCase())){
        ans.push(<li key={curState}>{curState}</li>);
      }
    }
    if(ans.length===0){
      return "Sorry, no matching states";
    }
    else{
      const ret = (<div>
        <ul>{ans}</ul>
      </div>);
      return ret;
    }
  }

  render() {
    return (
    <div>
        <div className="query">
          <label> Please input a substring for the states you want to seek for.</label>
          <input type="text" value={this.state.query} onChange={this.handleChangeQ}/>
        </div>

        <div className="output">
          {this.generate(this.state.query)}
        </div>
    </div>

    )
  }
}

export default States;
