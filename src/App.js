import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import UserNav from './components/UserNav';
import Home from './components/home';
import Logout from './components/Logout';
import Register from './components/Register';
import Redflags from './components/Redflags';
import Login from './components/Login';
import { SingleReport } from './components/SingleReport';

function App() {
  return (
    <BrowserRouter>
      <div>
        <UserNav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/logout' component={Logout} />
          <Route path='/redflag/:id' component={SingleReport} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/redflag/all' component={Redflags} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
