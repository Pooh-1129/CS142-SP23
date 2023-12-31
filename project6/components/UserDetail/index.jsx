import React from "react";
import {Link, HashRouter} from "react-router-dom";
import "./styles.css";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from 'axios';
/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={user:"",};

    const promise = axios.get(`/user/${this.props.match.params.userId}`);
    promise.then(
      (response) => {
        //response.data is already object
        this.setState({user: response.data});
        this.props.callback(this.state.user.first_name + " " + this.state.user.last_name, "UserDetail");
      }).catch(
      (response) => {
        console.log(response);
      }
    );
  }

  componentDidUpdate(otherProps) {
    if (otherProps.match.params.userId !== this.props.match.params.userId) {
      const promise = axios.get(`/user/${this.props.match.params.userId}`);
      promise.then(
        (response) => {
          const newUser = response.data;
          this.setState({user: newUser});
          this.props.callback(newUser.first_name + " " + newUser.last_name,"UserDetail");
        }).catch(
        (response) => {
          console.log(response);
        }
      );
    }
  }

  componentDidMount() {
    const promise = axios.get(`/user/${this.props.match.params.userId}`);
    promise.then(
      (response) => {
        const newUser = response.data;
        this.setState({user: newUser});
        this.props.callback(newUser.first_name + " " + newUser.last_name, "UserDetail");
      }).catch(
      (response) => {
        console.log(response);
      }
    );
  }

  render() {
    return (
      // <Typography variant="body1">
      //   This should be the UserDetail view of the PhotoShare app. Since it is
      //   invoked from React Router the params from the route will be in property
      //   match. So this should show details of user:
      //   {this.props.match.params.userId}. You can fetch the model for the user
      //   from window.cs142models.userModel(userId).
      // </Typography>
      <div>
        <Link to={"/photos/" + this.state.user._id}>
            <button type="button">Photos</button>
        </Link>
        <List Component="nav">
          <ListItem>
            <ListItemText primary={"id: "+ this.state.user._id}/>
          </ListItem>
          <Divider/>

          <ListItem>
            <ListItemText primary={"name: "+this.state.user.first_name+" "+this.state.user.last_name}/>
          </ListItem>
          <Divider/>

          <ListItem>
            <ListItemText primary={"location: "+this.state.user.location}/>
          </ListItem>
          <Divider/>

          <ListItem>
            <ListItemText primary={"description: "+this.state.user.description}/>
          </ListItem>
          <Divider/>

          <ListItem>
            <ListItemText primary={"occupation: "+this.state.user.occupation}/>
          </ListItem>
          {/* <Divider/> */}
        </List>

        {/* <Typography variant='body1'>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={"/photos/" + this.props.match.params.userId}>Photos shared by the user</Link>
        </Typography> */}
      </div>
    );
  }
}

export default UserDetail;