import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Widget, addResponseMessage } from 'react-chat-widget';
require('react-big-calendar/lib/css/react-big-calendar.css');

import GoogleLogin from 'react-google-login';
// const uuidv4 = require('uuid/v4');
// let apiai = require('apiai');

BigCalendar.momentLocalizer(moment);
export default class CardName extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(){

  }

  componentWillMount(){


  }

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }

    return(
      <div className="google-login">
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    )
  }
}
