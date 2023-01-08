import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Player({ player, index, removePlayer }) {
  return (
    <div className="d-flex justify-content-between">
      <h3>{player.text}</h3>
      <Button variant="outline-danger" onClick={() => removePlayer(index)}>✕</Button>
    </div>
  );
}

function FormPlayer({ addPlayer }) {

  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addPlayer(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label><b>Add Player</b></Form.Label>
      <div className="d-flex">
        <Form.Control type="text" className="input me-4" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new player" />
        <Button variant="dark" type="submit">Submit</Button>
      </div>
    </Form.Group>
  </Form>
  );
}

function App() {
  const [players, setPlayers] = React.useState([]);
  const [matchs, setMatchs] = React.useState([]);

  const addPlayer = text => {
    const newPlayer = [...players, { text }];
    setPlayers(newPlayer);
  };

  const removePlayer = index => {
    const newPlayer = [...players];
    newPlayer.splice(index, 1);
    setPlayers(newPlayer);
  };

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sortMatch() {
    if (players.length > 1)
    {
      console.log("OK");
      var i = randomNumberInRange(0, players.length - 1);
      var player1 = players[i];
      players.splice(i, 1);
      var j = randomNumberInRange(0, players.length - 1);
      var player2 = players[j];
      players.splice(j, 1);
      var match = player1.text + " - " + player2.text;
      const newMatch = [...matchs, match]
      setMatchs(newMatch);
    }
    else
    {
      alert("Player Error");
    }
  }

  function extractBtn() {
    if (players.length > 1)
    {
      return (
        <Button className="mt-5 btn-info mb-5" onClick={sortMatch}>Extract</Button>
      )
    }
  }

  return (
    <div>
      <div className="app">
        <div className="container">
          <h1 className="text-center mb-4 title">Fifa Tournament</h1>
          <FormPlayer addPlayer={addPlayer} />
          <div className="d-flex flex-column mt-3">
            {players.map((player, index) => (
              <Card>
                <Card.Body>
                  <Player
                  key={index}
                  index={index}
                  player={player}
                  removePlayer={removePlayer}
                  />
                </Card.Body>
              </Card>
            ))}
            <br></br>
          </div>
          {extractBtn()}
          {matchs.map((matchs, index) => (
            <div class="alert alert-dark" id={index} role="alert">
              <h1>{matchs}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
