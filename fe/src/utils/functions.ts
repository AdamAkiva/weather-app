export function uppercaseFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function formatTime(now: Date) {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
`;
}
