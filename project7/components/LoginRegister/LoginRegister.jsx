import React from 'react';
import Login from './Login';
import Register  from './Register';

class LoginRegister extends React.Component {
  constructor(props){
    super(props);
    this.state={
      registerd:0,
    };
  }

  handleNew = () => {
    this.setState({registerd: 1});
  };

  handleRegister = () =>{
    this.setState({registerd: 2});
  };

  RegisterRender=()=>{
    if(this.state.registerd === 0){
      return <p className='prompt' onClick={this.handleNew}>
        No Account? Click Here Register!
      </p>
    }
    else if (this.state.registerd === 1){
      return <Register callback={this.handleRegister}/>;
    }
    else  return <p>Welcome!</p>
  }

  render() {
    return (
      <div>
        <Login callback={this.props.callback}/>
        {this.RegisterRender()}
      </div>
    )
  }
}
export default LoginRegister;