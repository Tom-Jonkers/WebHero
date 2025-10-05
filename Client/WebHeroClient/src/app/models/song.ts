export class Song {
    constructor(
        public name: string,
        public artist: string,
        public year: string,
        public album: string,
        public length: number, // seconds
        public noteCount: number,
        public NPS: number,
        public difficulty: number, // out of 7
        public imageURL: string,
        public hash: string
    ){}
}