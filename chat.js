import { addMsgLocal, addMsgLocalMain, addMsgRemote, addMsgRemoteMain } from './ui.js';

let conn = null;
let toggleNav = false;

export function initChat() {
  const inputRemoteId = document.getElementById('inputremoteid');
  const connectBtn = document.getElementById('connectpeer');

  connectBtn.addEventListener('click', () => {
    const remoteid = inputRemoteId.value.trim();
    if (remoteid !== '') {
      document.getElementById('connect-with-someone').click();
      joinChat(remoteid);
      document.getElementById('cover').style.display = 'none';
    }
  });

  document.getElementById('chat-msg').addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('chat-send').click();
    }
  });

  document.getElementById('chat-send').addEventListener('click', () => {
    const msgInput = document.getElementById('chat-msg');
    let msg = msgInput.value.trim();
    if (msg !== '') {
      msgInput.value = '';
      sendMessage(msg);
    }
  });

  document.getElementById('chat_input_incall').addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      document.getElementById('send').click();
    }
  });

  document.getElementById('send').addEventListener('click', () => {
    const msgInput = document.getElementById('chat_input_incall');
    let msg = msgInput.value.trim();
    if (msg !== '') {
      msgInput.value = '';
      sendMessage(msg);
    }
  });
}

export function handleSendMessage() {
  document.getElementById('disconnect').addEventListener('click', () => {
    alert('Disconnected from peer');
    conn?.close();
    location.reload();
  });

  document.getElementById('clrmsg').addEventListener('click', () => {
    document.getElementById('chat-target').innerHTML = '';
    document.getElementById('chat-body').innerHTML = '';
  });
}

export function handleChatInput() {
  // Already covered in initChat
}

function sendMessage(msg) {
  addMsgLocal(msg);
  addMsgLocalMain(msg);
  conn?.send(msg);
  scrollChat();
}

function scrollChat() {
  document.getElementById('chat-target').scrollTo(0, document.getElementById('chat-target').scrollHeight);
  document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
}

export function joinChat(id) {
  conn = window.peer.connect(id, { reliable: true });

  conn.on('open', () => {
    document.getElementById('chat-name').innerHTML = `connected with: ${conn.peer}`;
    document.getElementById('reconnect').style.display = 'none';
    ['disconnect', 'clrmsg', 'onlyvideo', 'chat-msg', 'chat-send'].forEach(id =>
      document.getElementById(id).disabled = false
    );
  });

  conn.on('data', data => {
    if (!toggleNav) {
      document.getElementById('chat').className = 'fas fa-comment-alt jiggle';
    }
    addMsgRemote(data);
    addMsgRemoteMain(data);
    scrollChat();
  });

  conn.on('close', () => {
    alert('Connection closed');
    location.reload();
  });
}

export function ready(existingConn) {
  conn = existingConn;
  conn.on('data', data => {
    if (!toggleNav) {
      document.getElementById('chat').className = 'fas fa-comment-alt jiggle';
    }
    addMsgRemote(data);
    addMsgRemoteMain(data);
    scrollChat();
  });

  conn.on('close', () => {
    alert('Connection closed');
    location.reload();
  });
}
