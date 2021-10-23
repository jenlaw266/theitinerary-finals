import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Map from './components/Map';
import Loader from './components/Loader';

// class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     message: 'the Itinerary'
  //   }
  // }

  // fetchData = () => {
  //   axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log(response.data) // The entire response from the Rails API

  //     console.log(response.data.message) // Just the message
  //     this.setState({
  //       message: response.data.message
  //     });
  //   }) 
  // }
  
//   render() {
//     return (
//       <div className="App">
//         <h1>the ITinerary</h1>
//         {/* <button onClick={this.fetchData} >
//           Fetch Data
//         </button>         */}
//         <Map />
//       </div>
//     );
//   }
// }

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/api/data') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data)
        setEventData(response.data);
        setLoading(false)
      }) 
    }
  
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);
    
    return () => clearTimeout(timer)
  }, [])

  console.log("eventData", eventData)
  console.log("loading", loading)

  return (
    <div className="App">
      <h1>the ITinerary</h1>
      {/* <button onClick={this.fetchData} >
        Fetch Data
      </button>         */}
      { !loading ? <Map eventData={eventData} /> : <Loader /> }
    </div>
  );
}

export default App;
