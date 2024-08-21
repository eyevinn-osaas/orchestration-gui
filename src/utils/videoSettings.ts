export default function videoSettings(
  width: number,
  height: number,
  frameRate?: number
) {
  return `${width}x${height}
            ${frameRate ? `@${frameRate}` : ''}`;
}
