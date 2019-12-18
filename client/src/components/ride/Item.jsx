import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return (
        <div class="card">
            <div class="card-header" id={"header-" + props.index}>
                <h5 class="mb-0">
                    <button
                        class="btn btn-link"
                        data-toggle="collapse"
                        data-target={"#collapse-" + props.index}
                        aria-expanded="true"
                        aria-controls={"collapse" + props.index}
                    >
                        #{props.index} {
                            props.consumer.company
                                ? props.consumer.company
                                : `${props.consumer.name.first} ${props.consumer.name.last}`
                        }
                    </button>
                </h5>
            </div>

            <div
                id={"collapse-" + props.index}
                class="collapse"
                aria-labelledby={"header-" + props.index}
                data-parent="#accordion"
            >
                <div class="card-body">
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
        </div>
    );
}

export default Item;