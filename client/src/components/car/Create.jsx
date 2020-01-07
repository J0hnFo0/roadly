import React from 'react';
import { Redirect } from 'react-router-dom';

import FetchError from '../shared/FetchError';
import Form from './Form';
import { baseUrl } from '../../utils/service';

class Create extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      brand: '',
      license: '',

      isError: false,
      isSaved: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    let value = {};
    value[e.target.id] = e.target.value;

    this.setState(value);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const state = this.state;
    const car = {
      name: state.name,
      brand: state.brand,
      license: state.license
    };

    const url = `${baseUrl}cars/`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    }).then((response, carObj) => {
      if (response.status === 200) {
        this.setState({
          isError: false,
          isSaved: true
        });
      } else {
        this.setState({
          isError: true,
          isSaved: false
        });
      }
    }).catch((error) => {
      this.setState({
        isError: true,
        isSaved: false
      });
    });
  }

  async fetchCars() {
    try {
      const url = `${baseUrl}cars/`;
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
        <Redirect to='/fahrzeuge' />
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
          <h1>Fahrzeug anlegen</h1>
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

          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default Create;
