import { addLocalVideo, addRemoteVideo } from './videoCall.js';
import { ready } from './chat.js';

let peer = null;
let conn = null;
let call = null;
let mystream = null;
let currentPear = null;

export function initializePeer(username) {
  peer = new Peer(`${username}${Math.floor(Math.random() * 256)}`);

  peer.on('open', id => {
    console.log(`Connected to peer server with ID: ${id}`);
  });

  peer.on('connection', connection => {
    conn = connection;
    conn.on('open', () => {
      document.getElementById('reconnect').style.display = 'none';
      setChatButtonsEnabled(true);
      document.getElementById('chat-name').innerHTML = `connected with: ${conn.peer}`;
      document.getElementById('cover').style.display = 'none';
      ready(conn);
    });
  });

  peer.on('call', incomingCall => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        mystream = stream;
        addLocalVideo(stream);
        document.getElementById('video-call-div').style.display = 'inline';
        call = incomingCall;
        call.answer(stream);
        call.on('stream', remoteStream => {
          addRemoteVideo(remoteStream);
          currentPear = call.peerConnection;
        });
      }).catch(console.error);

    incomingCall.on('close', () => {
      streamCleanup();
    });
  });

  peer.on('error', handlePeerError);

  return peer;
}

function handlePeerError(err) {
  const reconnect = () => {
    document.getElementById('connect-with-someone').click();
    document.getElementById('reconnect').style.display = 'inline';
    setChatButtonsEnabled(false);
  };

  switch (err.type) {
    case 'peer-unavailable':
      alert('ID does not exist or is invalid.');
      reconnect();
      break;
    case 'unavailable-id':
    case 'invalid-id':
    case 'invalid-key':
      alert('Invalid or unavailable ID.');
      location.reload();
      break;
    case 'webrtc':
      alert("Please enter peer's ID.");
      reconnect();
      break;
    case 'browser-incompatible':
      alert('Browser incompatible. Please switch to Chrome.');
      location.reload();
      break;
    case 'network':
      alert('Network connection lost.');
      peer.reconnect();
      break;
    default:
      alert('An error occurred.');
      console.log(err.type);
      location.reload();
  }
}

function setChatButtonsEnabled(enabled) {
  const ids = ['disconnect', 'clrmsg', 'onlyvideo', 'chat-msg', 'chat-send'];
  ids.forEach(id => document.getElementById(id).disabled = !enabled);
}

function streamCleanup() {
  if (mystream?.getVideoTracks()?.[0]) {
    mystream.getVideoTracks()[0].disabled = true;
  }
  document.getElementById('video-call-div').style.display = 'none';
  call?.close();
}
