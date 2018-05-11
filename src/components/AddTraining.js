import React from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: '', duration: '',  activity: ''};
    }
  
    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }
  
    // Save training and close modal
    handleSubmit = (event) => {
        event.preventDefault();
        var fixDate = this.state.date + ":00.000+0000";
        var newTraining = {date: fixDate, duration: this.state.duration, activity: this.state.activity, customer: this.props.customer};
        this.props.addTraining(newTraining);
        this.refs.simpleDialogTraining.hide();
    }
  
    render() {
      const addTrainingDialog = {
        width: '40%',
        height: '150px',
        marginTop: '-200px',
        marginLeft: '-20%',
      };
  
      return (
        <div>
          <SkyLight dialogStyles={addTrainingDialog} hideOnOverlayClicked ref="simpleDialogTraining">
                <div className="card" style={{"width": "95%"}}>
                <div className="card-body">
                <h5 className="card-title">New Training Session:</h5>
                <form>
                    <div className="form-group">
                        <input type="datetime-local" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="number" placeholder="Duration (min)" className="form-control" name="duration" onChange={this.handleChange}/>
                    </div>
                    
  
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save this session</button>
                    </div>
                </form>
                </div>
                </div>
          </SkyLight>
          <button className="btn btn-default btn-primary" onClick={() => this.refs.simpleDialogTraining.show()}>Add Training</button>
        </div>
      );
    }
  }
  
  export default AddTraining;