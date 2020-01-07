import React from 'react';
import { Link } from 'react-router-dom';

class Item extends React.Component {
  static defaultProps = {
    consumer: {}
  };

  render () {
    return (
        <div className="card">
            <div className="card-header" id={"header-" + this.props.index}>
                <h5 className="mb-0">
                    <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={"#collapse-" + this.props.index}
                        aria-expanded="true"
                        aria-controls={"collapse" + this.props.index}
                    >
                        #{this.props.index + 1} {
                            this.props.consumer.company
                                ? this.props.consumer.company
                                : `${this.props.consumer.name.first} ${this.props.consumer.name.last}`
                        }
                    </button>
                </h5>
            </div>

            <div
                id={"collapse-" + this.props.index}
                className="collapse"
                aria-labelledby={"header-" + this.props.index}
                data-parent="#accordion"
            >
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Straße</td>
                            <td>{this.props.consumer.adress.street} {this.props.consumer.adress.number}</td>
                        </tr>
                        <tr>
                            <td>Ort</td>
                            <td>{this.props.consumer.adress.zipcode} {this.props.consumer.adress.city}</td>
                        </tr>
                        <tr>
                            <td>Grubengröße</td>
                            <td>{this.props.consumer.pitSize} m³</td>
                        </tr>
                        <tr>
                            <td>Details</td>
                            <td>
                                <Link
                                    to={`/fahrten/${this.props.id}`}
                                    className="btn btn-sm btn-outline-info"
                                >
                                    Anzeigen
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    );
  }
}

export default Item;
