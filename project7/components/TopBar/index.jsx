import React from "react";
import { AppBar, Toolbar, Typography, Chip} from "@mui/material";
import { Grid, Paper } from "@mui/material";

import "./styles.css";
import axios from 'axios';
/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={version:"",};
    this.uploadInput = null;
    // const promise = axios.get("/test/info");
    // promise.then(
    //   (response)=>{this.setState({version:response.data});}
    // ).catch(
    //   (response)=>{console.log(response);}
    // );
  }
  handleLogout =()=> {
    axios.post('/admin/logout').then(
      (res)=>{
        this.props.callback(false,'','','');
      },
      (rej)=>{console.error(rej);}
    );
    document.getElementById("bar_right").innerText = "";
  }

  /**
   * Called when user presses the update button.
   */
  handleUploadButtonClicked = (e) => {
    e.preventDefault();
    if (this.uploadInput.files.length > 0) {
      // Create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append('uploadedphoto', this.uploadInput.files[0]);
      axios.post('/photos/new', domForm)
        .then((res) => {
          console.log(res);
        })
        .catch(err => console.log(`POST ERR: ${err}`));
    }
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
        {/* <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" color="inherit">
            Yingfei Xu. V{this.state.version.__v}
          </Typography>
          <Typography variant="h5">{textInfo}</Typography>
        </Toolbar> */}
        <Toolbar> 
          <Grid container spacing={2}>
            <Grid item sm={2}>
              {
                this.props.state.loginFlag?
                <p>Hi {this.props.state.firstName}</p>:
                <p>Please Login</p>
              }
            </Grid>
            <Grid item sm={2}>
              {
                this.props.state.loginFlag?
                <p className="bar_logout" onClick={this.handleLogout}> Log out</p>
                :
                <></>
              }
            </Grid>
            <Grid item sm={4}>
              <p id="bar_right">{textInfo}</p>
            </Grid>
            <Grid item sm={4}>
              {this.props.state.loginFlag?
              <div>
                <label className='custom_file_input'> Choose 
                <input className='nofile' type="file" accept="image/*" ref={(domFileRef) => { this.uploadInput = domFileRef; }} />
                </label>
                <p className='bar_upload' onClick={this.handleUploadButtonClicked}>Upload Photo</p>
              </div>
              :
              <></>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
