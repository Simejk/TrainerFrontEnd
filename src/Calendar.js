import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

//task: Add calendar page where user can see trainings (monthly, weekly, daily)
const localizer = BigCalendar.momentLocalizer(moment) // other option: globalizeLocalizer


class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {events: [], trainings: []};
  }

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData,
      });
      this.eventCreation();
    })
  }

  eventCreation = () => {
    let eventList = [];

    for (let i = 0; i < this.state.trainings.length; i++){
      eventList[i] = {
        eventStart: new Date(this.state.trainings[i].date),
        eventEnd: new Date(this.state.trainings[i].date  + this.state.trainings[i].duration),
        title: this.state.trainings[i].activity,
      }
      this.setState({events: eventList})

    }
  }

  render() {
    return (
    <div>
      <h1>Calendar</h1>
        <BigCalendar style={{height: 700, padding: 5}}
          views={["month", "week", "day"]}
          localizer={localizer}
          events={this.state.events}
          startAccessor="eventStart"
          endAccessor="eventEnd" />
    </div>
   );
  }






}

export default Calendar;
