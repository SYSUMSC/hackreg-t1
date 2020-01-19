import React, { FunctionComponent } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DescriptionPage from './pages/DescriptionPage';
import SignupPage from './pages/SignupPage';
import Header from './header/Header';
import Footer from './footer/Footer';

const App: FunctionComponent = () => (<HashRouter>
    <Header />
    <Switch>
        <Route path="/description">
            <DescriptionPage />
            <Footer />
        </Route>
        <Route path="/signup">
            <SignupPage />
            <Footer />
        </Route>
        <Route path="/">
            <MainPage />
        </Route>
    </Switch>
</HashRouter>);

export default App;
