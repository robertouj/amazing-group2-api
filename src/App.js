import React, { useState } from "react";
import { Container } from "reactstrap";
import AnimalsList from "./components/AnimalsList/";
import logo from "./img/Absolute_amazing_animals.png";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./scss/custom.scss";
import { Switch, Route, NavLink } from "react-router-dom";
import { InputGroup, Input, Button, Alert } from "reactstrap";
import { myGlobals } from "./globals";

function App() {
  const [name, setName] = useState();
  const [latinName, setLatinName] = useState();
  const [thumbnails, setThumbnails] = useState();
  const [img, setImg] = useState();
  const [idVideo, setIdVideo] = useState();
  const [areMessages, setAreMessages] = useState(false);
  const [messageToShow, setMessageToShow] = useState();

  const data = {
    name: name,
    latinName: latinName,
    thumbnails: thumbnails,
    idVideo: idVideo,
    img: img,
  };

  const messages = {
    created: <Alert color="success">The pretty Animal was created!!</Alert>,
    errorMessage: <Alert color="danger">Something was wrong!!</Alert>,
  };

  const sendToServer = () => {
    console.log(data);

    const optionsPOST = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${myGlobals.APP_ROOT}/animals`, optionsPOST)
      .then((response) => {
        console.log(response);
        setMessageToShow("created");
        setAreMessages(true);
      })
      .catch(() => {
        setMessageToShow("errorMessage");
        console.log("Request failed");
      });
  };

  return (
    <div className="App bg-secondary">
      <header fluid>
        <img src={logo} alt="Absolut amazing animals" />
      </header>
      <main className="mb-0">
        <div className="p-3">
          <NavLink to="./formular" className="text-fourth">
            Create Animal
          </NavLink>
        </div>
        <Switch>
          <Route path="/formular/">
            <Container className="p-3 mb-3 bg-primary rounded-lg">
              <div>{areMessages && messages[messageToShow]}</div>
              <InputGroup className="p-3 mb-3">
                <Input
                  onChange={(i) => setName(i.target.value)}
                  className="name"
                  placeholder="Name"
                />
                <Input
                  onChange={(i) => setLatinName(i.target.value)}
                  className="latinName"
                  placeholder="latinName"
                />
                <Input
                  onChange={(i) => setThumbnails(i.target.value)}
                  className="thumbnails"
                  placeholder="thumbnails"
                />
                <Input
                  onChange={(i) => setIdVideo(i.target.value)}
                  className="idVideo"
                  placeholder="idVideo"
                />
                <Input
                  onChange={(i) => setImg(i.target.value)}
                  className="img"
                  placeholder="img"
                />
              </InputGroup>
              <Button className="bg-third text-fourth" onClick={sendToServer}>
                Save
              </Button>
            </Container>
          </Route>
        </Switch>

        <Container>
          <AnimalsList />
        </Container>
      </main>
    </div>
  );
}

export default App;
