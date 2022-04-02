import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';

require('dotenv').config();

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      login: this.login,
      logout: this.logout,
      //user: {capabilities:[]},
      capabilities:[],
    };
  }

  can = (capability) => {
    return this?.state?.capabilities?.includes(capability);
  }

  login = async (username, password) => {      
    try{const response = await superagent.post(`${process.env.REACT_APP_PORT}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
    let newcap= response.body.capabilities;
    this.validateToken(response.body.token,newcap);
    console.log(response)
  }catch(error){
   console.log(error.message)
  }
   
  }

  logout = () => {
    this.setLoginState(false, null, []);
  };
  
//   logout = () => {
//     this.setLoginState(false, null, []);
//     cookie.remove('auth');
//     cookie.remove('cap')
//   };

  validateToken =(token,newcap) => {
    try {
      //let user = jwt.verify(token, process.env.REACT_APP_SECRET||"ali");
      this.setLoginState(true, token, newcap);
    }
    catch (e) {
      this.setLoginState(false, null, []);
      console.log('Token Validation Error', e);
    }

  };

//   setLoginState = (loggedIn, token, capabilities) => {
//     cookie.save('auth', token);
//     this.setState({ token, loggedIn, capabilities });
//   };
  
  setLoginState = (loggedIn, token, capabilities) => {
    cookie.save('auth', token);
    cookie.save('cap', capabilities);
    this.setState({ token, loggedIn, capabilities });
  };

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(token);
  }
//    componentDidMount() {
//     const qs = new URLSearchParams(window.location.search);
//     const cookieToken = cookie.load('auth');
//      const cookieCap = cookie.load('cap');

//     const token = qs.get('token') || cookieToken || null;
//     const newcap = qs.get('capabilities') || cookieCap || [];

//     this.validateToken(token,newcap);
//      if(token === null || newcap === []){
//    this.setState({ token:null, loggedIn:false, capabilities:[] });
//   }
//    }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
