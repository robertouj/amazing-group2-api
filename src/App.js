import React from "react";
import {
  Container,
} from "reactstrap";
import AnimalsList from "./components/AnimalsList/";
import logo from "./img/Absolute_amazing_animals.png";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./scss/custom.scss";

function App() {

  return (
    <div className="App bg-secondary">
      <header fluid>
        <img src={logo} alt="Absolut amazing animals" />
      </header>
      <main className="mb-0">
        <Container>
          <AnimalsList />
        </Container>
      </main>
    </div>
  );
}

export default App;
