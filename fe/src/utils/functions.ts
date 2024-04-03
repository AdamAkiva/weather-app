export function uppercaseFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function formatTime(timeSinceEpoch: number) {
  const time = new Date(timeSinceEpoch * 1000);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
`;
}
