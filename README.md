# Simple Video Calling App

A lightweight video calling web application built with PeerJS and Vanilla JavaScript. This project uses WebRTC under the hood (via PeerJS) to establish secure peer-to-peer video and audio connections directly in the browser—no frameworks, no build tools, just the web.

## Features

- Peer-to-peer video calling using WebRTC
- Unique call IDs for easy sharing and connection
- Toggle video and audio streams
- Works directly in modern browsers (no installation needed)
- Simple and fast performance with minimal dependencies

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- PeerJS – Simplifies WebRTC connections
- PeerServer – For signaling (can use public or self-hosted)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/simple-video-call.git
cd simple-video-call
2. Install & Run PeerServer (Optional for local testing)
If you want to self-host the PeerServer:

bash
npm install -g peer
peerjs --port 9000
This will start the signaling server at http://localhost:9000.

3. Open the App
Just open index.html in your browser:

bash
# On most systems:
open index.html

# Or right-click and "Open With Browser"
Make sure you're serving the file via a local server (e.g. Live Server extension in VS Code), or use:

bash
npx serve .
Hosting (Optional)
You can deploy the app using services like:

GitHub Pages

Netlify

Vercel

Firebase Hosting

Make sure to configure CORS and PeerServer if self-hosted.

Notes
This app uses the public PeerJS server by default. For production, it's recommended to host your own PeerServer for stability and security.
Works best on modern browsers like Chrome, Firefox, and Edge.
Credits
PeerJS
WebRTC community and MDN Docs

License
MIT License

Made with Vanilla JS and PeerJS
