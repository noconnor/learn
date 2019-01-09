import React from 'react';
import ReactDOM from 'react-dom';
import AppWithAuth from './AppWithAuth';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppWithAuth />, div);
});
