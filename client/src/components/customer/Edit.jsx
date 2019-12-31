import React from 'react';
import { Redirect } from 'react-router-dom';

import FetchError from '../shared/FetchError';
import Form from './Form';
import { baseUrl } from '../../utils/service';
import { dateToString } from '../../utils/format-date';
import { states } from '../../utils/states';

class Edit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date,

      isDeleted: false,
      isError: false,
      isSaved: false,
    }

    this.delete = this.delete.bind(this);
    this.fetchCustomer = this.fetchCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async delete() {
    const id = this.props.id;

    const url = `${baseUrl}customers/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });

    this.setState({
      isDeleted: true,
    });
  }

  async fetchCustomer() {
    const id = this.props.id;

    try {
      const response = await fetch(`${baseUrl}customers/${id}`)
      const customer = await response.json();

      this.setState({
        id: customer._id,
        company: customer.company,
        nameFirst: customer.name.first,
        nameLast: customer.name.last,
        customerNumber: customer.customerNumber,
        street: customer.adress.street,
        number: customer.adress.number,
        city: customer.adress.city,
        zipcode: customer.adress.zipcode,
        startDate: customer.startDate,
        tavArea: customer.tavArea,
        pitSize: customer.pitSize,
        interval: customer.interval,
        car: customer.car,
        notes: customer.notes
      });

    } catch {
      this.setState({
        isError: true,
      });
    }
  }

  async fetchRides() {
    const id = this.state.id;

    try {
      const response = await fetch(`${baseUrl}rides/consumer/${id}`);
      const rides = await response.json();

      this.setState(rides);

    } catch {
      this.setState({
        isError: true
      });
    }
  }

  handleChange(e) {
    e.preventDefault();

    let value = {}
    value[e.target.id] = e.target.value;

    this.setState(value);
  }

  handleDate = date => {
    this.setState({
      startDate: date
    });
  };

  async handleSubmit(e) {
    e.preventDefault();

    const id = this.state.id;

    const state = this.state;
    const customer = {
      company: state.company,
      name: {
        first: state.nameFirst,
        last: state.nameLast,
      },
      customerNumber: state.customerNumber,
      adress: {
        street: state.street,
        number: state.number,
        city: state.city,
        zipcode: state.zipcode,
      },
      startDate: state.startDate,
      tavArea: state.tavArea,
      pitSize: state.pitSize,
      interval: state.interval,
      car: state.car,
      notes: state.notes,
    };

    try {
      const url = `${baseUrl}customers/${id}`;
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });

      this.setState({
        isSaved: true,
      });

    } catch {
      this.setState({
        isError: true,
      });
    }
  }

  redirect() {
    const isDeleted = this.state.isDeleted;
    const isSaved = this.state.isSaved;

    if (isDeleted || isSaved) {
      return (
        <Redirect to='/' />
      );
    }
  }

  async componentDidMount() {
    await this.fetchCustomer();
    this.fetchRides();
  }

  render() {
    return (
      <div className='container'>
        <div className="pb-2 mt-4 mb-4 border-bottom">
          <h1>Kundendaten bearbeiten</h1>
        </div>
        {this.state.isError
          ? <FetchError />
          : this.renderContent()

        }
      </div>
    );
  }

  renderContent() {
    return (
      <React.Fragment>
        <div className="mb-3">
          {this.renderForm()}
         <hr /> 
        </div>
        <div className="mb-5">
          {this.renderRides()}
        </div>
      </React.Fragment>
    )
  }

  renderForm() {
    if (!this.state) {
      return;
    }

    const state = this.state;
    return (
      <React.Fragment>
        {this.redirect()}
        <Form
          id={state.id}
          company={state.company}
          nameFirst={state.nameFirst}
          nameLast={state.nameLast}
          customerNumber={state.customerNumber}
          street={state.street}
          number={state.number}
          city={state.city}
          zipcode={state.zipcode}
          startDate={state.startDate}
          tavArea={state.tavArea}
          pitSize={state.pitSize}
          interval={state.interval}
          car={state.car}
          notes={state.notes}

          handleChange={this.handleChange}
          handleDate={this.handleDate}
          handleSubmit={this.handleSubmit}
          handleDelete={this.delete}
        />
      </React.Fragment>
    );
  }

  renderRides() {
    if (!this.state.rides) {
      return;
    }

    const rides = this.state.rides.map((x, i) =>
      <React.Fragment>
        <tr id={i}>
          <td>{i}</td>
          <td>{dateToString(x.date)}</td>
          <td>{states[x.state]}</td>
        </tr>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <h4>Bevorstehende Abholungen</h4>
        <div className="table">
          <table className="table">
            <thead>
              <th>#</th>
              <th>Datum</th>
              <th>Status</th>
            </thead>
            <tbody>
              {rides}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;
