import React, { Component } from "react";
import { message } from 'antd';
import io from "socket.io-client";
import jwt from 'jwt-decode';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("jwt") && jwt(localStorage.getItem("jwt")).name,
      message: '',
      messages: []
    };

    this.socket = io('localhost:4001');

    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      if (!this.state.message) {
        message.error('Please enter a message', 7);
      } else {
        this.socket.emit('SEND_MESSAGE', {
          author: this.state.username,
          message: this.state.message
        })
        this.setState({ message: '' });
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-10">
            <div className="card">
              <div className="card-body">
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div key={JSON.stringify(message)}><strong>{message.author}:</strong> {message.message}</div>
                    )
                  })}
                </div>
              </div>
              <div className="card-footer">
                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                <br />
                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;