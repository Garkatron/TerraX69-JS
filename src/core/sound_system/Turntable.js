import Signal from '../util/Signal';
import Util from './../util/Util';

export default class Turntable {
    constructor(songs = {}) {
        if (typeof songs !== 'object' || Array.isArray(songs)) {
            throw new Error("Invalid type for 'songs'. Expected an object.");
        }

        this.songs = songs;
        this.currentSong = null;
        this.currentSongName = null;
        this.onEnd = new Signal();
        this.shouldPlayNext = true;

        if (this.shouldPlayNext) {
            this.onEnd.connect(this.handleEndOfSong.bind(this));
        }
    }

    handleEndOfSong(name) {
        console.log(`[Turntable]: Song ended "${name}", playing the next random song.`);
        this.playRandomSong();
    }

    playRandomSong() {
        const songKeys = Object.keys(this.songs);
        const randomIndex = Util.randi(0, songKeys.length-1);            

        this.currentSongName = songKeys[randomIndex];
        
        this.currentSong = this.songs[this.currentSongName];

        this.currentSong.play();
        this.currentSong.onend = () => {
            this.onEnd.emit(this.currentSongName);
        };
    }

i
    stop() {
        if (this.currentSong) {
            this.currentSong.stop();
        }
    }

    continue() {
        if (this.currentSong) {
            this.currentSong.play();
        }
    }

    play(name) {
        if (!this.songs[name]) {
            console.error(`[Turntable]: Song with name "${name}" not found.`);
            return;
        }

        this.currentSongName = name;
        this.currentSong = this.songs[name];
        this.currentSong.play();
    }
}
