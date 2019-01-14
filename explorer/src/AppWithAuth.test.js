/*global expect*/
import React from 'react';
import { shallow } from 'enzyme';
import { Authenticator } from "aws-amplify-react";
import AppWithAuth from './AppWithAuth';
import LoginForm from 'components/Cognito/SignIn';
import RequireNewPassword from 'components/Cognito/Password';
import App from './App';


describe("AppWithAuth", () =>{

  let liveApp;
  
  const app = () => {
    if(!liveApp){
      liveApp = shallow(<AppWithAuth />);
    }
    return liveApp;
  };
  
  beforeEach(() =>{
    liveApp = undefined;
  });

  it('authenticator should be rendered', () => {
    expect(app().find(Authenticator).length).toBe(1);
  });
  
  it('authenticator should hide default components', () => {
    const authenticator = app().find(Authenticator);
    expect(authenticator.props().hideDefault).toBe(true);
  });
  
  describe("Authenticator", () => {
    let liveAuthenticator;
    
    beforeEach(() =>{
      liveAuthenticator = app().find(Authenticator);
    });
    
    describe("LoginForm", () => {
      it("should be rendered", () => {
        expect(liveAuthenticator.find(LoginForm).length).toBe(1);
      });
    });
    
    describe("RequireNewPassword", () => {
      it("should be rendered", () => {
        expect(liveAuthenticator.find(RequireNewPassword).length).toBe(1);
      });
    });
    
    describe("App", () => {
      it("should be rendered", () => {
        expect(liveAuthenticator.find(App).length).toBe(1);
      });
    });
  });

  
});




