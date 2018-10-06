// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
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

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to="/">
                React example
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/students">
                Students
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
      <ul>
        {students.map(student => (
          <li key={student.email}>
            <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.email}>
              {student.firstName} {student.lastName}
            </NavLink>
          </li>
        ))}
      </ul>
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
      <div>
        <ul>
          <li>First name: {student.firstName}</li>
          <li>Last name: {student.lastName}</li>
          <li>Email: {student.email}</li>
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
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route path="/students/:email" component={StudentDetails} />
      </div>
    </HashRouter>,
    root
  );
