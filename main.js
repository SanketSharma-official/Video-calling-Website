import { initializePeer } from './peerConnection.js';
import { setUpVideoButtons, shareScreen } from './videoCall.js';
import { initChat, handleSendMessage, handleChatInput } from './chat.js';
import { initUI } from './ui.js';

let peer = null;
let name = null;

document.addEventListener('DOMContentLoaded', () => {
  initUI();

  const landNameInput = document.getElementById('land-name');
  landNameInput.addEventListener('keyup', (event) => {
    name = landNameInput.value.trim();
    if (event.keyCode === 13 && name !== '') {
      peer = initializePeer(name);
      document.getElementById('chat-name').innerHTML = `${name} (id: ${peer.id})`;
      document.getElementById('land-name-div').style.display = 'none';
      landNameInput.value = '';
    }
  });

  setUpVideoButtons();
  initChat();
  handleSendMessage();
  handleChatInput();

  document.getElementById('sharescreen').addEventListener('click', shareScreen);
});
