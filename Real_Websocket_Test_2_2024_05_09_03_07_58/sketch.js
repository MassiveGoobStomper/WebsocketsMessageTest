let socket;

    function setup() {
      createCanvas(400, 200);
      // Connect to WebSocket server
      socket = new WebSocket("ws://localhost:8080");
      // Set up WebSocket event handlers
      socket.onopen = () => {
        console.log("Connected to server");
      };
      socket.onmessage = (event) => {
  if (typeof event.data === 'string') {
    console.log("Message from server:", event.data);
  } else {
    // If the message is not a string, it might be a Blob object
    // Convert it to a string using a FileReader
    const reader = new FileReader();
    reader.onload = function() {
      console.log("Message from server:", reader.result);
    };
    reader.readAsText(event.data);
  }
};

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      socket.onclose = () => {
        console.log("Disconnected from server");
      };
    }

    function draw() {
      background(220);
      // Draw instructions
      textAlign(CENTER);
      textSize(16);
      fill(0);
      text("Press 'A' to send message to server", width / 2, height / 2);
    }

    function keyPressed() {
      // Send a message to the server when 'A' key is pressed
      if (key === 'A' || key === 'a') {
        if (socket.readyState === WebSocket.OPEN) {
          const message = prompt("Enter message to send to server:");
          socket.send(message);
          console.log("Message sent to server:", message);
        } else {
          console.error("WebSocket connection is not open");
        }
      }
    }