import React from "react";
import { RadioCheck } from "../form/RadioCheck";

function Table(props) {
    const revers = [...props.dots].reverse();

    return (
        <table className="table--main">
            <thead>
                <tr>
                    <th scope="col">In area?</th>
                    <th scope="col">X</th>
                    <th scope="col">Y</th>
                    <th scope="col">R</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody className="tbody--main">
                {
                    revers.map(function (item) {
                        return (
                            <tr>
                                <td>{item.inArea ? 'Yes' : 'No'}</td>
                                <td>{(item.x).toFixed(2)}</td>
                                <td>{(item.y).toFixed(2)}</td>
                                <td>{(item.r).toFixed(1)}</td>
                                <td>{new Date(item.date).toLocaleTimeString('ru-ru', { year:"numeric", month:"short", day:"numeric"})}</td>
                                <td>{item.time}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export { Table };