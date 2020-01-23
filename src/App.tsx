import Cookies from 'js-cookie';
import React, { FunctionComponent } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import DescriptionPage from './pages/DescriptionPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

function createCtx<A>(defaultValue: A) {
    type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
    const defaultUpdateFunc: UpdateType = () => defaultValue;
    // tslint:disable-next-line: no-shadowed-variable
    const ctx = React.createContext({
        state: defaultValue,
        update: defaultUpdateFunc,
    });
    function Provider(props: React.PropsWithChildren<{}>) {
        const [state, update] = React.useState(defaultValue);
        return <ctx.Provider value={{ state, update }} {...props} />;
    }
    return [ctx, Provider] as const;
}

const [ctx, EmailProvider] = createCtx<string | undefined>('test@gmail.com');

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
