import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Widget, addResponseMessage } from 'react-chat-widget';
require('react-big-calendar/lib/css/react-big-calendar.css');
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import 'rc-slider/assets/index.css';
BigCalendar.momentLocalizer(moment);

const setClass = date=>{
  if(date.busy){
    // console.log(date);

    return {
      style: {
          backgroundColor: "#D50F25",
      }
    }
  }else{
    return {}
  }
}

export default class CardName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      client: new ApiAi.ApiAiClient({accessToken: '15a0a172f9d54a9bb166677da9de3e5e'}),
      loggedIn: false,
      timestamp: new Date(),
      mondayValues: [8,16],
      tuesdayValues: [8,16],
      wednesdayValues: [8,16],
      thursdayValues: [8,16],
      fridayValues: [8,16],
      saturdayValues: [8,16],
      sundayValues: [8,16]
      // mondayIsBusy: false,
      // tuesdayIsBusy: false,
      // wednesdayIsBusy: false,
      // thursdayIsBusy: false,
      // fridayIsBusy: false,
      // saturdayIsBusy: false,
      // sundayIsBusy: false
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
            <div className="meetings">
              Your Meetings
            </div>
            <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={(response)=>this.responseGoogleLogout(response)}
              style={style}>
            </GoogleLogout>
          </div>
          <div className="container">
            <div className="agenda">
              <div className="agenda-header">
                Agenda today onwards
              </div>
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
                eventPropGetter={setClass}
                events={this.state.events}
                views={allViews}
                views={['month', 'week','day']}
                popup={true}
                step={60}
                defaultDate={new Date()}
              />
            </div>
            {/* <table className="ranges">
              <tr>
                <th>Day</th>
                <th>Free time</th>
                <th>Busy?</th>
              </tr>
              <tr>
                <td className="rowTitle">Monday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.mondayValues} tipFormatter={value => `${value}:00`} onChange={this.setState(mondayValues: )} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="monday"/>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Tuesday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.tuesdayValues} tipFormatter={value => `${value}:00`} onChange={(e)=>this.setDaysRange(e)} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="tuesday"/>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Wednesday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.wednesdayValues} tipFormatter={value => `${value}:00`} onChange={(e)=>this.setDaysRange(e)} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="wednesday"/>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Thursday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.thursdayValues} tipFormatter={value => `${value}:00`} onChange={(e)=>this.setDaysRange(e)} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="thursday"/>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Friday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.fridayValues} tipFormatter={value => `${value}:00`} onChange={(e)=>this.setDaysRange(e)} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="friday"/>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Saturday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.saturdayValues} tipFormatter={value => `${value}:00`} onChange={(e)=>this.setDaysRange(e)} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="saturday"/>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Sunday</td>
                <td className="rowSlider">
                  <Range min={0} max={24} allowCross={false} defaultValue={this.state.sundayValues} tipFormatter={value => `${value}:00`} onChange={(e)=>this.setDaysRange(e)} />
                </td>
                <td className="rowCheck">
                  <input type="checkbox" id="sunday"/>
                </td>
              </tr>
              <tr>
                <button className="submitButton" onClick={this.submit}>Submit</button>
              </tr>
            </table> */}
          </div>
          <Widget
            handleNewUserMessage={(text)=>this.testChat(text)}
            subtitle="Tell me to add an event"
          />
        </div>
      )
    }
  }

  // setDaysRange(e) {
  //   console.log(e);
  // }
  //
  // submit() {
  //
  // }

  responseGoogle(response) {
    console.log(response);
  }
  responseGoogleSuccess(response) {

    axios.get("http://email-smartbot.herokuapp.com/meeting")
    .then((response)=> {
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
        newEvent['id']=data.length+i;
        newEvent['pk']=event.pk;
        newEvent['busy']=event.busy;
        if(event.busy){
          newEvent['title']='Busy'
        }else{
          newEvent['title']=event.client.name
        }
        return newEvent;
      });
      this.setState({
        events:newEvents
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
          newEvent['id']=data.length+1;
          newEvent['pk']=event.pk;
          newEvent['busy']=event.busy;
          if(event.busy){
            newEvent['title']='Busy'
          }else{
            newEvent['title']=event.client.name
          }
          return newEvent;
        });
        newEvents.forEach((event)=>{
          let dat = data.filter(d=>d.pk === event.pk);
          if(dat.length === 0)
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
      axios.get("http://email-smartbot.herokuapp.com/meeting")
      .then((response)=> {
        let data = this.state.events;
        let newEvents = response.data;
        // console.log(response);
        newEvents = newEvents.map((event,i)=>{
          let start = event.start_time;
          start = event.date+'T'+start;
          let end = event.end_time;
          end = event.date+'T'+end;
          let newEvent = {};
          newEvent['start']=new Date(Date.parse(start));
          newEvent['end']=new Date(Date.parse(end));
          newEvent['id']=data.length+1;
          newEvent['pk']=event.pk;
          newEvent['busy']=event.busy;
          if(event.busy){
            newEvent['title']='Busy'
          }else{
            newEvent['title']=event.client.name
          }
          return newEvent;
        });
        console.log(newEvents);
        this.setState({
          events:newEvents
        })
      })
      addResponseMessage(response.result.fulfillment.speech)
    })
    .catch((error) => {console.log(error);})

  }

  render() {
    return this.renderLaptop();
  }
}
