import Box from "@mui/material/Box";
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
import Members from "./components/Members";
import useToken from "./hooks/useToken";
import LoginContext from "./context/LoginContext";
import DataContext from "./context/DataContext";

function App() {
  const { token, setToken } = useToken(null);
  const [drawer, setDrawer] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState();
  const [selectedActivities, setSelectedActivities] = useState([]);

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

  useEffect(() => {
    axios.get("http://localhost:8080/api/itineraries").then((response) => {
      const itins = response.data.itineraries;
      setTrips(itins);
      setCurrentTrip(itins[itins.length - 1]);
      setLoading(false);
    });
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

  //  return (
  //     <div className="App">
  //       <h1>{state.message}</h1>
  //       <h1>{state.act}</h1>
  //       <button onClick={fetchActivities}>Fetch Data</button>
  //     </div>
  //   );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <LoginContext.Provider value={{ token, loading, currentTrip }}>
          <Nav
            setDrawer={setDrawer}
            setToken={setToken}
            token={token}
            trips={trips}
            currentTrip={currentTrip}
          />
          {drawer && <Members />}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Layout>
              <Switch>
                <Route path="/login">
                  <Login setToken={setToken} />
                </Route>
                <Route path="/register">
                  <Login setToken={setToken} />
                </Route>

                <DataContext.Provider value={{ setTrips, currentTrip, selectedActivities, setSelectedActivities }}>
                  <Route path="/itineraries">
                    <Itineraries trips={trips} />
                  </Route>
                  <Route exact path="/itinerary/:id/map">
                    {!loading ? (
                      <Map
                        eventData={eventData}
                      />
                    ) : (
                      <Loader />
                    )}
                  </Route>
                  <Route exact path="/itinerary/:id/chat">
                    <Chat />
                  </Route>
                  <Route exact path="/itinerary/:id">
                    <Itinerary currentTrip={currentTrip} selectedActivities={selectedActivities}/>
                  </Route>
                  <Route exact path="/">
                    <Home
                      currentTrip={currentTrip}
                      setCurrentTrip={setCurrentTrip}
                    />
                  </Route>
                </DataContext.Provider>
              </Switch>
            </Layout>
          </Box>
        </LoginContext.Provider>
      </Box>
    </Router>
  );
}

export default App;
