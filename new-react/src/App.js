import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Map from "./components/Map/Map";
import Loader from "./components/Map/Loader";

function App() {

  const [eventData, setEventData] = useState([]);

  const [loading, setLoading] = useState(true)
  const [ state, setState ] = useState({
    message: ''
  })

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8080/api/data") // You can simply make your requests to "/api/whatever you want"
        .then((response) => {
          // handle success
          console.log(response.data);
          setEventData(response.data);
          setLoading(false);
        });
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  console.log("eventData", eventData);
  console.log("loading", loading);
  
    const fetchActivities = () => {
    axios.get('/api/activities') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      setState({
        message: response.data.message,
        act: response.data.act[6].name
      });
    }) 
  }


  return (
    <div className="App">
      <h1>the ITinerary</h1>
      { !loading ? <Map eventData={eventData} /> : <Loader /> }

      <h1>{ state.message }</h1>
        <h1>{ state.act }</h1>
        <button onClick={fetchActivities} >
          Fetch Data
        </button>  

    </div>
  );
}

//   fetchData = () => {
//     axios.get('/api/activities') // You can simply make your requests to "/api/whatever you want"
//     .then((response) => {
//       // handle success
//       console.log(response.data) // The entire response from the Rails API

//       console.log(response.data.message) // Just the message
//       this.setState({
//         message: response.data.message,
//         act: response.data.act[6].name
//       });
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>{ this.state.message }</h1>
//         <h1>{ this.state.act }</h1>
//         <button onClick={this.fetchData} >
//           Fetch Data
//         </button>
//       </div>
//     );
//   }
// }

export default App;
