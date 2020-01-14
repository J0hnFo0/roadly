import React from 'react';
import { Redirect } from 'react-router-dom';

import FetchError from '../shared/FetchError';
import Form from './Form';
import { baseUrl } from '../../utils/service';

class Edit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      brand: '',
      license: '',

      isDeleted: false,
      isError: false,
      isSaved: false,
    }

    this.delete = this.delete.bind(this);
    this.fetchCar = this.fetchCar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async delete() {
    const id = this.props.id;

    const url = `${baseUrl}cars${id}`;
    await fetch(url, {
      method: 'DELETE',
    });

    this.setState({
      isDeleted: true,
    });
  }

  async fetchCar() {
    const id = this.props.id;

    try {
      const response = await fetch(`${baseUrl}cars/${id}`)
      const car = await response.json();

      this.setState({
        id: car._id,
        name: car.name,
        brand: car.brand,
        license: car.license
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
    const car = {
      name: state.name,
      brand: state.brand,
      license: state.license
    };

    try {
      const url = `${baseUrl}cars/${id}`;
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
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
        <Redirect to='/fahrzeuge' />
      );
    }
  }

  async componentDidMount() {
    await this.fetchCar();
    this.fetchRides();
  }

  render() {
    return (
      <div className='container'>
        <div className="pb-2 mt-4 mb-4 border-bottom">
          <h1>Fahrzeug bearbeiten</h1>
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
        </div>
      </React.Fragment>
    )
  }

  renderForm() {
    return (
      <React.Fragment>
        {this.redirect()}
        <Form
          id={this.state.id}
          name={this.state.name}
          brand={this.state.brand}
          license={this.state.license}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default Edit;
