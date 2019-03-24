import React from 'react';

import RoomList from'./RoomList';

const SideBar = ({logout, rooms, selectedRoom, setRoom, addRoom}) => {
  return (
  <div className='column is-3 hero is-primary'
    style={{ padding: '10px' }}>
  <RoomList rooms={rooms} selectedRoom={selectedRoom} setRoom={setRoom} addRoom={addRoom}/>
  <div className='control'>
  <button onClick={logout}
  className='button is-fullwidth'>Logout</button>
  </div>
  </div>
  );
};

export default SideBar;
