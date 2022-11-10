import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import ReactSite from './components/ReactSite'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

const store = createStore(reducer)
// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Provider store={store} className="container">
      <NavBar/>
      <ReactSite/>
      <Footer/>
  </Provider>,
  document.getElementById('root')
);

