import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import axios from 'axios';
/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={version:"",};

    const promise = axios.get("/test/info");
    promise.then(
      (response)=>{this.setState({version:response.data});}
    ).catch(
      (response)=>{console.log(response);}
    );
  }

  render() {
    let textInfo = "";
    const curPage=this.props.state.curPage;
    const userName=this.props.state.userName;
    if(userName){
      if(curPage==="UserDetail")  textInfo=userName;
      else if(curPage==="UserPhotos") textInfo="Photos of "+userName;
    }
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" color="inherit">
            Yingfei Xu. V{this.state.version.__v}
          </Typography>
          <Typography variant="h5">{textInfo}</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
