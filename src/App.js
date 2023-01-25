import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
// OPENING PR

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        {/* <Route exact path="/drinks" component={  } />
        <Route exact path="/profile" component={  } />
        <Route exact path="/done-recipes" component={  } />
        <Route exact path="/favorite-recipes" component={  } />
        <Route exact path="/meals/:id" component={  } />
        <Route exact path="/drinks/:id" component={  } />
        <Route path="/drinks/:id/in-progress" component={  } />
        <Route path="/meals/:id/in-progress" component={  } /> */}
      </Switch>
    </div>
  );
}

export default App;
