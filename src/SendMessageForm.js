import React, {Component} from 'react';

class SendMessageForm extends Component {
  state = {
    text: ''
  }

  onMessageSend = (e) =>{
    e.preventDefault();
    const message = {this.props.messages
    }
    this.props.sendMessage(message);
    this.setState({text: ''});
  }

  render() {
    return (
      <form onSubmit={this.onMessageSend}>
        <div className='control'>
          <input type='text'
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
          className='input'
          placeholder='Type your message'/>
        </div>
      </form>
    )
  }
}

export default SendMessageForm;
