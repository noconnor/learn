/*global expect*/
import React from 'react';
import App from './App';
import Menu from 'components/Explorer/Greetings'
import ExplorerForm from 'components/Explorer/Form'
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
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
  
  describe("when the app is not logged in", () => {
    it('component should not render', () => {
      expect(app().html()).toBeNull();
    });  
  });
  
  describe("when the app is logged in", () => {

    beforeEach(() => {
      props.authState = "signedIn";
    });

    // Example only, see case against https://engineering.ezcater.com/the-case-against-react-snapshot-testing
    it("should render as expected", () => {
      const tree = renderer.create(<App {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    
    // *** instead of snapshot *** 
    it("always renders a div", () => {
      const divs = app().find("div");
      expect(divs.length).toBeGreaterThan(0);
    });
    
    describe("the rendered div", () => {
      it("contains everything else that gets rendered", () => {
        const divs = app().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children()).toEqual(app().children());
      });
    });
    // *** end instead of snapshot *** 

    describe("the menu component", () => {
      it('should be rendered', () => {
        expect(app().find(Menu).length).toBe(1);
      });
      it('should inherit authState props', () => {
        const menu = app().find(Menu);
        expect(menu.props().authState).toBe(props.authState);
      });
      
    });
    
    describe("the explorer form component", () => {
      it('should be rendered', () => {
        expect(app().find(ExplorerForm).length).toBe(1);
      });
      it('should inherit authState props', () => {
        const explorer = app().find(ExplorerForm);
        expect(explorer.props().authState).toBe(props.authState);
      });
    });
    
    describe("the header element", () => {
      it('should be rendered', () => {
        expect(app().find("header").length).toBe(1);
      });
    });

    describe("the logo image element", () => {
      it('should be rendered', () => {
        expect(app().find("img.App-logo").length).toBe(1);
      });
    });
    
  });
  
});
