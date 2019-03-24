import React from 'react';
import AddRoomForm from './AddRoomForm';

const Room = ({room, selectedRoom, setRoom }) => {
  const styles = selectedRoom === room.id ?
                'active-room':
                'room';
  return (
    <li><a className={styles} onClick={() => setRoom(room.id)}>{room.name}</a></li>
  );
}

const RoomList = ({rooms, selectedRoom, setRoom, addRoom}) => {
  return (
    <aside ClassName='menu'>
      <h1 className='title'>Rooms:</h1>
      <ul className='menu-list'>
      {
        Object.keys(rooms)
      .map(roomKey => ({...rooms[roomKey],id: roomKey}))
      .map(roomObj => <Room key={roomObj.id}
                      room={roomObj}
                      selectedRoom={selectedRoom}
                      setRoom={setRoom} />)
      }
    </ul>
    <div style={{marginTop: '30px'}}>
      <p className='menu-label has-text-white is-size-5'>
      Add a Room
      </p>
      <AddRoomForm addRoom={addRoom}/>
    </div>
  </aside>
  );
};

export default RoomList;
