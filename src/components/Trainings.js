import React, { Component } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


export default class Trainings extends Component {
  
  constructor(props){
    super(props);
    this.state = {trainings: []};
  }
  
  componentDidMount(){
    this.loadTrainings();
    moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(res => res.json())
    .then(resData => {
      this.setState({trainings: resData.content})
    })
  }

  //Delete
  deleteRow = (link) => {
    fetch(link, {method: 'DELETE'})
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))

    toast.error("Delete succeeded", {position: toast.POSITION.TOP_CENTER});
  }

  render() {
    return (
      <div className="container">
        <ToastContainer autoClose={2000}/>
        <h2>Training Schedule</h2>

        <ReactTable
          filterable
          data={this.state.trainings}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  accessor: "date"
                },                
                {
                  Header: "Activity",
                  accessor: "activity"
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                  Cell: ({value}) => (value + " min")
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-danger" onClick={()=>{this.deleteRow(value)}}>Delete</button>)
                }
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />

      </div>
    )
  }
}
