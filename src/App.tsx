import Cookies from 'js-cookie';
import React, { FunctionComponent } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import DescriptionPage from './pages/DescriptionPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

function checkEmail(): string | null {
    if (Cookies.get('Authorization')) {
        return localStorage.getItem('email') ;
    } else {
        return null;
    }
}

function createCtx<A>(defaultValue: A) {
    type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
    const defaultUpdateFunc: UpdateType = () => defaultValue;
    const stateCtx = React.createContext({
        state: defaultValue,
        update: defaultUpdateFunc,
    });
    function Provider(props: React.PropsWithChildren<{}>) {
        const [state, update] = React.useState(defaultValue);
        return <stateCtx.Provider value={{ state, update }} {...props} />;
    }
    return [stateCtx, Provider] as const;
}

const [ctx, EmailProvider] = createCtx<string | null>(checkEmail());

export const EmailContext = ctx;

const App: FunctionComponent = () => (<EmailProvider>
    <HashRouter>
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
    </HashRouter>
</EmailProvider>);

export default App;
