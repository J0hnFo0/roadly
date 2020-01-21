import React from 'react';
import { Link } from 'react-router-dom';

import DatePicker from '../shared/DatePicker';

class CarForm extends React.PureComponent {
  render() {
    const props = this.props;

    return (
      <form onSubmit={props.handleSubmit} >
        {this.renderMasterData()}
        {this.renderButtons()}
      </form>
    );
  }

  renderMasterData() {
    const props = this.props;

    return (
      <React.Fragment>
        <div className="form-row">
          <div className='form-group col-md-12'>
            <label htmlFor='carName'>Name</label>
            <input
              type='text'
              id='name'
              className='form-control'
              value={props.name}
              onChange={props.handleChange}
              required={true}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='carBrand'>Hersteller</label>
            <input
              type='text'
              id='brand'
              className='form-control'
              value={props.brand}
              onChange={props.handleChange}
              required={true}
            />
          </div>

          <div className='form-group col-md-6'>
            <label htmlFor='license'>KFZ-Kennzeichen</label>
            <input
              type='text'
              className='form-control'
              id='license'
              value={props.license}
              onChange={props.handleChange}
              required={false}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderButtons() {
    return (
      <React.Fragment>
        <button
          type='submit'
          className='btn btn-primary mr-2'
        >
          Übernehmen
        </button>
        <Link
          to='/fahrzeuge'
          className='btn btn-secondary mr-2'
        >
          Abbrechen
          </Link>
        {this.renderDeleteButton()}
      </React.Fragment>

    );
  }

  renderDeleteButton() {
    const id = this.props.id;

    if (!id) {
      return;
    }

    return (
      <button
        className='btn btn-danger mr-2'
        onClick={this.props.handleDelete}
      >
        Löschen
      </button>
    )
  }


}

export default CarForm;
