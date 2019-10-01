import React from 'react';
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import { EcProfile } from './components/profile.component'
import { EcAuth } from './components/auth.component'

    function Home() {
        return <h2>Home</h2>;
    }

    function App() {
        return (
        <HashRouter hashType="hashbang">
            <div>
                <nav>
                    <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/auth">Auth</Link>
                    </li>
                    </ul>
                </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/profile">
                        <EcProfile />
                    </Route>
                    <Route path="/auth">
                        <EcAuth />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
        );
    }

export default App;
