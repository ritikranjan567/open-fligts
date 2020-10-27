import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
const store = createStore(rootReducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Header />
          <App />
        </Fragment>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root"),
  )
})
