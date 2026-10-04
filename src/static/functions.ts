export function convertIndexToHex(index: number): string {
  return `0x${index.toString(16).padStart(2, '0')}`;
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
