import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

//press rcc to get the component snippet
class Customers extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.loadCustomers();
  }

  // FETCH customers from REST API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({customers: responseData.content});
    })
  }

  // Delete customer
  letsDelete = (idUrl) => {
    fetch(idUrl, {method: 'DELETE'})
    .then(res => this.loadCustomers() )
    .catch(err => console.error(err))

    toast.error("Customer deleted", {position: toast.POSITION.TOP_RIGHT});
  }

  // POST new customer
  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',{   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
    })
    .then(
      toast.success("Customer successfully added", {
        position: toast.POSITION.TOP_RIGHT
      })
    )
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  // Update customer
  updateCustomer(customer, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer)
    })
    .then(
      toast.warn("Changes saved", {
        position: toast.POSITION.TOP_RIGHT
      })         
    )
    .catch( err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }

  // POST new training
  addTraining(training) {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training)
      }
    )
    .then(
      toast.info("Training scheduled! View training schedule for training session list", {
        position: toast.POSITION.TOP_RIGHT
      })         
    )
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="container">
        <h2>Customers:</h2>
        <ToastContainer autoClose={2700}/> 
        <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
        

        <ReactTable
          filterable
          data={this.state.customers}
          defaultPageSize={5}
          className="-striped -highlight"
          columns={[
            {
              columns: [
                {
                  accessor: "links[0].href",
                  show: false,
                  Cell: this.renderEditable
                },
                { // Schedule training button
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 125,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<AddTraining addTraining={this.addTraining} loadCustomers={this.loadCustomers} customer={(value)} />)
                },
                {
                  Header: "Name",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Surname",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.renderEditable
                },
                {
                  Header: "E-mail",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.renderEditable
                },
                { //Update edited customer
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value, row}) => (<button className="btn btn-default btn-warning" onClick={()=>{this.updateCustomer(row, value)}}>Update</button>)
                },
                { //delete customer
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-danger" onClick={()=>{this.letsDelete(value)}}>Delete</button>)
                }
              ]
            }
          ]}
        >
        </ReactTable>
               
      </div>
    );
  }
}

export default Customers;