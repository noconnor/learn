import React from 'react';
import { AuthPiece } from "aws-amplify-react";
import { NavItem }  from 'react-bootstrap';
import Auth from '@aws-amplify/auth';
import 'App.css';

class LogoutLink extends AuthPiece {
    constructor(props){
        super(props);
        this._validAuthStates = ["signedIn"];
        this.signOut = this.signOut.bind(this);
        this.state = {
            authState: props.authState,
            authData: props.authData
        };
    }
    async signOut(){
        try{
          await Auth.signOut()
          this.changeState('signedOut');
          console.log("Signed out");
        } catch(e){
          this.error(e);
        }
    }
    render(){
        return (
          <NavItem onClick={() => this.signOut()}>
          Sign Out
          </NavItem>
        );
    }
}
export default LogoutLink;