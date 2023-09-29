import React, { Component } from 'react';

import Learn from './Learn';
import Practice from './Practice';

import alphabet from '../phonetic_alphabet.json'

function App(props) {
  // console.log(alphabet);


  switch (props.page) {
    case 'learn':
      return (<>
        <Learn alphabet={alphabet.dictionary} />
      </>);
    case 'practice':
      return (<>
        <Practice alphabet={alphabet.dictionary}/>
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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <About />,
//     // loader: rootLoader,
//     // children: [
//     //   {
//     //     path: "/Home",
//     //     element: <Home />,
//     //   }
//     // ],
//   },
// ]);

export default App;
