export const nameToId = (name: string): string => {
  return name.toLocaleLowerCase().replace(' ', '-');
}