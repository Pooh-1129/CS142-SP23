import React from "react";
import {
  Grid, 
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import axios from 'axios';


function photoComments(comments) {
  if (comments) {
    return (
      comments.map((perComment) => (
        <List key={perComment._id}>
          <Typography variant='subtitle2'>
            <Link to={"/users/" + perComment.user._id}>
              {perComment.user.first_name + " " + perComment.user.last_name + "  "}
            </Link>
          </Typography>
          <Typography variant='caption' gutterBottom color='textSecondary' >
            {perComment.date_time}
          </Typography>
          <Typography variant='body1'>
            {perComment.comment}
          </Typography>
        </List>
      ))
    );
  }
  return "";
}

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_photo:"",
      user:"",
    };

    const promise0 = axios.get(`/photosOfUser/${this.props.match.params.userId}`);
    promise0.then(
      (response) => {
        this.setState({user_photo: response.data});
      }).catch(
      (response) => {
        console.log(response);
      }
    );

    const promise1 = axios.get(`/user/${this.props.match.params.userId}`);
    promise1.then(
      (response) => {
        this.setState({user: response.data});
        this.props.callback(this.state.user.first_name + " " + this.state.user.last_name, "UserPhotos");
      }).catch(
      (response) => {
        console.log(response);
      }
    );
  }

  render() {
    const allPhotos = [];
    for(let i=0;i<this.state.user_photo.length;i++){
      let curPhoto = this.state.user_photo[i];
      let file ="./images/"+curPhoto.file_name;
      let date = curPhoto.date_time;
      let comments = curPhoto.comments;
      allPhotos.push(
        <Grid item xs={6} key={curPhoto._id}>
          <Card variant="outlined">
            <CardHeader subheader={date}/>
            <CardMedia
              component="img"
              image={file}
              title="Author Post"
            />
            <CardContent>
              {photoComments(comments)}
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return (
      <Grid justifyContent='center' container spacing={2}>
        {allPhotos}
      </Grid>
    );
  }
}

export default UserPhotos;
