import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddCustomer from './AddCustomer';


class CustomerList extends Component {
      state = { customers: [] };

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content,
      });
    })
  }

  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  deleteCustomer = (link) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this customer?',
      buttons: [
        {
          label: 'Yes',
            onClick: () => {
            fetch(link, {method: 'DELETE'})
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
          }
        },
        {
          label: 'No',
        }
      ]
    })
  }

  render() {
    return (
      <div className="App-body">
      <div className="row">
        <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
      </div>
      <ReactTable data={this.state.customers} defaultPageSize={15}
       columns = {[
          {
            columns: [
              {
                accessor: "links[0].href",
                show: false,
              },
              {
                Header: "First name",
                accessor: "firstname",
              },
              {
                Header: "Last name",
                accessor: "lastname",
              },
              {
                Header: "Street address",
                accessor: "streetaddress",
              },
              {
                Header: "Post code",
                accessor: "postcode",
              },
              {
                Header: "City",
                accessor: "city",
              },
              {
                Header: "Email",
                accessor: "email",
              },
              {
                Header: "Phone",
                accessor: "phone",
              },
              {
                id: 'button',
                sortable: false,
                filterable: false,
                width: 200,
                accessor: 'links[0].href',
                Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.deleteCustomer(value)}}>Delete</button>)
              }
            ]
          }
        ]}

         filterable
         className="-highlight" >
        </ReactTable>
      </div>
    );
  }
}

export default CustomerList;
