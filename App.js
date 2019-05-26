import React, { Component } from 'react';
import './App.css';
import Flexi from "./Flexi";


const flexiConfig1 = {
  items: [
    {
      "name": "person_name",
      "label": "Person's Name child",
      "type": "TextField",
    },
    {
      "name": "person_other",
      "label": "Person other child",
      "type": "TextField",
    }
  ]
};

const flexiConfig2 = {
  items: [
    {
      "name": "name1",
      "label": "Person's Name parent",
      "type": "TextField",
      "children": flexiConfig1
    },
    {
      "name": "name2",
      "label": "Person other parent",
      "type": "TextField",
    }
  ]
};

const flexiConfig = {
  items: [
    {
      "name": "person_name",
      "label": "Person's Name",
      "type": "TextField",
    },
    {
      "name": "states",
            "label": "Person's state",
      "type": "DropDown",
            "values": [
                "Maharashtra",
                "Kerala",
                "Tamil Nadu"
      ]
    }
   ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Domino</h1>
        </header>
          <Flexi
            onSubmit={(d) => {console.log(d)}}
            config = {flexiConfig2}
          />
      </div>
    );
  }
}

export default App;
