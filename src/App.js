import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import firebaseApp from './fire';
import { auth, messageRef, roomRef } from './fire';
import SideBar from './SideBar';
import MainPanel from './MainPanel';
import ChatPanel from './ChatPanel';
import 'bulma/css/bulma.css';

class App extends Component {
  state = {
    isLoggedIn: false,
    wantsToLogIn: false,
    email: '',
    uid: null,
    rooms: {},
    selectedRoom: null,
    messages: {}
  }

  loadData = () => {
      roomRef.once('value')
              .then(snapshot => {
                const rooms = snapshot.val();
                const selectedRoom = Object.keys(rooms)[0];
                this.setState({
                  rooms,
                  selectedRoom
                });
                return messageRef
                        .orderByChild('roomId')
                        .equalTo(selectedRoom)
                        .once('value');
              })
              .then(snapshot => {
                const messages = snapshot.val() || {};
                this.setState({
                  messages
                });
                })
              .catch(err => console.error(err));
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        const {email, uid} = user;
        this.setState({
          email,
          uid,
          isLoggedIn: true
        });
        this.loadData();
        roomRef.on('value', snapshot => {
          const rooms = snapshot.val();
          this.setState({
            rooms: rooms
          })
        });
        messageRef.on('child_added', snapshot => {
          const message = snapshot.val();
          const key = snapshot.key;
          if(message.roomId === this.state.selectedRoom){
            this.setState({
              messages: {
                ...this.state.messages,
                [key]: message
              }
            })
          }
        });
      }
    });
  }

  handleSignUp = ({email, password}) => {
      auth.createUserWithEmailAndPassword(email, password)
          .catch(err => console.error(err));
  }

  handleLogin = ({email, password}) => {
      auth.signInWithEmailAndPassword(email, password)
          .then(user => {
            const { email, uid } = user;
            this.setState({
              isLoggedIn: true,
              email,
              uid
          });
        })
          .catch(err => console.error(err));
}

  logout = (e) => {
    auth.signOut()
        .then(() => {
          this.setState({
            email: '',
            uid: null,
            isLoggedIn: false
          });
        });
  }

  setRoom = (id) => {
    messageRef
      .orderByChild('roomId')
      .equalTo(id)
      .once('value')
      .then(snapshot => {
        const messages = snapshot.val() || {};
        this.setState({
          selectedRoom: id,
          messages
        });
      })
      .catch(err => console.error(err));
  }

  addRoom = (roomName) =>{
    const room = {
      author: this.state.uid,
      name: roomName,
      created: Date.now()
    }
    roomRef.push(room);
  }

  sendMessage = (message) =>{
    messageRef.push(message);
  }

  render() {
    return (
      <div className='columns vh-100 is-gapless'>
      <SideBar logout={this.logout}
      rooms={this.state.rooms}
      selectedRoom={this.state.selectedRoom}
      setRoom={this.setRoom}
      addRoom={this.addRoom} />

        {this.state.isLoggedIn ?
          <MainPanel>
          <ChatPanel messages={this.state.messages}
            roomId={this.state.selectedRoom}
            email={this.state.email}
            uid={this.state.uid}
            sendMessage={this.sendMessage}/>
              </MainPanel> :
          <MainPanel>
            {this.state.wantsToLogIn ?
                <LoginForm onLogin={this.handleLogin}
                goToSignUp={() => this.setState({wantsToLogIn: false})} /> :
                <SignUpForm onSignUp={this.handleSignUp}
                goToLogin={() => this.setState({wantsToLogIn: true})}/>
              }
          </MainPanel>
          }

      </div>
    );
  }
}

export default App;
