import React, { FunctionComponent, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import DescriptionPage from './pages/description/DescriptionPage';
import MainPage from './pages/main/MainPage';
import SignupPage from './pages/signup/SignupPage';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdateFunc: UpdateType = () => defaultValue;
  const stateCtx = React.createContext({
    state: defaultValue,
    update: defaultUpdateFunc
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

const [ctx, LoginEmailProvider] = createCtx<string | null>(resolveEmail());

export const LoginEmailContext = ctx;

let last = store.getState().localData;
const localDataSaver = () => {
  const current = store.getState().localData;
  if (last.email !== current.email || last.expireTime !== current.expireTime) {
    if (!current.email && !current.expireTime) {
      localStorage.clear();
    } else {
      localStorage.setItem('localData', JSON.stringify(current));
    }
    last = current;
  }
};

store.subscribe(localDataSaver);

const App: FunctionComponent = () => (
  <Provider store={store}>
    <LoginEmailProvider>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/description">
            <DescriptionPage />
            <Footer />
          </Route>
          <Route path="/signup">
            <SignupPage />
            <Footer />
          </Route>
        </Switch>
      </HashRouter>
    </LoginEmailProvider>
  </Provider>
);

export default App;
