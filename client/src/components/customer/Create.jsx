import React from 'react';
import { Redirect } from 'react-router-dom';

import FetchError from '../shared/FetchError';
import Form from './Form';
import { baseUrl } from '../../utils/service';

class Create extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sex: 0,
      nameFirst: '',
      nameLast: '',
      street: '',
      number: '',
      city: '',
      zipcode: '',
      startDate: new Date(),

      isError: false,
      isSaved: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    let value = {};
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
      const url = `${baseUrl}customers/`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });

      this.setState({
        isSaved: true,
      })

    } catch {
      this.setState({
        isError: true,
      });
    }
  }

  async fetchCars() {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/cars/`;
      const response = await fetch(url);
      const cars = response.json();

      this.setState({
        cars
      });

    } catch {
      this.setState({
        isError: true
      });
    }
  }

  redirect() {
    const isSaved = this.state.isSaved;

    if (isSaved) {
      return (
        <Redirect to='/' />
      );
    }
  }

  componentDidMount() {
    this.fetchCars();
  }

  render() {
    return (
      <div className='container'>
        <div className='pb-2 mt-4 mb-4 border-bottom'>
          <h1>Kunden anlegen</h1>
        </div>
        {this.state.isError ? <FetchError /> : this.renderForm()}
      </div>
    );
  }

  renderForm() {
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
          cars={state.cars}
          notes={state.notes}

          handleChange={this.handleChange}
          handleDate={this.handleDate}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>


    );
  }
}

export default Create;