/*global expect*/
import React from 'react';
import App from './App';
import Menu from 'components/Explorer/Greetings'
import ExplorerForm from 'components/Explorer/Form'
import { shallow } from 'enzyme';
import { render, waitForElement } from 'react-testing-library';

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
describe("App", () =>{
  
  let props;
  let liveApp;
  
  const app = () => {
    if (!liveApp) {
      liveApp = shallow(<App {...props} />);
    }
    return liveApp;
  }
  
  beforeEach(() => {
    props = {
      authState: undefined,
    };
    liveApp = undefined;
  });
  
  describe("App not logged in", () => {
    it('when not logged in component should not render', () => {
      expect(app().html()).toBeNull();
    });  
  });
  
  describe("App logged in", () => {

    beforeEach(() => {
      props.authState = "signedIn";
    });

    describe("menu component", () => {
      
      it('menu component should render', () => {
        expect(app().find(Menu).length).toBe(1);
      });
      
      it('menu component should inherit props', () => {
        const menu = app().find(Menu);
        expect(menu.props().authState).toBe(props.authState);
      });
      
    });
    
    describe("explorer form", () => {
      
      it('explorer form component should render', () => {
        expect(app().find(ExplorerForm).length).toBe(1);
      });
      it('explorer form component should inherit props', () => {
        const explorer = app().find(ExplorerForm);
        expect(explorer.props().authState).toBe(props.authState);
      });
      
    });
    
  });
  
});
