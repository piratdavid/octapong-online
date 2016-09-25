var ws;

function connectWebSocket() {
  ws = new WebSocket('ws://' + document.location.hostname + ":3000");
  var self = this;
  ws.onopen = function() {
    ws.onmessage = handleMessage;
  };
}

function sendMessage(midi) {
  var msg = {
    user: window.User,
    midi: midi
  }
  ws.send(JSON.stringify(msg));
}

function handleMessage(message) {
  if (message.data === "connected") {
    console.log("Connected");
  } else {
    var data = JSON.parse(message.data);
    if (data.user != window.User) {
      console.log("Received MIDI message:" + data);
      changeXPos("xSquare", data.midi);
    }
  }
}

function startWS() {
  connectWebSocket();
}
