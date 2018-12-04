import React from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';

class AddTraining extends React.Component {
  constructor(props) {
      super(props);
      this.state = {date: '', activity: '', duration: '', customer: []};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  handleSubmit = (event) => {
      event.preventDefault();
      var newTraining = {date: moment(this.state.date, 'DD/MM/YYYY HH:mm ', true), activity: this.state.activity,
                         duration: this.state.duration, customer: this.state.customer};
      this.props.addTraining(newTraining);
      this.props.loadTrainings();
      this.refs.simpleDialog.hide();
  }


  render() {

    const addTrainingDialog = {
      width: '300px',
      height: '200px',
      marginTop: '-310px',
      marginLeft: '-11%',
    };

  return (
    <div>
      <SkyLight dialogStyles={addTrainingDialog} hideOnOverlayClicked ref="simpleDialog">
            <div className="card" style={{"width": "95%"}}>
            <div className="card-body">
            <h5 className="card-title">Create new training</h5>
            <form>
                <div className="form-group">
                    <input type="text" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Customer(ID)" className="form-control" name="customer" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                </div>
            </form>
            </div>
            </div>
      </SkyLight>
      <div className="col-md-2">
      <button style={{'margin': '10px', 'font-size': '16px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New training</button>
      </div>
    </div>
  );
}




}

export default AddTraining;
