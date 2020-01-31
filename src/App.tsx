import React, { FunctionComponent, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import DescriptionPage from './pages/description/DescriptionPage';
import MainPage from './pages/main/MainPage';
import SignupPage from './pages/signup/SignupPage';

function createCtx<A>(defaultValue: A) {
    type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
    const defaultUpdateFunc: UpdateType = () => defaultValue;
    const stateCtx = React.createContext({
        state: defaultValue,
        update: defaultUpdateFunc,
    });
    function Provider(props: React.PropsWithChildren<{}>) {
        const [state, update] = useState(defaultValue);
        return <stateCtx.Provider value={{ state, update }} {...props} />;
    }
    return [stateCtx, Provider] as const;
}

export type UserEmail = {
    email: string;
    expireTime: number;
};

function resolveEmail(): string | null {
    const item = localStorage.getItem('user');
    if (item) {
        const userEmail: UserEmail = JSON.parse(item);
        if (new Date().getTime() > userEmail.expireTime) {
            localStorage.clear();
            return null;
        } else {
            return userEmail.email;
        }
    } else {
        return null;
    }
}

const [ctx, EmailProvider] = createCtx<string | null>(resolveEmail());

export const LoginEmailContext = ctx;

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
