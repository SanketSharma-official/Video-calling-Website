export function getCurrentTime() {
  const now = new Date();
  return {
    h: now.getHours(),
    m: addZero(now.getMinutes()),
    s: addZero(now.getSeconds())
  };
}

function addZero(t) {
  return t < 10 ? '0' + t : t;
}
