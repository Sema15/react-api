import React, {useEffect} from 'react';
import './App.css';
import Header from "./header/Header";
import {useDispatch} from "react-redux";


import {auth} from "../actions/user";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])
  return (

      <div className="container">
        <Header/>
      </div>

  );

}

export default App;
