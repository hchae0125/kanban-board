import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import App from './App';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import toDoStore from './store';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={toDoStore}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

