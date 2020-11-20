import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';
import Posts from './containers/Posts';
import Login from './containers/Login';
import Register from './containers/Register';
import PostDetails from './containers/PostDetails';
import AddPost from './containers/AddPost';

const App = () => (
  <div className="App">
    <Layout>
      <Switch>
        <Route path='/' exact component={Posts}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/posts/:id' component={PostDetails}/>
        <Route path='/add-post' component={AddPost} />
      </Switch>
    </Layout>
  </div>
);

export default App;
