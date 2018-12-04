import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddTraining from './AddTraining'


class CustomerTrainings extends Component {
      state = { trainings: []};

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
    })
  }


  addTraining = () => {

    const trainingToJSON = {
     date: this.state.trainings.date,
     activity: this.state.trainings.activity,
     duration: this.state.trainings.duration,
     customer: this.state.trainings.customer
   };

    fetch('https://customerrest.herokuapp.com/api/trainings',
     {  method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainingToJSON)
      })
      .then(res => this.loadTrainings())
      .catch(err => console.error(err))
    }

  deleteTraining = (id) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this training?',
      buttons: [
        {
          label: 'Yes',
            onClick: () => {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: 'DELETE'})
            .then(res => this.loadTrainings())
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
          <AddTraining addTraining={this.addTraining} loadTrainings={this.loadTrainings} />
      </div>
      <ReactTable data={this.state.trainings} defaultPageSize={15}
       columns = {[
          {
            columns: [
              {
                accessor: "links.href",
                show: false
              },
              {
                Header: "First name",
                accessor: "customer.firstname",
                width: 250,
              },
              {
                Header: "Last name",
                accessor: "customer.lastname",
                width: 250,
              },
              {
                Header: "Customer ID",
                accessor: "id",
                width: 100,
              },
              {
                Header: "Date",
                accessor: "date",
                width: 300,
                Cell: row => {
                 return (
                  <div>{moment(row.original.date).format('DD/MM/YYYY HH:mm ')}</div>
                 )}
              },
              {
                Header: "Duration",
                accessor: "duration",
                width: 120,
              },
              {
                Header: "Activity",
                accessor: "activity",
                width: 250,
              },
              {
                id: 'button',
                sortable: false,
                filterable: false,
                width: 200,
                accessor: 'id',
                Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.deleteTraining(value)}}>Delete</button>)
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

export default CustomerTrainings;
