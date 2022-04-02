import React from 'react';
import Settings from './context/settingsContext.js';
import ToDo from './components/todo/todo.js';
import Header from './components/header.js';
import LoginProvider from './components/auth/context';

 import 'normalize.css';
 import '@blueprintjs/core/lib/css/blueprint.css'
 import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import Footer from './components/footer.js';
import SettingForm from './components/SettingForm.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class App extends React.Component {
  render() {
    return (
      <Router>
      <LoginProvider>
         <Header/>
         <Settings>
      <Switch>
      <Route exact path="/">      
            <ToDo />         
         </Route> 
         <Route path="/form">
           <SettingForm/>
         </Route>
         </Switch>
         <Footer/> 
      </Settings>
      </LoginProvider>

       </Router>
    );
  }
}