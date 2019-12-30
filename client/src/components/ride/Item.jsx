import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return (
        <div className="card">
            <div className="card-header" id={"header-" + props.index}>
                <h5 className="mb-0">
                    <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={"#collapse-" + props.index}
                        aria-expanded="true"
                        aria-controls={"collapse" + props.index}
                    >
                        #{props.index + 1} {
                            props.consumer.company
                                ? props.consumer.company
                                : `${props.consumer.name.first} ${props.consumer.name.last}`
                        }
                    </button>
                </h5>
            </div>

            <div
                id={"collapse-" + props.index}
                className="collapse"
                aria-labelledby={"header-" + props.index}
                data-parent="#accordion"
            >
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Straße</td>
                            <td>{props.consumer.adress.street} {props.consumer.adress.number}</td>
                        </tr>
                        <tr>
                            <td>Ort</td>
                            <td>{props.consumer.adress.zipcode} {props.consumer.adress.city}</td>
                        </tr>
                        <tr>
                            <td>Grubengröße</td>
                            <td>{props.consumer.pitSize} m³</td>
                        </tr>
                        <tr>
                            <td>Details</td>
                            <td>
                                <Link
                                    to={`/fahrten/${props.id}`}
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

export default Item;