import React from "react";
import {
  Dialog,
  Button,
  Chip,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from 'axios';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:"",
      diaOpen:false,
    };
  }
  
  handleClickOpen=()=>{
    this.setState({diaOpen:true});
  };

  handleClickClose=()=>{
    this.setState({diaOpen:false});
  };

  handleChange=(event)=>{
    this.setState({comment:event.target.value});
  };

  handleSubmit=()=>{
    let submitComment = this.state.comment;
    this.setState({Comment:'',diaOpen:false});
    
    axios.post(`/commentsOfPhoto/${this.props.photoId}`, {
      comment:submitComment,
    }).then(
      (res)=>{this.props.onCommentSubmit();},
      (rej)=>{console.log("axios comment error");}
    )};

  render() {
    return(
      <div>
        <Chip label="Add New Comment" onClick={this.handleClickOpen}/>
        <Dialog open={this.state.diaOpen} onClose={this.handleClickClose}>
          <DialogContent>
            <DialogContentText>Enter your comment here</DialogContentText>
              <TextField value={this.state.comment} onChange={this.handleChange}/>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose}>Cancel</Button>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default NewComment;