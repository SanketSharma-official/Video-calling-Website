let mystream = null;
let call = null;
let currentPear = null;
let isaudio = true;
let isvideo = true;

export function setUpVideoButtons() {
  document.getElementById('onlyvideo').addEventListener('click', () => {
    document.getElementById('mute-audio').innerHTML = "<i class='fas fa-microphone'></i>";
    document.getElementById('mute-video').innerHTML = "<i class='fas fa-video'></i>";
    document.getElementById('video-call-div').style.display = 'inline';
    const remoteid = document.getElementById('inputremoteid').value.trim();
    startVideoCall(remoteid);
  });

  document.getElementById('mute-audio').addEventListener('click', muteAudio);
  document.getElementById('mute-video').addEventListener('click', muteVideo);
}

function startVideoCall(id) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      mystream = stream;
      addLocalVideo(stream);
      call = window.peer.call(id, stream);
      call.on('stream', remoteStream => {
        addRemoteVideo(remoteStream);
        currentPear = call.peerConnection;
      });
    }).catch(console.error);

  call?.on('close', () => {
    streamCleanup();
  });
}

export function addRemoteVideo(stream) {
  document.getElementById('remote-video').srcObject = stream;
}

export function addLocalVideo(stream) {
  document.getElementById('local-video').srcObject = stream;
}

function muteAudio() {
  isaudio = !isaudio;
  if (mystream?.getAudioTracks()?.[0]) {
    mystream.getAudioTracks()[0].enabled = isaudio;
  }
  document.getElementById('mute-audio').innerHTML = isaudio
    ? "<i class='fas fa-microphone'></i>"
    : "<i class='fas fa-microphone-slash'></i>";
}

function muteVideo() {
  isvideo = !isvideo;
  if (mystream?.getVideoTracks()?.[0]) {
    mystream.getVideoTracks()[0].enabled = isvideo;
  }
  document.getElementById('mute-video').innerHTML = isvideo
    ? "<i class='fas fa-video'></i>"
    : "<i class='fas fa-video-slash'></i>";
}

export function shareScreen() {
  navigator.mediaDevices.getDisplayMedia({
    video: { cursor: 'always' },
    audio: { echoCancellation: true, noiseSuppression: true }
  })
    .then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = stopScreenShare;

      const sender = currentPear.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    })
    .catch(() => alert('Did not get permissions for screen share'));
}

function stopScreenShare() {
  const videoTrack = mystream.getVideoTracks()[0];
  const sender = currentPear.getSenders().find(s => s.track.kind === videoTrack.kind);
  sender.replaceTrack(videoTrack);
}

function streamCleanup() {
  if (mystream?.getVideoTracks()?.[0]) {
    mystream.getVideoTracks()[0].disabled = true;
  }
  document.getElementById('video-call-div').style.display = 'none';
  call?.close();
}
