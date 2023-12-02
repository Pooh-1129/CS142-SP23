import React from "react";
import {
  Divider,
  List,
  ListItem,
} from "@mui/material";

import "./styles.css";
import {Link} from "react-router-dom";
import fetchModel from '../../lib/fetchModelData';
/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      users:"",
    };

    const promise = fetchModel("http://localhost:3000/user/list");
    promise.then(
      (response) => {
        this.setState({users: JSON.parse(response.data)});
      },
      (response) => {
        console.log(response);
      }
    );
  }
  
  // componentDidUpdate(otherProps) {
  //   if (otherProps.match.params.userId !== this.props.match.params.userId) {
  //     const promise = fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`);
  //     promise.then(
  //       (response) => {
  //         const newUser = JSON.parse(response.data);
  //         this.setState({users: newUser});
  //         this.props.callback(newUser.first_name + " " + newUser.last_name, "UserDetail");
  //       },
  //       (response) => {
  //         console.log(response);
  //       }
  //     );
  //   }
  // }

  // componentDidMount() {
  //   const promise = fetchModel(`http://localhost:3000/user/${this.props.match.params.userId}`);
  //   promise.then(
  //     (response) => {
  //       const newUser = JSON.parse(response.data);
  //       this.setState({users: newUser});
  //       this.props.callback(newUser.first_name + " " + newUser.last_name,"UserDetail",);
  //     },
  //     (response) => {
  //       console.log(response);
  //     }
  //   );
  // }


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
