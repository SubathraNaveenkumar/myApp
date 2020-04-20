import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import login_admin from './components/login_admin';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import teachers_list from './components/teachers_list';
import add_teacher from './components/add_teacher';
import edit_teacher from './components/edit_teacher';
import login_student from './components/login_student';
import login_teacher from './components/login_teacher';
import students_list from './components/students_list';
import add_student from './components/add_student';
import edit_student from './components/edit_student';
import Navigation from './components/Navigation';
import home from './components/home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={login_admin}></Route>
        <Route exact path='/login-student' component={login_student}></Route>
        <Route exact path='/login-teacher' component={login_teacher}></Route>

        <Route exact path='/teachers-list' component={teachers_list}></Route>
        <Route exact path='/teachers-list/:k' component={teachers_list}></Route>
        <Route exact path='/students-list' component={students_list}></Route>
        <Route exact path='/students-list/:j' component={students_list}></Route>

        <Route exact path='/add-teacher' component={add_teacher}></Route>
        <Route exact path='/edit-teacher/:i' component={edit_teacher}></Route>
        
        <Route exact path='/add-student' component={add_student}></Route>
        <Route exact path='/edit-student/:i' component={edit_student}></Route>

        <Route exact path='/Navigation' component={Navigation}></Route>
        <Route exact path='/home' component={home}></Route>
        <Switch>
          <Route exact path='/:id'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
