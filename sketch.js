let socket;
let incomingMessage=''
let reader=new FileReader();

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
        incomingMessage = str(event.data[1]);
        console.log("Recieve from Server: " + event.data);
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      socket.onclose = () => {
        console.log("Disconnected from server");
      };
    }

    function draw() {
      background(220)
      // Draw instructions
      textAlign(CENTER);
      textSize(16);
      fill(0);
      text("Press 'A' to send message to server", width / 2, height / 2);
      text(incomingMessage, width / 2, height / 6);
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
          socket.send(message);
          console.log("Message sent to server:", (message));
        } else {
          console.error("WebSocket connection is not open");
        }
      }
    }
