import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
// OPENING PR

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route exact path="/meals" component={  } />
        <Route exact path="/drinks" component={  } />
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
