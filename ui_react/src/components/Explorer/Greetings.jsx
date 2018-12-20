import React, {Component} from 'react';
import {Navbar, Nav}  from 'react-bootstrap';
import LogoutLink from 'components/Cognito/SignOut'
import 'App.css';

class Menu extends Component {
    render(){
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
                  <LogoutLink {...this.props} />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}
export default Menu;