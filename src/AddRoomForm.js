import React, { Component } from 'react';

class AddRoomForm extends Component {
  state = {
    roomName: ''
  }

  handleAddRoom = (e) =>{
    e.preventDefault();
    this.props.addRoom(this.state.roomName);
    this.setState({roomName: ''});
  }

  render(){
    return (
      <form onSubmit={this.handleAddRoom}>
        <div className='control'>
          <input type='text'
            placeholder='Room Name...'
            onChange={(e) => this.setState({roomName: e.target.value})}
            className='input'
            value={this.state.roomName} />
        </div>
      </form>
    );
  }
}

export default AddRoomForm;
