import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';



class CalendarPage extends Component {

  state = {
    events: [
      // {
      //   start: new Date(1525515300000), //This is the raw unix time from api get trainings
      //   end: new Date(1525515300000 + 60*60000), //same raw unix + duration(30 in this case) * 60000 (which turns minutes to miliseconds for unix)
      //   title: "Spin class" //activity name
      // }
    ]
  };

  componentDidMount() {
    this.createDateArray();
  }

  createDateArray = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      var eventArray = [];
      for (var i=0; i < responseData.length; i++){
        eventArray.push({
          start: new Date(responseData[i].date),
          end: new Date(responseData[i].date + responseData[i].duration*60000),
          title: responseData[i].activity
        });
      }
      this.setState({events: eventArray});
    })
  }

    
  render() {

    return (
      <div className="container">
        <h2>
            Training Calendar
        </h2>
        

        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "65vh" }}
        />

      </div>
    )
  }
}

export default CalendarPage;
