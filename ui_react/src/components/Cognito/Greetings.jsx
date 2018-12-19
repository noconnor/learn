import React from 'react';
import {Navbar, Nav}  from 'react-bootstrap';
import { AuthPiece } from "aws-amplify-react";
import { NavItem }  from 'react-bootstrap';
// import { I18n } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import 'App.css';

class Banner extends AuthPiece {
    constructor(props){
        super(props);
        this._validAuthStates = ["signedIn"];
        this.signOut = this.signOut.bind(this);
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
    showComponent(theme){
        return (
            <div className="menu">
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand">Explorer</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem onClick={() => this.signOut()}>
                  Sign Out
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}
export default Banner;