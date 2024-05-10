let socket;
let message='';

    function setup() {
      createCanvas(400, 200);
      // Connect to WebSocket server
      socket = new WebSocket("ws://localhost:8080");
      // Set up WebSocket event handlers
      socket.onopen = () => {
        console.log("Connected to server");
      };
      socket.onmessage = (event) => {
        // Handle incoming message from the server
        const message = JSON.parse(event.data);
        displayMessage(message.payload);
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      socket.onclose = () => {
        console.log("Disconnected from server");
      };
    }

    function draw() {
      if(message!=='')background(20);
      else background(220)
      // Draw instructions
      textAlign(CENTER);
      textSize(16);
      fill(0);
      text("Press 'A' to send message to server", width / 2, height / 2);
      socket.onmessage = (event) => {
        // Handle incoming message from the server
        message = JSON.parse(event.data);
        displayMessage(message.payload);
      };
      text(message, width / 2, height / 6);
    }

    function displayMessage(message) {
      // Display message in the UI
      const messageContainer = document.getElementById("messageContainer");
      const p = document.createElement("p");
      p.textContent = message;
      messageContainer.appendChild(p);
    }

    function keyPressed() {
      // Send a message to the server when 'A' key is pressed
      if (key === 'A' || key === 'a') {
        if (socket.readyState === WebSocket.OPEN) {
          const message = prompt("Enter message to send to server:");
          socket.send(JSON.stringify({ type: "chat", payload: message }));
          console.log("Message sent to server:", message);
        } else {
          console.error("WebSocket connection is not open");
        }
      }
    }
