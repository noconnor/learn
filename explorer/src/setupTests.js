import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

configure({ adapter: new Adapter() });