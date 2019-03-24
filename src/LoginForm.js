import React, {Component} from 'react';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

updateEmail = (e) => {
  this.setState({
    email: e.target.value
  })
}

updatePassword = (e) => {
  this.setState({
    password: e.target.value
  })
}

login = (e) => {
  e.preventDefault();
  this.props.onLogin(this.state);
  this.setState({
    email: '',
    password: ''
  });
}

render(){
    return (
      <div className='box column is-half'>
      <h1 className='title'>Login!</h1>
      <form onSubmit={this.login}>
        <div className='field'>
          <div className='control'>
          <input type='email'
          placeholder='Email ...'
          value={this.state.email}
          onChange={this.updateEmail}
          className='input'/>
        </div>
          </div>
          <div className='field'>
            <div className='control'>
            <input type='password'
            placeholder='Password ...'
            value={this.state.password}
            onChange={this.updatePassword}
            className='input'/>
            </div>
          </div>

        <button type='submit'
         className='button is-primary is-fullwidth'>Login</button>
      </form>
      <a role='button' onClick={this.props.goToSignUp}>
        Don't have an account? Go signup!
      </a>
      </div>
    )
  }
}


export default LoginForm;
