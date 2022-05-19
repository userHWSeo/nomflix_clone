export function makeImagePath(id: string, format?: string) {
  console.log(format);
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
