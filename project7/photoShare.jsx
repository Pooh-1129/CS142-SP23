import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister/LoginRegister";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userName:"",
      curPage:"",
      loginFlag: false,
      loginName: "",
      firstName: "",
      userId:"",
    };
  }

  updateState=(name,page)=>{
    this.setState({userName:name, curPage:page});
  };

  updateLogin=(login_flag, login_name, first_name, user_id)=>{
    this.setState({
      loginFlag:login_flag,
      loginName:login_name,
      firstName:first_name,
      userId:user_id,
    });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar state={this.state} callback={this.updateLogin}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                {this.state.loginFlag?
                <UserList />
                :
                <Redirect path="/users/:userId" to="/login-register" />}
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  {this.state.loginFlag?
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} callback={this.updateState}/>}
                  />:
                  <Redirect path="/users/:userId" to="/login-register" />}
                  {this.state.loginFlag?     
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} callback={this.updateState}/>}
                  />:
                  <Redirect path="/users/:userId" to="/login-register" />}
                  <Route path="/login-register" render={ props => <LoginRegister {...props} callback={this.updateLogin} /> }
                  />
                  <LoginRegister callback={this.updateLogin} />
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
