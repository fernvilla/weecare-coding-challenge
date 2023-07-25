// Convert milliseconds to minutes and seconds to display on the UI
export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
