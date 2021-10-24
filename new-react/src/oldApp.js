import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/activities') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message,
        act: response.data.act[6].name
      });
    }) 
  }

  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <h1>{ this.state.act }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>        
      </div>
    );
  }
}

export default App;