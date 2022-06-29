export const getSpriteBackground = (file: string, spriteSize: number, offset: [number, number]): string => {
  const x = -offset[0] * spriteSize;
  const y = -offset[1] * spriteSize;

  return `url(${file}) ${x}px ${y}px`;
} 