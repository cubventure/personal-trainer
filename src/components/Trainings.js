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
    this.loadFullTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(res => res.json())
    .then(resData => {
      this.setState({trainings: resData.content})
    })
  }

    loadFullTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(resData => {
        this.setState({trainings: resData})
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
                  accessor: "date",
                  Cell: props => <span>{moment.utc(props.value).format('DD.MM.YYYY hh:mm a')}</span>
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
                  Header: "Customer",
                  accessor: "customer.firstname"
                },
                {
                  Header: "Surname",
                  accessor: "customer.lastname"
                },
                {
                  Header: "Phone",
                  accessor: "customer.phone"
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'id',
                  name: 'customer',
                  Cell: ({value}) => (<button className="btn btn-default btn-danger" onClick={()=>{this.deleteRow('https://customerrest.herokuapp.com/api/trainings/' + value)}}>Delete</button>)
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
