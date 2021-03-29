import React, {Component} from 'react';
import {Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
        <div>
          <Topics/>
        </div>
    );
  }
}

function Topics() {
  let match = useRouteMatch();

  return (
      <div>
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default Dashboard;
