// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
  return (
      <Router>
        <div>
          <nav>
            {/* Navigation menu with conditional rendering based on authentication state */}
          </nav>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/upload" component={FileUpload} />
            <Route path="/files" component={FileList} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
