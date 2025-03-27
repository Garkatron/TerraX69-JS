import Resource from "../Resource";

export default class SoundResource extends Resource {
    constructor(name, song) {
        super(name);
        this.song = song;
    }
}