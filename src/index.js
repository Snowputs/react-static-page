// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import ReactDOM from 'react-dom';

class Student {
    firstName: string;
    lastName: string;
    email: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

let students = [
    new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no'),
    new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no')
];

class fag {
    fagKode: string;
    fagTittel: string;
    deltakere: Student[];

    constructor(fagKode: string, fagTittel: string, deltakere: Student[]) {
        this.fagKode = fagKode;
        this.fagTittel = fagTittel;
        this.deltakere = deltakere;
    }

}

let fagliste = [
    new fag('MUKV7001', 'Mongolsk Undervanns Kurv-veving', [students[0], students[1]]),
    new fag('VIHM1337', 'Vietnamesisk Hulemaleri Maling', [students[0]]),
    new fag('SKSK1234', 'Sjokolade Kake Spise Konkurranse', [students[1]])

];

function findFag(postad) {
    return fagliste.filter(e => e.deltakere.filter(e => e.email == postad).length > 0)
        .map(e => e.fagKode + ' ');
}

class Menu extends Component {
    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>
                        <NavLink activeStyle={{color: 'darkblue'}} exact to="/">
                            React example
                        </NavLink>
                    </td>
                    <td>
                        <NavLink activeStyle={{color: 'darkblue'}} to="/students">
                            Students
                        </NavLink>
                    </td>
                    <td>
                        <NavLink activeStyle={{color: 'darkblue'}} to="/fag">
                            Classes
                        </NavLink>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

class Home extends Component {
    render() {
        return <div>React example with static pages</div>;
    }
}

class StudentList extends Component {
    render() {
        return (

            <div>
                <div className="card-header">
                    Students
                </div>
                <ul className="list-group list-group-flush">
                    {students.map(student => (
                        <li class="list-group-item" key={student.email}>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/students/' + student.email}>
                                {student.firstName} {student.lastName}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class ClassList extends Component {
    render() {
        return (
            <div>
                <div className="card-header">
                    Classes
                </div>
                <ul className="list-group list-group-flush">
                    {fagliste.map(fag => (
                        <li className="list-group-item" key={fag.fagKode}>
                            <NavLink activeStyle={{color: 'darkblue'}} to={'/fag/' + fag.fagKode}>
                                {fag.fagKode}
                            </NavLink>
                        </li>
                    ))}</ul>

            </div>

        );
    }
}

class StudentDetails extends Component<{ match: { params: { email: string } } }> {
    render() {
        let student = students.find(student => student.email == this.props.match.params.email);
        if (!student) {
            console.error('Student not found'); // Until we have a warning/error system (next week)
            return null; // Return empty object (nothing to render)
        }
        return (
            <div className="card">
                <div className="card-header">
                    Student:
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">First name: {student.firstName}</li>
                    <li className="list-group-item">Last name: {student.lastName}</li>
                    <li className="list-group-item">Email: {student.email}</li>

                    <div className="card-footer">
                        Classes:
                    </div>
                    <li className="list-group-item">{findFag(student.email).map(e => (
                        <li className="list-group-item">
                            {e}
                        </li>
                    ))}</li>

                </ul>
            </div>
        );
    }
}

class ClassDetails extends Component<{ match: { params: { fagKode: string } } }> {
    render() {
        let faget = fagliste.find(fag => fag.fagKode == this.props.match.params.fagKode);
        if (!faget) {
            console.error('Fag not found'); // Until we have a warning/error system (next week)
            return null; // Return empty object (nothing to render)
        }
        return (
            <div className="card">
                <div className="card-header">
                    Class:
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Class Code: {faget.fagKode}</li>
                    <li className="list-group-item">Name: {faget.fagTittel}</li>

                    <div className="card-footer">
                        Students:
                    </div>
                    <li className="list-group-item">{faget.deltakere.map(e => (
                        <li className="list-group-item">
                            {e.firstName + " " + e.lastName}
                        </li>
                    ))}</li>
                </ul>
            </div>
        );
    }
}

const root = document.getElementById('root');
if (root)
    ReactDOM.render(

        <HashRouter>
            <div>
                <div className="navbar">
                    <Menu/>
                </div>
                <div className="card">
                    <Route exact path="/" component={Home}/>
                    <Route path="/students" component={StudentList}/>
                    <Route path="/fag" component={ClassList}/>
                    <div className="card">
                        <Route path="/students/:email" component={StudentDetails}/>
                        <Route path="/fag/:fagKode" component={ClassDetails}/>
                    </div>
                </div>

            </div>
        </HashRouter>,
        root
    );
