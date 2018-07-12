import React, { Component } from 'react';
import request from '../../services/request/request.service';

const SERVER_NAME = 'http://localhost:5000/';

class Auth extends Component {

  constructor(props) {
    super(props);

    request(SERVER_NAME + 'expenses-control/us-central1/logIn').promise
    .then((response) => {
        console.log(response);
    }).catch((e) => {
        console.log(e);
    });
  }

  render() {
    return (
      <div>
        Auth
      </div>
    );
  }
}

export default Auth;