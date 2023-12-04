import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userName:"",
      curPage:"",
    };
  }

  updateState=(name,page)=>{
    this.setState({userName:name, curPage:page});
  };

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar state={this.state}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} callback={this.updateState}/>}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} callback={this.updateState}/>}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
