import { getCurrentTime } from './utils.js';

export function initUI() {
  const chatIcon = document.getElementById('chat');

  if (chatIcon) {
    chatIcon.addEventListener('click', toggleNav);
  } else {
    console.error("Missing element with id='chat'");
  }

  ['disconnect', 'clrmsg', 'onlyvideo', 'chat-msg', 'chat-send'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
}


let navOpen = false;

function toggleNav() {
  navOpen = !navOpen;
  document.getElementById('mySidenav').style.width = navOpen ? '300px' : '0';
  document.getElementById('chat').className = 'fas fa-comment-alt';
}

function closeNav() {
  navOpen = false;
  document.getElementById('mySidenav').style.width = '0';
}

export function addMsgLocal(msg) {
  const { h, m } = getCurrentTime();
  const msgHTML = `
    <br>
    <div class="msg">
      <div class="msg-head">
        <span class="name">YOU</span>
        <span class="time">${h}:${m}</span>
      </div>
      <div class="msg-body">${msg}</div>
    </div>
  `;
  document.getElementById('chat-body').innerHTML += msgHTML;
}

export function addMsgLocalMain(msg) {
  const { h, m } = getCurrentTime();
  const msgHTML = `
    <br>
    <div class="msg-main">
      <div class="msg-head-main">
        <span class="name-main">YOU</span>
        <span class="time-main">${h}:${m}</span>
      </div>
      <div class="msg-body-main">${msg}</div>
    </div><br>
  `;
  document.getElementById('chat-target').innerHTML += msgHTML;
}

export function addMsgRemote(msg) {
  const { h, m } = getCurrentTime();
  const remoteId = document.getElementById('inputremoteid').value.trim();
  const msgHTML = `
    <br>
    <div class="msg-remote">
      <div class="msg-head">
        <span class="name">${remoteId}</span>
        <span class="time">${h}:${m}</span>
      </div>
      <div class="msg-body-remote">${msg}</div>
    </div>
  `;
  document.getElementById('chat-body').innerHTML += msgHTML;
}

export function addMsgRemoteMain(msg) {
  const { h, m } = getCurrentTime();
  const remoteId = document.getElementById('inputremoteid').value.trim();
  const msgHTML = `
    <br>
    <div class="msg-remote-main">
      <div class="msg-head-main">
        <span class="name-main">${remoteId}</span>
        <span class="time-main">${h}:${m}</span>
      </div>
      <div class="msg-body-remote-main">${msg}</div>
    </div>
  `;
  document.getElementById('chat-target').innerHTML += msgHTML;
}
