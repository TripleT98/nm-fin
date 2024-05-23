export function getMsFromTime(time: string): number {
  try{
    const [hours, minututes] = time.split(":").map(v => +v);
    if (isNaN(hours) || isNaN(minututes)) {
      throw new Error('Invalid time string!');
    }
    const msInMinute = 60_000;
    const msInHour = 60 * msInMinute;
    return (msInHour * hours ) + (msInMinute * minututes);
  } catch (e) {
    console.error(e);
    return 0;
  }

}
