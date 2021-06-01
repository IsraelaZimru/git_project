import Page2 from "./components/Page2.js";
import Page1 from "./components/Page1.js";
import Page3 from "./components/Page3";
import ParsonalPage from "./components/ParsonalPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage.js";

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/phase_1">
          <Page1 />
        </Route>
        <Route exact path="/phase_2">
          <Page2 />
        </Route>
        <Route exact path="/phase_3">
          <Page3 />
        </Route>
        <Route exact path="/parsonal_page">
          <ParsonalPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
