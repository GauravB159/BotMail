import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Widget, addResponseMessage } from 'react-chat-widget';
require('react-big-calendar/lib/css/react-big-calendar.css');
import {GoogleLogin, GoogleLogout} from 'react-google-login';
BigCalendar.momentLocalizer(moment);
export default class CardName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      client: new ApiAi.ApiAiClient({accessToken: '5024b204fe004def95ee70793929c0f0'}),
      loggedIn: false,
      timestamp: new Date()
    }

  }
  componentDidMount() {
    // get sample json data based on type i.e string or object

  }

  componentWillReceiveProps(){

  }

  componentWillMount(){


  }

  renderLaptop() {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    if(this.state.loggedIn === false) {
      let style={
        width:"25%",
        height:"10%",
        fontSize:"20px",
        backgroundColor:"#D50F25",
        color:'white',
        border:'transparent'
      }
      return (
        <div className="google-login">
          <div className="login-head">
            BotMail
          </div>
          <GoogleLogin
            style={style}
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(response)=>this.responseGoogleSuccess(response)}
            onFailure={(response)=>this.responseGoogle(response)}
          />
        </div>
      )
    }
    else {
      // console.log(this.state);
      let style={
        backgroundColor: 'transparent',
        color: 'white',
        border: 'transparent',
        width: '10%',
        cursor:'pointer',
        float:'right',
        marginTop:'0.8%',
        fontSize:'28px'
      }
      return (
        <div className="calendar">
          <div id="headDiv">
            <div id="nameDiv">
              BotMail
            </div>
            <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={(response)=>this.responseGoogleLogout(response)}
              style={style}>
            </GoogleLogout>
          </div>
          <div className="container">
            <div className="agenda">
              <BigCalendar
                selectable
                events={this.state.events}
                views={allViews}
                view="agenda"
                toolbar={false}
                step={60}
                defaultDate={new Date()}
              />
            </div>
            <div className="main">
              <BigCalendar
                selectable
                events={this.state.events}
                views={allViews}
                views={['month', 'week','day']}
                popup={true}
                step={60}
                defaultDate={new Date()}
              />
            </div>
          </div>
          <Widget
            handleNewUserMessage={(text)=>this.testChat(text)}
            subtitle="Tell me to add an event"
          />
        </div>
      )
    }
  }

  responseGoogle(response) {
    console.log(response);
  }
  responseGoogleSuccess(response) {

    axios.get("http://email-smartbot.herokuapp.com/meeting")
    .then((response)=> {
      let data = this.state.events;
      let newEvents = response.data;
      console.log(response);
      newEvents = newEvents.map((event,i)=>{
        let start = event.start_time;
        start = event.date+'T'+start;
        let end = event.end_time;
        end = event.date+'T'+end;
        let newEvent = {};
        newEvent['start']=new Date(Date.parse(start));
        newEvent['end']=new Date(Date.parse(end));
        newEvent['id']=event.pk;
        newEvent['title']=event.client.name
        return newEvent;
      });
      newEvents.forEach((event)=>{
        if(event.id > data.length)
          data.push(event);
        else {
          console.log("Repeated");
        }
      })
      this.setState({
        events:data
      })
    })

    setInterval(() => {
      axios.get("http://email-smartbot.herokuapp.com/meeting",
      {
        params: {
          timestamp: this.state.timestamp
        }
      })
      .then((response) => {
        let data = this.state.events;
        let newEvents = response.data;
        newEvents = newEvents.map((event,i)=>{
          let start = event.start_time;
          start = event.date+'T'+start;
          let end = event.end_time;
          end = event.date+'T'+end;
          let newEvent = {};
          newEvent['start']=new Date(Date.parse(start));
          newEvent['end']=new Date(Date.parse(end));
          newEvent['id']=event.pk;
          newEvent['title']=event.client.name;
          return newEvent;
        });
        newEvents.forEach((event)=>{
          if(event.id > data.length)
            data.push(event);
        })
        this.setState({
          timestamp: new Date(),
          events:data
        })
      })
    }, 1000)
    this.setState({
      loggedIn: true
    })
  }
  responseGoogleLogout(response) {
    console.log(response);
    this.setState({
      loggedIn: false
    })
  }
  handleNewUserMessage() {
    console.log("Received");
  }

  testChat(text) {
    this.state.client
    .textRequest(text)
    .then((response) => {
      addResponseMessage(response.result.fulfillment.speech)
      console.log(response);
    })
    .catch((error) => {console.log(error);})

  }

  render() {
    return this.renderLaptop();
  }
}
