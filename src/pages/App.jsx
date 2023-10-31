import React, { Component } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./Home";
import Study from './Study';
import Practice from './Practice';
import Test from './Test';

import alphabet from '../phonetic_alphabet.json'

function App(props) {
  // console.log(alphabet);
  let maxLevel =5;


  switch (props.page) {
    case 'study':
      return (<>
        <Study alphabet={alphabet.dictionary} />
      </>);
    case 'practice':
      return (<>
        <Practice alphabet={alphabet.dictionary} maxLevel={maxLevel}/>
      </>);
    case 'test':
      return (<>
        <Test alphabet={alphabet.dictionary} />
      </>);
    default:
      return (
        <>
        </>
      );
  }
  // return (
  //   <>
  //     <h1>My App</h1>
  //     <Practice />
  //   </>
  // );
}


export default App;
