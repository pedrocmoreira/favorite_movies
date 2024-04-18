export class MovieNotExists extends Error {
  constructor() {
    super('Movie does not exists');
  } 
}