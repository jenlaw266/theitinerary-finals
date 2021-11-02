import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Route, Switch, useLocation } from "react-router-dom";
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
import { AnimatePresence } from "framer-motion";

function App() {
  const { token, setToken } = useToken(null);
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState();
  const location = useLocation();

  const [state, setState] = useState({
    message: "",
  });

  useEffect(() => {
    const fetchData = () => {
      setLoading(false);
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 5000);

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
            <AnimatePresence>
              <Switch location={location} key={location.key}>
                <Route path="/login">
                  <Login setToken={setToken} />
                </Route>
                <Route path="/register">
                  <Login setToken={setToken} />
                </Route>

                <DataContext.Provider
                  value={{
                    setTrips,
                    currentTrip,
                  }}
                >
                  <Route path="/itineraries">
                    <Itineraries trips={trips} />
                  </Route>
                  <Route exact path="/itinerary/:id/map">
                    {loading ? <Loader /> : <Map />}
                  </Route>
                  <Route exact path="/itinerary/:id/chat">
                    <Chat username={token} />
                  </Route>
                  <Route exact path="/itinerary/:id">
                    <Itinerary />
                  </Route>
                  <Route exact path="/">
                    <Home setCurrentTrip={setCurrentTrip} />
                  </Route>
                </DataContext.Provider>
              </Switch>
            </AnimatePresence>
          </Layout>
        </Box>
      </LoginContext.Provider>
    </Box>
  );
}

export default App;
