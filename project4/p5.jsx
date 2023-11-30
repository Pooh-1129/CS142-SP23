import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link} from "react-router-dom";

import States from "./components/States";
import Header from "./components/Header";
import Example from "./components/Example";

import "./p5.css"
class SwitchingRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <HashRouter>
            <div className="bar">
              <ul>
                <li><Link to="/states">Switch to states</Link></li>
                <li><Link to="/example">Switch to example</Link></li>
              </ul>
            </div>
            <Route path="/states" component={States} />
            <Route path="/example" component={Example} />
          </HashRouter>
        );
    }
}

ReactDOM.render(
<div> 
  <Header />
  <SwitchingRouter />
</div>,
 document.getElementById("reactapp"));
