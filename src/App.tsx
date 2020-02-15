import React, { FC } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import DescriptionPage from './pages/description/DescriptionPage';
import MainPage from './pages/main/MainPage';
import SignupPage from './pages/signup/SignupPage';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

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

const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Header />
          <MainPage />
        </Route>
        <Route path="/reset/:resetEmail/:resetToken">
          <Header />
          <MainPage />
        </Route>
        <Route path="/description">
          <Header />
          <DescriptionPage />
          <Footer />
        </Route>
        <Route path="/signup">
          <Header />
          <SignupPage />
          <Footer />
        </Route>
      </Switch>
    </HashRouter>
  </Provider>
);

export default App;
