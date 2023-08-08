import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/HomePage";
import { EstablishmentDetail } from "./components/EstablishmentDetail"; 

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/establishment/:id" element={<EstablishmentDetail />} />
        </Routes>
      </Router>
    );
  }
}

export default App;