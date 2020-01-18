import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DescriptionPage from './pages/DescriptionPage';
import SignupPage from './pages/SignupPage';

interface IState {

}

class App extends Component<{}, Readonly<IState>>{
    updateAccountInfo() {

    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/description">
                        <DescriptionPage />
                    </Route>
                    <Route path="/signup">
                        <SignupPage />
                    </Route>
                    <Route path="/">
                        <MainPage />
                    </Route>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
