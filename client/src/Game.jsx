import React, { useEffect, useState } from "react";
import Player from "./assets/Player";
import CircleSVG from "./assets/CircleSVG";
import XSVG from "./assets/XSVG";

function Game() {
  const [players, setPlayers] = useState({})
  const [start, setStart] = useState(false)
  const [type, setType] = useState(null)

  useEffect(() => {
    (async function () {
      const ws = await connectToServer();

      document.querySelector("#game").onmousemove = (e) => {
        let bounds = document.querySelector("#game").getBoundingClientRect();

        const messageBody = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
        ws.send(JSON.stringify(messageBody));
      };

      ws.onmessage = (webSocketMessage) => {
        const messageBody = JSON.parse(webSocketMessage.data);

        const { sender, x, y } = messageBody;
        setPlayers((prevPlayers) => ({
          ...prevPlayers,
          [sender]: <Player key={sender} datasender={sender} x={x} y={y} iconSize={64} type={type}/>
        }))
      };

      async function connectToServer() {
        const ws = new WebSocket("ws://localhost:7071/ws");

        return new Promise((resolve, reject) => {
          const timer = setInterval(() => {
            if (ws.readyState === 1) {
              clearInterval(timer);
              resolve(ws);
            }
          }, 10);
        });
      }
    })();
  }, [start]);

  return (
    <div className="wrapper">
      {start ? '' : 
        <div className="prompt">
          <h1>Quero jogar com...</h1>
          <button id='select-circle' onClick={() => {setStart(!start); setType('circle')}}><CircleSVG/></button>
          <button id='select-x' onClick={() => {setStart(!start); setType('x')}}><XSVG/></button>
        </div>
      }
      
      <div id="game">
        {Object.values(players)}
      </div>
    </div>
  );
}

export default Game;