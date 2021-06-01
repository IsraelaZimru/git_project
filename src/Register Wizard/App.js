import Page1 from './components/phase_1.js'
import Page2 from './components/Page2.js'
import Page3 from './components/phase_3.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

function App() {
    return <Router>
        <ol>
            <li>
                <Link to="/phase_1">Step One</Link>
            </li>
            <li>
                <Link to="/phase_2">Step Two</Link>
            </li>
            <li>
                <Link to="/phase_3">Step Three</Link>
            </li>
        </ol>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
            <Route path="/phase_1">
                <Page1 />
            </Route>
            <Route path="/phase_2">
                <Page2 />
            </Route>
            <Route path="/phase_3">
                <Page3 />
            </Route>
        </Switch>
    </Router>
}

export default App