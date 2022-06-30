export const getSpriteBackground = (
  file: string,
  width: number,
  height: number,
  offset: [number, number]
): string => {
  const x = -offset[0] * width;
  const y = -offset[1] * height;

  return `url(${file}) ${x}px ${y}px`;
} 