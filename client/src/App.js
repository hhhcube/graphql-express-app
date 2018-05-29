import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from 'react-apollo';
//import logo from './logo.svg';
//import './App.css';
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});
class App extends Component {
  render() {
  /* original
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  */
    return(
      // Dynamically outputting data {}
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
