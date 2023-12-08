import React from "react";
import {
  Divider,
  List,
  ListItem,
} from "@mui/material";

import "./styles.css";
import {Link} from "react-router-dom";
import axios from 'axios';

/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      users:"",
    };

    const promise = axios.get("/user/list");
    promise.then(
      (response) => {
        // console.log(response.data[0]);
        this.setState({users: response.data});
      }).catch(
      (response) => {
        console.log(response);
      }
    );
  }
  
  render() {
    const allUsers = [];
    for(let i=0;i<this.state.users.length;i++){
      let curUser = this.state.users[i];
      let name = curUser.first_name + " " + curUser.last_name;
      allUsers.push(
        <div key={curUser._id}>
          <ListItem>
            <Link to={"/users/" + curUser._id}>{name}</Link>
            {/* <ListItemText primary={name} /> */}
          </ListItem>
          <Divider />
        </div>
      );
    }
    return (
      <div>
        <List component="nav">
          {allUsers}
        </List>
      </div>
    );
  }
}

export default UserList;
