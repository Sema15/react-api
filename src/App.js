import React, {Component} from 'react';
import './App.css';
import {observer} from 'mobx-react';
import Header from "./components/Header";

@observer
class App extends Component {

  render() {
    return (
        <div className="container">
          <Header/>
        </div>
    );
  }
}

export default App;
