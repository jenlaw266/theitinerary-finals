import "./App.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Itinerary from "./pages/Itinerary";
import Itineraries from "./pages/Itineraries";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Loader from "./components/Map/Loader";
import Chat from "./pages/Chat";
import axios from "axios";

function App() {
  const [login, setLogin] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    message: "",
  });

  useEffect(() => {
    const fetchData = () => {
      /*       axios.get("http://localhost:8080/api/activities").then((response) => {
        setEventData(response.data.act);
        setLoading(false);
      }); */
      axios.get("http://localhost:8080/api/data").then((response) => {
        setEventData(response.data);
        setLoading(false);
      });
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fetchActivities = () => {
    axios.get("/api/activities").then((response) => {
      console.log(response.data);
      console.log(response.data.message); // Just the message

      setState({
        message: response.data.message,
        act: response.data.act[6].name,
      });
    });
  };

  /* return (
    <div className="App">
      <h1>{state.message}</h1>
      <h1>{state.act}</h1>
      <button onClick={fetchActivities}>Fetch Data</button>
    </div>
  );
 */
  return (
    <Router>
      <div className="App">
        <Nav login={login} setLogin={setLogin} />
        <Layout>
          <Switch>
            <Route path="/login">
              <Login login={login} setLogin={setLogin} />
            </Route>
            <Route path="/register">
              <Login login={login} setLogin={setLogin} />
            </Route>
            <Route path="/itineraries">
              <Itineraries login={login} />
            </Route>
            <Route exact path="/itinerary/:id/map">
              {!loading ? (
                <Map login={login} eventData={eventData} />
              ) : (
                <Loader />
              )}
            </Route>
            <Route exact path="/itinerary/:id/chat">
              <Chat login={login} />
            </Route>
            <Route exact path="/itinerary/:id">
              <Itinerary login={login} eventData={eventData} />
            </Route>
            <Route exact path="/">
              <Home login={login} eventData={eventData} />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
