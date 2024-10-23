import { LocalDataProvider } from './context/LocalDataContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './utils/token';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <LocalDataProvider>
      <Router>
        <Switch>
          {/* Unauthenticated routes */}
          <Route path="/auth">
            {isAuthenticated() ? <Redirect to="/" /> : (
              <Switch>
                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/register" component={RegisterPage} />
                {/* 404 for auth routes */}
                <Route component={NotFoundPage} />
              </Switch>
            )}
          </Route>

          {/* Authenticated routes */}
          <Route path="/" exact>
            {isAuthenticated() ? <ChatPage /> : <Redirect to="/auth/login" />}
          </Route>

          {/* 404 for other routes */}
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </LocalDataProvider>
  );
};

export default App;
